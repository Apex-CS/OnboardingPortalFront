import { combineReducers } from "redux";
import { commentsReducer } from "../reducers/CommentsReducer";

const rootReducer = combineReducers({
  commentsState: commentsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
