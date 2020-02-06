// at the top of a test file or in a test helper
var td = require("testdouble");
var chai = require("chai");
var tdChai = require("testdouble-chai");
const request = require('supertest');
const express = require('express');
const app = express();
chai.use(tdChai(td)); // make sure to call tdChai with td to inject the dependency
var expect = chai.expect;
const mockdata = require('./mockdata');
let userModule;
const userDetails = mockdata.users;
var usersRouter = require('../routes/users');
var bodyParser = require('body-parser')



describe('module replace',()=> {
    beforeEach(() => {
        userModule = td.replace('../services/user', td.object());
        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({ extended: false }))
        app.use('/users', usersRouter);
    });

      it('test user data', (done)=> {
            td.when(userModule.userData()).thenReturn(userDetails);
            request(app)
                .get('/users')
                .expect(200)
                .end((err, res)=>{
                    if (err) return done(err);
                    expect(res.body.statusCode).to.be.equal(200);
                    expect(res.body.metaData).to.be.deep.equal(userDetails);
                    done();
                });
      });
      

      it('should get single user data',  (done)=>{
          td.when(userModule.singleUser(1)).thenReturn({
            name: 'fabio',
            role: 'admin',
            id: 1
        });
        request(app)
        .get('/users/1')
        .expect(200)
        .end((err,res)=>{
            if(err) return done(err);
            expect(res.body.statusCode).to.be.equal(200);
            done();
        });
      });

      it('should throw an error for unmatched id', (done)=> {
          td.when(userModule.singleUser(0)).thenReturn();
          request(app)
          .get('/users/0')
          .expect(200)
          .end((err,res)=>{
              if(err) return done(err);
              expect(res.body.statusCode).to.be.equal(404);
              done();
          });
      });

      it('should create new user', (done)=> {
        td.when(userModule.createUser({
            name: 'david',
            role: 'admin',
            id: 9
        }))
        .thenResolve({status: 'success'});
        request(app)
        .post('/users/create-user')
        .send({data:{
          name: 'david',
          role: 'admin',
          id: 9
      }})
      .expect(200)
      .end((err,res)=>{
          if(err) return done(err);
         expect(res.body.statusCode).to.be.equal(200);
          done();
      });
    });

    it('should update the user specific data', (done)=>{
        td.when(userModule.updateUser({
            name: 'fabio heuser',
            role: 'admin',
            id: 1
        }))
        .thenResolve({
            status: 'success'
        });

        request(app)
        .post('/users/update')
        .send({
            name: 'fabio heuser',
            role: 'admin',
            id: 1
        })
        .expect(200)
        .end((err,res)=>{
            if(err) return done(err);
            expect(res.body.statusCode).to.be.equal(200);
            done();
        });
    });


    it('should return error for unmatched data', (done)=>{
        td.when(userModule.updateUser({
            name: 'fabio heuser',
            role: 'admin',
            id: 111
        })).thenReject({status: 'fail'});

        request(app)
        .post('/users/update')
        .send({
            name: 'fabio heuser',
            role: 'admin',
            id: 111
        })
        .expect(200)
        .end((err,res)=>{
            if(err) return done(err);
            expect(res.body.statusCode).to.be.equal(500);
            done();
        });
    });
      
    afterEach( function () { td.reset() });
});
