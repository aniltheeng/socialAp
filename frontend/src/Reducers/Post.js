import  {createReducer} from '@reduxjs/toolkit'

const initialState = {}

export const likeReducer = createReducer(initialState,{
    //likes
    likeRequest:(state)=>{
        state.loading = true
    },
    likeSuccess:(state,action)=>{
        state.loading = false
        state.message = action.payload
    },
    likeFailure:(state,action)=>{
         state.loading = false
        state.error= action.payload
    },

    //comments
    addCommentRequest:(state)=>{
        state.loading = true
    },
    addCommentSuccess:(state,action)=>{
        state.loading = false
        state.message = action.payload
    },
    addCommentFailure:(state,action)=>{
        state.loading = false
        state.error= action.payload
    },

    deleteCommentRequest:(state)=>{
        state.loading = true
    },
    deleteCommentSuccess:(state,action)=>{
        state.loading = false
        state.message = action.payload
    },
    deleteCommentFailure:(state,action)=>{
        state.loading = false
        state.error= action.payload
    },

    //create post
    newPostRequest:(state)=>{
        state.loading = true
    },
    newPostSuccess:(state,action)=>{
        state.loading = false
        state.message = action.payload
    },
    newPostFailure:(state,action)=>{
        state.loading = false
        state.error= action.payload
    },

     //update profile
  UpdateProfileRequest: (state) => {
    state.loading = true;
  },
  UpdateProfileSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  UpdateProfileFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  //delete profile
  deleteAccountRequest: (state) => {
    state.loading = true;
  },
  deleteAccountSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  deleteAccountFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
    
  //forgot password
  forgotPasswordRequest: (state) => {
    state.loading = true;
  },
  forgotPasswordSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  forgotPasswordFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  //resetPassword
  resetPasswordRequest: (state) => {
    state.loading = true;
  },
  resetPasswordSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  resetPasswordFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
    
    //update post 
    updatePostRequest:(state)=>{
        state.loading = true
    },
    updatePostSuccess:(state,action)=>{
        state.loading = false
        state.message = action.payload
    },
    updatePostFailure:(state,action)=>{
        state.loading = false
        state.error= action.payload
    },

    deletePostRequest:(state)=>{
        state.loading = true
    },
    deletePostSuccess:(state,action)=>{
        state.loading = false
        state.message = action.payload
    },
    deletePostFailure:(state,action)=>{
        state.loading = false
        state.error= action.payload
    },

    // follow and unfollow user
    followUserRequest:(state)=>{
        state.loading = true
    },
    followUserSuccess:(state,action)=>{
        state.loading = false
        state.message = action.payload
    },
    followUserFailure:(state,action)=>{
        state.loading = false
        state.error= action.payload
    },

    clearErrors:(state)=>{
        state.error= null
    },
    clearMessage:(state)=>{
        state.message = null
    }
})

export const myPosts = createReducer(initialState,{
    myPostRequest:(state)=>{
        state.loading = true
    },
    myPostSuccess:(state,action)=>{
        state.loading = false
        state.posts = action.payload
    },
    myPostFailure:(state,action)=>{
        state.loading = false
        state.error = action.payload
    },
    clearErrors:(state)=>{
        state.error = null
    },
})

export const userPost= createReducer(initialState,{
    userPostRequest:(state)=>{
        state.loading = true
    },
    userPostSuccess:(state,action)=>{
        state.loading = false
        state.posts = action.payload
    },
    userPostFailure:(state,action)=>{
        state.loading = false
        state.error = action.payload
    },
    clearErrors:(state)=>{
        state.error = null
    },
})