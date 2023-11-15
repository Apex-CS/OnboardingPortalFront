import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import { CommentsState, Comment } from "../../types/types";
export const fetchComments =
  (): ThunkAction<void, CommentsState, null, Action<string>> =>
  async (dispatch) => {
    try {
      const comments: Comment[] = [];
      dispatch({
        type: "FETCH_COMMENTS_SUCCESS",
        payload: comments,
      });
    } catch (error) {
      console.error(error);
    }
  };

export const ADD_COMMENT = "ADD_COMMENT";

export interface AddCommentAction {
  type: typeof ADD_COMMENT;
  payload: Comment;
}

export const addComment = (comment: Comment): AddCommentAction => ({
  type: ADD_COMMENT,
  payload: comment,
});
