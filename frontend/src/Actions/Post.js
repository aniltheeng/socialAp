import axios from "axios";

export const likePost = (id) => async (dispatch) => {
  try {
    dispatch({
      type: " likeRequest",
    });

    const { data } = await axios.get(`/app/post/${id}`);

    dispatch({
      type: "likeSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "likeFailure",
      payload: error.response.data.message,
    });
  }
};

export const addComment = (id,comment) => async (dispatch) => {
    try {
      dispatch({
        type: "addCommentRequest",
      });
  
      const { data } = await axios.put(
        `/app/post/comment/${id}`,
        { comment },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      //if success message is pushed to error message that is wrong with status code like success status code = 200 and error code 500
  
      dispatch({
        type: "addCommentSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "addCommentFailure",
        payload: error.response.data.message
      });
    }
  };;

  //update post 
  export const updatePost = (caption,id) => async (dispatch) => {
    try {
      dispatch({
        type: "updatePostRequest",
      });
  
  
      const { data } = await axios.put(
        `/app/post/${id}`,
        {
          caption,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({
        type: "updatePostSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "updatePostFailure",
        payload: error.response.data.message,
      });
    }
  };

  //delete comment
  export const deleteComment = (id,commentId) => async (dispatch) => {
    try {
      dispatch({
        type: "deleteCommentRequest",
      });

      // if data is given from by pass it with data:req.body.data(from backend)  data:commentId (taken from user)
      const { data } = await axios.delete(
        `/app/post/comment/${id}`,{
         data:{commentId},
        }
      );

      dispatch({
        type: "deleteCommentSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "deleteCommentFailure",
        payload: error.response.data.message
      });
    }
  };;

  //delete post

  export const deletePost = (id) => async (dispatch) => {
    try {
      dispatch({
        type: "deletePostRequest",
      });

      // if data is given from by pass it with data:req.body.data(from backend)  data:commentId (taken from user)
      const { data } = await axios.delete(
        `/app/post/${id}`,{
        }
      );

      dispatch({
        type: "deletePostSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "deletePostFailure",
        payload: error.response.data.message
      });
    }
  };;


  export const createNewPost = (caption,image) => async (dispatch) => {
    try {
      dispatch({
        type: "newPostRequest",
      });

      // if data is given from by pass it with data:req.body.data(from backend)  data:commentId (taken from user)
      const { data } = await axios.post(
        `/app/post/upload`,{caption,image},{
          headers:{
            "Content-type":'application/json'
          }
        }
      );

      dispatch({
        type: "newPostSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "newPostFailure",
        payload: error.response.data.message
      });
    }
  };;
