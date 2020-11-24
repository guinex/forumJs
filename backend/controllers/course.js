const Course = require('../models/course');

exports.createCourse = (request, response, next) =>{
  console.log("new Course");
  const url = request.protocol + '://' + request.get("host");
  const post = new Course({
    title: request.body.name,
    content: request.body.year,
    userId: request.userData.userId
  });
  console.log(request);
  Course.save().then(result =>{
    response.status(201).json({
      message: 'got packet',
      course: {
        name: result.name,
        year: result.year,
        id: result._id
      }
    });
  }, error =>{
    response.status(500).json({
      message: "creating course failed!"
    })
  });
};
