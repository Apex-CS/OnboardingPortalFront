import React, { useEffect, useState } from "react";
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
import { useFetch } from "../../../hooks/useFetch";

const mapState = (state: RootState) => ({
  comments: state.commentsState.comments,
});

const mapDispatch = {
  fetchComments,
};

interface CommentsListParams {
  userId: number;
  taskId: number;
}

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export type Props = CommentsListParams & PropsFromRedux;

const CommentsList: React.FC<Props> = ({
  comments,
  fetchComments,
  taskId,
  userId,
}) => {
  const urlAPIPostComment = "https://onportal.azurewebsites.net/api/v1/comment";
  const urlAPIGETComment = `https://onportal.azurewebsites.net/api/v1/comments?taskId=${taskId}`;
  const [commentsList, setCommentsList] = useState<Comment[]>([]);
  const {
    data: dataPostComment,
    error: errorPostComment,
    isLoading: loadingPostComment,
    fetchData: fetchDataPostComment,
  } = useFetch(urlAPIPostComment, "POST");

  const {
    data: dataGETComment,
    error: errorGETComment,
    isLoading: loadingGETComment,
    fetchData: fetchDataGETComment,
  } = useFetch(urlAPIGETComment, "GET");

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  useEffect(() => {
    fetchDataGETComment();
  }, []);
  const dispatch = useDispatch();

  useEffect(() => {
    if (dataGETComment) {
      setCommentsList(dataGETComment as Comment[]);
    }
  }, [dataGETComment]);

  const handlerOnSaveMessage = (titleValue: string, commentValue: string) => {
    const newComment: Comment = {
      message: commentValue,
      id: getRandomNumber(10000),
      creationDate: new Date(),
      updatedDate: new Date(),
      userId: userId,
      taskId: taskId,
    };
    fetchDataPostComment(newComment);
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
      <div className="flex w-full flex-col justify-around py-0">
        {commentsList.map((comment: Comment) => (
          <ReviewItem item={comment} />
        ))}
      </div>
    </div>
  );
};

export default connector(CommentsList);
