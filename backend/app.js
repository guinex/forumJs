const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// get all post routes
const post_routes = require('./routes/posts');
const auth_routes = require('./routes/auth');

// connecting mongodb using connection string
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://sudo_admin:" + process.env.MONGO_ATLAS_PASSWORD + "@development.93ppp.mongodb.net/formJs?retryWrites=true&w=majority")
  .then(()=>{
    console.log("Mongodb connected!");
  })
  .catch(()=>{
    console.log("could not connect!");
  });




//add middlewares
app.use((request, response, next) =>{

  //console.log("middleware added");
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, DELETE, PUT");
  // go to next middleware
  next();
});
// first argument is route and next is function that returns the value
// last statement is returned like rails
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/images", express.static(path.join("images")));
app.use("/api/posts", post_routes);
app.use("/api/users", auth_routes);




// export this server to server.js
module.exports = app;
