// models
const Post = require('../models/post');

exports.createPost = (request, response, next) =>{
  console.log("got packet");
  const url = request.protocol + '://' + request.get("host");
  const post = new Post({
    title: request.body.title,
    content: request.body.content,
    imagePath: url + '/images/' + request.file.filename,
    userId: request.userData.userId
  });
  console.log(request);
  console.log(post);

  // const body = request.body;
  post.save().then(result =>{
    response.status(201).json({
      message: 'got packet',
      post: {
        title: result.title,
        content: result.content,
        imagePath: result.imagePath,
        id: result._id
      }
    });
  }, error =>{
    response.status(500).json({
      message: "creating post failed!"
    })
  });
};

exports.updatePost =  (req, res, next) => {
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename
  }
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath,
    userId: req.userData.userId
  });
  console.log(post);
  Post.updateOne({ _id: req.params.id, userId: req.userData.userId }, post).then(result => {
    if(result.n > 0){
      res.status(200).json({ message: "Update successful!" });
    }
    else{
      res.status(401).json({ message: "Not Authorize!" });
    }
  }).catch(error => {
    res.status(401).json({ message: "Couldnt upload post" });
  });
};

exports.getPostById =  (request, response, next) =>{
  Post.findById(request.params.id).then((post)=>{
    if(post){
      response.status(200).json(
        post
      );
    }else{
      response.status(404).json({
        message: 'posts not found',
      });
    }
  }).catch(error => {
    res.status(401).json({ message: "post not found! " });
  });
};

exports.getPosts = (request, response, next) =>{
  let pageSize = +request.query.pageSize;
  let page = +request.query.page;
  let fetchedPost = null;
  if (pageSize && page){
    //do nothing
  }else{
    pageSize = 10;
    page = 1;
  }
  const Query = Post.find()
  Query.skip(pageSize * (page - 1)).limit(pageSize)
  .then((documents)=>{
    fetchedPost = documents;
    return Post.count();
  }).then((count)=>{
    response.status(200).json({
      message: 'posts fetched successfully',
      posts: fetchedPost,
      postCount: count
    });
  });

};

exports.deletePost = (request, response, next) =>{
  Post.deleteOne({_id: request.params.id, userId: request.userData.userId}).then((result)=>{
    if(result.n > 0){
      console.log("post deleted by backend");
      response.status(200).json({message: "post deleted"});
    }
    else{
      response.status(401).json({message: "Auth Failed"});
    }
  }).catch(error => {
    res.status(401).json({ message: "Couldnt delete post" });
  });
};
