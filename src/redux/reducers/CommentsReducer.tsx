import { Reducer } from "redux";
import { CommentsState } from "../../types/types";
import { ADD_COMMENT } from "../actions/commentsActions";

interface Action {
  type: string;
  payload?: any;
}

const initialState: CommentsState = {
  comments: [],
};

const commentsReducer: Reducer<CommentsState, Action> = (
  state = initialState,
  action: Action
) => {
  switch (action.type) {
    case "FETCH_COMMENTS_SUCCESS":
      return {
        comments: action.payload,
      };
    case ADD_COMMENT:
      return {
        ...state,
        comments: [action.payload, ...state.comments],
      };
    default:
      return state;
  }
};

export { commentsReducer };
