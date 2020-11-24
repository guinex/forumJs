const jwt = require("jsonwebtoken");
const { decode } = require("punycode");
module.exports = (request, response, next) =>{
  try{
    const token = request.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    console.log(decodedToken);
    request.userData = { email: decodedToken.email, userId: decodedToken.userId };
    next();
  } catch (error){
    response.status(401).json({message: "Please Sign In.", error: error});
  }


}
