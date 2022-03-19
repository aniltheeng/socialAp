const Post = require("../models/postModel");
const User = require("../models/userModel");
const cloudinary = require('cloudinary')


// add post
exports.createPost = async (req, res) => {
  

  try {
    const myCloud  = await cloudinary.v2.uploader.upload(req.body.image,{
      folder:"posts"
    })
    
    const newPostData = {
      caption: req.body.caption,
      image: {
        public_id:myCloud.public_id,
        url:myCloud.secure_url
      },
      owner: req.user._id,
    };

    const post = await Post.create(newPostData);

    const user = await User.findById(req.user._id);

    user.posts.unshift(post._id);

    await user.save();
    res.status(201).json({
      success: true,
      message: "Post created",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// delete post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: `post not found !`,
      });
    }

    if (post.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: `Unauthorized`,
      });
    }

    // below code is just to maintain cloudinary memory or to remove after deleted form database

    await cloudinary.v2.uploader.destroy(post.image.public_id)
    
    await post.remove();

    const user = await User.findById(req.user._id);

    const index = user.posts.indexOf(req.params.id);

    user.posts.splice(index, 1);

    await user.save();

    return res.status(200).json({
      success: true,
      message: `post deleted successfully`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// liked and unliked post
exports.likeAndUnlikePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: `post not found !`,
      });
    }

    if (post.likes.includes(req.user._id)) {
      const index = post.likes.indexOf(req.user._id);

      post.likes.splice(index, 1);

      await post.save();

      return res.status(200).json({
        success: true,
        message: `post unliked`,
      });
    } else {
      post.likes.push(req.user._id);

      await post.save();

      return res.status(200).json({
        success: true,
        message: `post liked `,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get posts of following
exports.getPostOfFollowing = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)

    // $in helps to show the only related results of the user
    // great method to find related objects
    const posts = await Post.find({
      owner: {
        $in: user.following,
      },
    }).populate('owner likes comments.user')

    res.status(200).json({
      success: true,
      posts:posts.reverse(), /* In order to access latest post reverse function is taken */
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// update caption
exports.updateCaption = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const post = await Post.findById(req.params.id);

    const { caption } = req.body;

    if (!post) {
      return res.status(404).json({
        success: false,
        message: `post not found`,
      });
    }

    if (post.owner.toString() !== req.user._id.toString()) {
      return res.status(500).json({
        success: false,
        message: `unAuthorized`,
      });
    }

    if (!caption) {
      return res.status(500).json({
        success: false,
        message: `enter somthing to add caption`,
      });
    }

    if (caption) {
      post.caption = caption;
    }

    await post.save();

    res.status(200).json({
      success: true,
      message: `caption edited successfully`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// add commnet

exports.commentOnPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: `post not found`,
      });
    }

    let commentsIndex = -1;

    // checking if comment exists
    post.comments.forEach((item, index) => {
      if (item.user.toString() === req.user._id.toString()) {
        commentsIndex = index;
      }
    });

    if (commentsIndex !== -1) {
      post.comments[commentsIndex].comment = req.body.comment;
      await post.save();

      //hrer status code must be 200 for success message otherwise success message will be pushed to error message like if we give 500 message will be pushed to error that may brings confusion
      res.status(200).json({
        success: true,
        message: `comment updated`,
      });
    } else {
      post.comments.push({
        user: req.user._id,
        comment: req.body.comment,
      });

      await post.save();

      return res.status(200).json({
        success: true,
        message: `comment added`,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// delete comment

exports.deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: `post not found`,
      });
    }

    if (post.owner.toString() === req.user._id.toString()) {
      if(req.body.commentId == undefined){
        return res.status(400).json({
          success:false,
          message:`comment Id is required`
        })
      }
      post.comments.forEach((item, index) => {
        if (item._id.toString() === req.body.commentId.toString()) {
          return post.comments.splice(index, 1);
        }
      });

      await post.save()

      res.status(200).json({
        success:true,
        messsage:`selected comment has been deleted`
      })
    } else {
      post.comments.forEach((item, index) => {
        if (item.user.toString() === req.user.id) {
          return post.comments.splice(index, 1);
        }
      });

      await post.save()

      res.status(200).json({
        success:true,
        messsage:`Your comment has been deleted`
      })
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
