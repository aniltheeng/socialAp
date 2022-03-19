import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
};
export const userReducer = createReducer(initialState, {
  // /LoginUser
  LoginRequest: (state) => {
    state.loading = true;
  },
  LoginSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  },
  LoginFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },

  // registerUser
  RegisterRequest: (state) => {
    state.loading = true;
  },
  RegisterSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  },
  RegisterFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },

  // LoadUser
  LoadUserRequest: (state) => {
    state.loading = true;
  },
  LoadUserSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  },
  LoadUserFaiure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },

  logoutUserRequest: (state) => {
    state.loading = true;
  },
  logoutUserSuccess: (state) => {
    state.loading = false;
    state.user = null
    state.isAuthenticated = false;

  },
  logoutUserFaiure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = true;
  },

  //update password
  UpdatePasswordRequest: (state) => {
    state.loading = true;
  },
  UpdatePasswordSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  UpdatePasswordFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

 
  
  clearErrors: (state) => {
    state.error = null;
  },
});

// postOfFollowingUsers

export const postOfFollowingReducers = createReducer(initialState, {
  postOfFollowingRequest: (state) => {
    state.loading = true;
  },
  postOfFollowingSuccess: (state, action) => {
    state.loading = false;
    state.posts = action.payload;
  },
  postOfFollowingFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});

//all users
export const allUsersReducers = createReducer(initialState, {
  allUsersRequest: (state) => {
    state.loading = true;
  },
  allUsersSuccess: (state, action) => {
    state.loading = false;
    state.users = action.payload;
  },
  allUsersFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});

export const usersProfile = createReducer(initialState, {
  userProfileRequest: (state) => {
    state.loading = true;
  },
  userProfileSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
  },
  userProfileFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});

//

