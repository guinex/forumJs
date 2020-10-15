const express = require('express');
const bodyParser = require('body-parser');
const app = express();
//add middlewares
app.use((request, response, next) =>{

  //console.log("middleware added");
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, DELETE");
  // go to next middleware
  next();
});
// first argument is route and next is function that returns the value
// last statement is returned like rails
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.post('/api/posts', (request, response, next) =>{
    const body = request.body;
    console.log(body);
    response.status(200).json({
      message: 'got packet'
    });

});
app.get('/api/posts', (request, response, next) =>{
  const posts = [
    {id: '3423432asrwef', title: 'first', content: 'sdfsdf'},
    {id: '223basdbsadas', title: 'second', content: '4234234'}
  ];
  response.status(200).json({
    message: 'posts fetched successfully',
    posts: posts
  });
});

// export this server to server.js
module.exports = app;
