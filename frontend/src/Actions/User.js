import axios from 'axios'

//register

export const register = (name,email, password,avatar) => async (dispatch) => {
  try {
    dispatch({
      type: "RegisterRequest",
    });

    const { data } = await axios.post(
      "/app/register",
      { name,email, password,avatar },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "RegisterSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "RegisterFailure",
      payload: error.response.data.message
    });
  }
};

// login 
export const loginUser = (email, password) => async (dispatch) => {
    try {
      dispatch({
        type: "LoginRequest",
      });
  
      const { data } = await axios.post(
        "/app/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      dispatch({
        type: "LoginSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "LoginFailure",
        payload: error.response.data.message
      });
    }
  };

  //logout
  export const logoutUser = () => async (dispatch) => {
    try {
      dispatch({
        type: "logoutUserRequest",
      });
  
      await axios.get("/app/loggout");
  
      dispatch({
        type: "logoutUserSuccess",
      });
    } catch (error) {
      dispatch({
        type: "logoutUserFaiure",
        payload: error.response.data.message,
      });
    }
  };


//   loadUser 
  export const loadUser = () => async (dispatch) => {
    try {
      dispatch({
        type: "LoadUserRequest",
      });
  
      const { data } = await axios.get(
        "/app/myinfo",
      );
  
      dispatch({
        type: "LoadUserSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "LoadUserFailure",
        payload: error.response.data.message
      });
    }
  };


//   postOf following 
  export const getPostOfFollowing = () => async (dispatch) => {
    try {
      dispatch({
        type: " postOfFollowingRequest",
      });
  
      const { data } = await axios.get(
        "/app/posts",
      );
  
      dispatch({
        type: "postOfFollowingSuccess",
        payload: data.posts,
      });
    } catch (error) {
      dispatch({
        type: "postOfFollowingFailure",
        payload: error.response.data.message
      });
    }
  };

  //all users

  export const allUsers = (name="") =>
  async (dispatch) => {
    try {
      dispatch({
        type: "allUsersRequest",
      });

      // app/users?name = ${name} will not work 
      const { data } = await axios.get(`/app/users?name=${name}`);
      dispatch({
        type: "allUsersSuccess",
        payload: data.users,
      });
    } catch (error) {
      dispatch({
        type: "allUsersFailure",
        payload: error.response.data.message,
      });
    }
  };

  //myPost
  export const myPosts = () => async (dispatch) => {
    try {
      dispatch({
        type: " myPostRequest",
      });
  
      const { data } = await axios.get(
        "/app/my/posts",
      );
  
      dispatch({
        type: "myPostSuccess",
        payload: data.posts
      });
    } catch (error) {
      dispatch({
        type: "myPostFailure",
        payload: error.response.data.message
      });
    }
  };

  // user post
  export const getUserPosts = (id) => async (dispatch) => {
    try {
      dispatch({
        type: " userPostRequest",
      });
  
      const { data } = await axios.get(
        `/app/userpost/${id}`,
      );
  
      dispatch({
        type: "userPostSuccess",
        payload: data.posts
      });
    } catch (error) {
      dispatch({
        type: "userPostFailure",
        payload: error.response.data.message
      });
    }
  };

  export const getUsersProfile = (id) => async (dispatch) => {
    try {
      dispatch({
        type: "userProfileRequest",
      });
  
      const { data } = await axios.get(`/app/user/${id}`);
      dispatch({
        type: "userProfileSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "userProfileFailure",
        payload: error.response.data.message,
      });
    }
  };

  //follow and unfollow user
  export const followAndUnfollowUser = (id) => async (dispatch) => {
    try {
      dispatch({
        type: "followUserRequest",
      });
  
      const { data } = await axios.get(`/app/follow/${id}`);
      dispatch({
        type: "followUserSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "followUserFailure",
        payload: error.response.data.message,
      });
    }
  };



  //update Password
  export const updatePassword = (oldPassword,newPassword,confirmPassword) => async (dispatch) => {
    try {
      dispatch({
        type: "UpdatePasswordRequest",
      });
  
      const { data } = await axios.put(
        `/app/update/password`,
        {
          oldPassword,newPassword,confirmPassword
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({
        type: "UpdatePasswordSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "UpdatePasswordFailure",
        payload: error.response.data.message,
      });
    }
  };


  //delet Account
  export const deleteAccount = () => async (dispatch) => {
    try {
      dispatch({
        type: "deleteAccountRequest",
      });
  
      const { data } = await axios.delete(
        `/app/delete/account`,
      );
      dispatch({
        type: "deleteAccountSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "deleteAccountFailure",
        payload: error.response.data.message,
      });
    }
  };

    //update Profile
    export const updateProfile= (name,email,avatar) => async (dispatch) => {
      try {
        dispatch({
          type: "UpdateProfileRequest",
        });
    
        const { data } = await axios.put(
          `/app/update/profile`,
          {
            name,email,avatar
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        dispatch({
          type: "UpdateProfileSuccess",
          payload: data.message,
        });
      } catch (error) {
        dispatch({
          type: "UpdateProfileFailure",
          payload: error.response.data.message,
        });
      }
    };
  
    //frogot password

    export const forgotPassword = (email) => async (dispatch) => {
      try {
        dispatch({
          type: "forgotPasswordRequest",
        });
    
        const { data } = await axios.post(
          "/app/forget/password",{email},
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
    
        dispatch({
          type: "forgotPasswordSuccess",
          payload: data.message,
        });
      } catch (error) {
        dispatch({
          type: "forgotPasswordFailure",
          payload: error.response.data.message
        });
      }
    };

    //reset password
    export const resetPassword = (token, password) => async (dispatch) => {
      try {
        dispatch({
          type: "resetPasswordRequest",
        });
    
        const { data } = await axios.put(
          `/app/reset/password/${token}`,
          {
            password
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
    
        dispatch({
          type: "resetPasswordSuccess",
          payload: data.message,
        });
      } catch (error) {
        dispatch({
          type: "resetPasswordFailure",
          payload: error.response.data.message,
        });
      }
    };