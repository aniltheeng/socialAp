const User = require("../models/userModel");
const Post = require("../models/postModel");
const { sendEmail } = require("../middlewares/sendEmail");
const crypto = require("crypto");
const cloudinary = require('cloudinary')

// signup
exports.register = async (req, res) => {

  // async await must be included inside of tryCatch function
  try {
    const { name, email, password, avatar } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const myCloud = await cloudinary.v2.uploader.upload(avatar, {
      folder: "Avatars",
    });

    user = await User.create({
      name,
      email,
      password,
      avatar: { public_id: myCloud.public_id, url: myCloud.secure_url },
    });

    const token = await user.generateToken();

    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.status(201).cookie("token", token, options).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //here populate is necessary in order to access users details that is necessary to show after login at the same time 
    const user = await User.findOne({ email }).select("+password").populate('posts followers following');

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "incorrect password",
      });
    }

    const token = await user.generateToken();

    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.status(200).cookie("token", token, options).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.logOut = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })
      .json({
        success: true,
        message: `logged out`,
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// follow and unfolow users
exports.followUser = async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id);
    const loggedInUser = await User.findById(req.user._id);

    if (!userToFollow) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    if (loggedInUser.following.includes(userToFollow._id)) {
      const followingIndex = loggedInUser.following.indexOf(userToFollow._id);
      const follwersIndex = userToFollow.followers.indexOf(loggedInUser._id);

      loggedInUser.following.splice(followingIndex, 1);
      userToFollow.followers.splice(follwersIndex, 1);

      await loggedInUser.save();
      await userToFollow.save();

      res.status(200).json({
        success: true,
        message: `User unfollowed`,
      });
    } else {
      loggedInUser.following.push(userToFollow._id);
      userToFollow.followers.push(loggedInUser._id);

      await userToFollow.save();
      await loggedInUser.save();

      res.status(200).json({
        success: true,
        message: `User followed`,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("+password");

    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (!oldPassword) {
      return res.status(400).json({
        success: false,
        message: `please provide old password `,
      });
    }

   
    const isMatch = await user.matchPassword(oldPassword);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: `incorrect old password !`,
      });
    }

    if (!newPassword) {
      return res.status(400).json({
        success: false,
        message: `please provide new password `,
      });
    }

    if (!confirmPassword) {
      return res.status(400).json({
        success: false,
        message: `please provide confirm password `,
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: `please enter same new and confirm password`,
      });
    }


    user.password = newPassword;

    await user.save();

    res.status(200).json({
      success: true,
      message: `password updated successfully ...`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const { name, email,avatar } = req.body;

    if (name) {
      user.name = name;
    }

    if (email) {
      user.email = email;
    }

    if(avatar){
      await cloudinary.v2.uploader.destroy(user.avatar.public_id)

      const myCloud = await cloudinary.v2.uploader.upload(avatar,{
        folder:"Avatars"
      })

      user.avatar.public_id = myCloud.public_id
      user.avatar.url = myCloud.secure_url
    }
    await user.save();

    res.status(200).json({
      success: true,
      message: `profile updated successfully`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// delete own profiile
exports.deleteMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const followers = user.followers;

    const following = user.following;

    const posts = user.posts;

    const userId = user._id;

    await cloudinary.v2.uploader.destroy(user.avatar.public_id)

    await user.remove();

    // logged out user after deleting profile

    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    // delete all post of user
    for (let i = 0; i < posts.length; i++) {
      const post = await Post.findById(posts[i]);
      await cloudinary.v2.uploader.destroy(post.image.public_id)
      await post.remove();
    }

    for (let i = 0; i < followers.length; i++) {
      const follower = await User.findById(followers[i]);

      const index = follower.following.indexOf(userId);

      follower.following.splice(index, 1);

      await follower.save();
    }

    for (let i = 0; i < following.length; i++) {
      const follows = await User.findById(following[i]);

      const index = follows.followers.indexOf(userId);
      follows.followers.splice(index, 1);

      await follows.save();
    }

    //removing all comments of the user from all posts
    const allPosts = await Post.find()

    for(let i = 0; i < allPosts.length;i++){
      const post = await posts.findById(allPosts[i]._id)

      for(let j = 0; j < post.comments.length; i++){
        if(post.comments[j].user === userID){
          post.comments.splice(j,1)
        }
      }
      await post.save()

    }

    //removing all likes of the user from all posts

    for(let i = 0;i < posts.length; i++){
      const post = await posts.findById(posts[i]._id)

      for(let j = 0; j < post.likes.length; j++){
        if(post.likes[j] === userId){
          post.likes.splice(j,1)
        }
      }
      await post.save()

    }


    // removing user from follower's following
    res.status(200).json({
      success: true,
      message: `deleted account successfully`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get my profile
exports.myProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("posts followers following");

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.usersProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("posts followers following");

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("posts following followers");

    if (!user) {
      res.status(404).json({
        success: false,
        message: `User Not Found`,
      });
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    // they specify a string pattern to match a specific string in a text.
    const users = await User.find({name : {$regex : req.query.name ,$options: "i" }});

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getmyPosts = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const posts = [];

    for (let i = 0; i < user.posts.length; i++) {
      const post = await Post.findById(user.posts[i]).populate(
        "likes comments.user owner"
      );
      posts.push(post);
    }

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

//user post
exports.getUserPosts = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    const posts = [];

    for (let i = 0; i < user.posts.length; i++) {
      const post = await Post.findById(user.posts[i]).populate(
        "likes comments.user owner"
      );

      //here you access latest posts although using push methods because we have already done reverse of push i.e unshift at the time of creating new post
      posts.push(post);
    }

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

exports.forgetPasword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: `user not found `,
      });
    }

    const resetPasswordToken = await user.getResetPasswordToken();

    // here user save is mandatory coz resetToken will be genererate only after saving data
    await user.save();

    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/reset/password/${resetPasswordToken}`;

    const message = `reset your Password clicking below link. \n\n ${resetUrl}`;

    try {
      await sendEmail({
        email: user.email,
        subject: "ResetPassword Token",
        message,
      });

      res.status(200).json({
        success: true,
        message: `Email sent to ${user.email}`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//change password
exports.changePassword = async (req,res) => {
  try {
    const token = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

    const user = await User.findOne({
      token,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: `token not found or has been expired !`,
      });
    }

    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    res.status(200).json({
      success: true,
      message: `password updated successfully.`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
