import React, { useEffect } from "react";
import { connect, ConnectedProps, useDispatch } from "react-redux";
import {
  fetchComments,
  addComment,
} from "../../../redux/actions/commentsActions";
import { RootState } from "../../../redux/store/rootReducer";
import { Comment } from "../../../types/types";
import { CommentBox } from "../../../components";
import { getRandomNumber } from "../../../utils/utils";
import ReviewItem from "../../../components/Inputs/ReviewItem/ReviewItem/ReviewItem";

const mapState = (state: RootState) => ({
  comments: state.commentsState.comments,
});

const mapDispatch = {
  fetchComments,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;
type CommentsListProps = PropsFromRedux;

const CommentsList: React.FC<CommentsListProps> = ({
  comments,
  fetchComments,
}) => {
  useEffect(() => {
    fetchComments();
  }, [fetchComments]);
  const dispatch = useDispatch();

  const handlerOnSaveMessage = (titleValue: string, commentValue: string) => {
    const newComment: Comment = {
      name: titleValue,
      body: commentValue,
      id: getRandomNumber(10000),
      reviewedDate: new Date(),
    };
    // make the POST CALL to the API to POST the new comment
    dispatch(addComment(newComment));
  };

  return (
    <div
      className="w-full flex flex-col justify-center items-center"
      id="comments-box"
    >
      <div className="flex w-full flex-col justify-start items-start mt-5 rounded p-2 border-gray-300 border-2">
        <CommentBox onSaveCommentEvent={handlerOnSaveMessage} />
      </div>
      <div className="flex flex-col justify-around py-0">
        {comments.map((comment: Comment) => (
          <ReviewItem item={comment} />
        ))}
      </div>
    </div>
  );
};

export default connector(CommentsList);
