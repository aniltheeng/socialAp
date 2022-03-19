import { configureStore } from "@reduxjs/toolkit";
import { likeReducer, myPosts, userPost } from "./Reducers/Post";
import { allUsersReducers, postOfFollowingReducers, userReducer, usersProfile} from "./Reducers/User";

const store = configureStore({
  reducer: {
      user:userReducer,
      postOfFollowing:postOfFollowingReducers,
      allUsers:allUsersReducers,
      like:likeReducer,
      myPost:myPosts,
      usersPosts:userPost,
      userProfile:usersProfile
  },
})

export default store
