# Express-App
Express is a middleware to create the nodejs application.

Fast, unopinionated, minimalist web framework for node.

To create the Express server:

const express = require('express') // creating the instance of express to use in our file
const app = express()
 
app.get('/', function (req, res) {
  res.send('Hello World')
}) // this route will send the message hllow world whenever sever hits the url with http://localhost:3000/
 
app.listen(3000) // server will run on the port 3000

The Basic CRUD operations using the node server.
Node js itself is the server to handle the server call's using the http protocol.
The following are the routes of users data to perform the create,read,update and delete operations on the users data.

users data is the simple JSON formated array to perform the creating, user getting the specific user data, update the specific user data and delete the pariticular user data by the id operations on it.

1. Creating the user:

         router.post('/create-user', async function(req, res) {
          try {
            const response = await userService.createUser(req.body);
            if (response)
              return res.json({
                 statusCode: 200,
                 metaData: response
             });
             return res.json({
                statusCode: 404
             });
        } catch (e) {
           return res.json({
                statusCode: 500,
                msg: 'Server Error'
          });
        }
    });
    
  2. Reading the users:
    
           /* GET users listing. */
           router.get('/', async function(req, res) {
              try {
               const response = await userService.userData();
               res.json({
                statusCode: 200,
                metaData: response
               });
              } catch (e) {
               res.json({
                statusCode: 500,
                msg: 'Server Error'
               });
              }
           });
    3. Updating the User:
          
          
       /* updating the user */
       router.post('/update', async function(req, res) {
          try {
           const response = await userService.updateUser(req.body);
           if (response)
            return res.json({
             statusCode: 200,
             metaData: response
            });
           res.json({
            statusCode: 404
           });
          } catch (e) {
           return res.json({
            statusCode: 500,
            msg: 'Server Error'
           });
          }
         });
     4. Deleting an matched user:
          /*deleting the specific user*/
            router.get('/delete/:id', async function(req, res) {
             try {
              const paramId = req.params.id;
              const response = await userService.deleteUser(paramId);
              if (response)
               return res.json({
                statusCode: 200,
                metaData: response
               });
              return res.json({
               statusCode: 404
              });
             } catch (e) {
              return res.json({
               statusCode: 500,
               msg: 'Server Error'
              });
             }
            });
            
To run the Application

## Project setup
```
npm install
```
### Start server
```
npm start
```            
