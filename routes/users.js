var express = require('express');
var router = express.Router();
const userService = require('../services/user');
/* GET users listing. */
router.get('/', async function(req, res) {
  try {
      const response = await userService.userData();
      res.json({statusCode: 200,metaData: response});
    }
    catch(e){
      res.json({
        statusCode: 500,
        msg: 'Server Error'
      });
    }
  });


  router.get('/:id', async function(req, res) {
    try {
        const paramId = req.params.id;
        const response = await userService.singleUser(paramId);
        if(response)
        return res.json({statusCode: 200,metaData: response});
        return res.json({statusCode: 404});
      }
      catch(e){
       return res.json({
          statusCode: 500,
          msg: 'Server Error'
        });
      }
    });



    router.post('/update', async function(req, res) {
      try {
          const response = await userService.updateUser(req.body);
          if(response)
          return res.json({statusCode: 200,metaData: response});
          res.json({statusCode: 404});
        }
        catch(e){
         return res.json({
            statusCode: 500,
            msg: 'Server Error'
          });
        }
      });


      router.get('/delete/:id', async function(req, res) {
        try {
            const paramId = req.params.id;
            const response = await userService.deleteUser(paramId);
            if(response)
            return res.json({statusCode: 200,metaData: response});
            return res.json({statusCode: 404});
          }
          catch(e){
           return res.json({
              statusCode: 500,
              msg: 'Server Error'
            });
          }
        });
        




        
        router.post('/create-user', async function(req, res) {
          try {
              const response = await userService.createUser(req.body);
              if(response)
              return res.json({statusCode: 200,metaData: response});
              return res.json({statusCode: 404});
            }
            catch(e){
             return res.json({
                statusCode: 500,
                msg: 'Server Error'
              });
            }
          });
module.exports = router;
