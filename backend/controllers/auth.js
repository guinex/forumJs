const bcrypt = require('bcryptjs');
const { EPROTONOSUPPORT } = require('constants');
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.createUser = (request, response, next) => {
  // console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$");
  // console.log(request.body.password);
  bcrypt.hash(request.body.password, 10).then((hash)=> {
    const user = new User({
      email: request.body.email,
      password: hash
    });
    user.save().then((result)=>{
      response.status(201).json({
        message: "User created",
        result: result
      });
    }).catch(err => {
      response.status(500).json({
        error: err,
        message: "something went wrong"
      });
    });
  });
};

exports.login = (request, response, next) => {
  let fetchedUser = null;
  User.findOne({email: request.body.email})
  .then(user => {
    console.log(user);
    if(!user){
      return response.status(401).json({
        message: 'User does not exists'
      });
    }
    fetchedUser = user;
    //console.log(fetchedUser[0].password + "password" + request.body.password);
    return bcrypt.compare(request.body.password, fetchedUser.password);
  }).then(result=>{
    console.log(result);
    if (!result){
      return response.status(401).json({
        message: 'Invalid Credentials!'
      });
    }
    console.log(fetchedUser._id);
    const token = jwt.sign({email: fetchedUser.email, userId: fetchedUser._id}, process.env.JWT_KEY, {expiresIn: "24h"});
    console.log(token);
    return response.status(200).json({
      token: token,
      expiresIn: 3600 * 24,
      userId: fetchedUser._id
    });
  }).catch(err=>{
    return response.status(401).json({
      message: 'Invalid Credentials!' ,
      error: err
    });
  });
};
