# Express-App
Express is a middleware to create the nodejs application.

Fast, unopinionated, minimalist web framework for node.

To create the Express server:

const express = require('express') // creating the instance of express to use in our file
const app = express()
 
app.get('/', function (req, res) {
  res.send('Hello World')
}) // this route will send the message hllow world whenever sever hits the url with http://localhost:3000/
 
app.listen(3000)
