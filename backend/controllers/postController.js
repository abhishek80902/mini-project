const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  const post = await Post.create({
    ...req.body,
    userId: req.user.id
  });
  res.json(post);
};

exports.getFeed = async (req, res) => {
  const page = req.query.page || 1;
  const limit = 5;

  const posts = await Post.find()
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  res.json(posts);
};

exports.likePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  const userId = req.user.id;

  if (!post.likes.includes(userId)) post.likes.push(userId);
  else post.likes = post.likes.filter(id => id !== userId);

  await post.save();
  res.json(post);
};

exports.commentPost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  post.comments.push({
    userId: req.user.id,
    text: req.body.text
  });

  await post.save();
  res.json(post);
};