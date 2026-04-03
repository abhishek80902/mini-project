const router = require('express').Router();
const auth = require('../middleware/authMiddleware');

const {
  createPost,
  getFeed,
  likePost,
  commentPost
} = require('../controllers/postController');

router.post('/', auth, createPost);
router.get('/', getFeed);
router.post('/like/:id', auth, likePost);
router.post('/comment/:id', auth, commentPost);

module.exports = router;