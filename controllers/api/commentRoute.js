const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/:id', async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: {
        post_id: req.params.postid,
      },
    });
    console.log('params:', req.params);

    const commentList = comments.get({ plain: true });
    res.render('comment', {
      ...commentList,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/:postId', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      user_id: req.session.user_id,
      post_id: req.session.postId,
      content: req.body.commentContent,
    });
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const targetComment = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!targetComment) {
      res.status(404).json({ message: 'Comment did not exist' });
    } else res.status(200).json(targetComment);
  } catch (err) {
    res.status(err).json(err);
  }
});

module.exports = router;
