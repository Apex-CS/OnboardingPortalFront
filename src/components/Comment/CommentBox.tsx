import React, { useState } from "react";
import Button from "../Inputs/Button/Button";

import { DisLike, Like } from "../../resources/svg/GeneralIcons";
import LabelTitle from "../Labels/LabelTitle";
import {
  ICON_COLOR_DISLIKE_DEFAULT,
  ICON_COLOR_LIKE_DEFAULT,
} from "../../utils/utils";
interface CommentBoxInterface {
  onSaveCommentEvent: (titleValue: string, commentValue: string) => void;
}

const ICON_SIZE_DEFAULT = "48";

function CommentBox({ onSaveCommentEvent }: CommentBoxInterface) {
  const [comment, setComment] = useState("");
  const [title, setTitle] = useState("");

  const inputHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const enteredValue = event?.target?.value;
    setComment(enteredValue ? enteredValue : "");
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSaveCommentEvent(title, comment);
    setComment("");
    setTitle("");
  };

  const postLabel = "Post Comment";

  const inputHandlerName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event?.target?.value;
    setTitle(inputValue);
  };

  return (
    <div className="w-full container">
      <form onSubmit={onSubmit}>
        <div className="w-full mb-4">
          <div className="pr-4 py-2 rounded-t-lg">
            <div className="w-full flex items-end justify-end">
              <div className="flex w-full items-start justify-start">
                <LabelTitle
                  customClass="text-xl ml-1 font-bold text-sky-400"
                  title="Post your comment"
                />
              </div>
              <div className="rounded flex items-center justify-center mx-2 px-4   hover:bg-gray-100">
                <Button
                  label=""
                  customClass={""}
                  icon={
                    <Like
                      width={ICON_SIZE_DEFAULT}
                      height={ICON_SIZE_DEFAULT}
                      color={ICON_COLOR_LIKE_DEFAULT}
                    />
                  }
                />
              </div>
              <div className="rounded flex items-center justify-center ml-2 pl-4   hover:bg-gray-100">
                <Button
                  customClass={""}
                  icon={
                    <DisLike
                      width={ICON_SIZE_DEFAULT}
                      height={ICON_SIZE_DEFAULT}
                      color={ICON_COLOR_DISLIKE_DEFAULT}
                    />
                  }
                />
              </div>
            </div>

            <div className="flex w-full my-5 justify-between">
              <div className="w-full">
                <label
                  htmlFor="first_name"
                  className="block mb-2 font-bold text- text-sm text-sky-400"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="first_name"
                  onChange={inputHandlerName}
                  value={title}
                  className="relative z-0 mb-3 group w-full  border text-black border-gray-300  text-sm rounded-lg focus:ring-blue-500
                     focus:border-blue-500 block p-2.5 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  required
                />
              </div>
            </div>
          </div>
          <div className="pr-4 py-0 rounded-t-lg">
            <label
              htmlFor="comment"
              className="block mb-2 text-sm  font-bold  text-sky-400"
            >
              What did you think of the movie? (optional)
            </label>
            <textarea
              id="message"
              value={comment}
              onChange={inputHandler}
              rows={4}
              className="block p-2.5 mb-2 w-full text-sm  text-black rounded-lg border border-gray-300
               focus:ring-blue-500 focus:border-blue-500  dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
            ></textarea>
          </div>
          <div className="flex items-center justify-between px-0 pt-2 ">
            <Button
              label={postLabel}
              type="submit"
              customClass="disabled:opacity-75 inline-flex items-center py-2.5 px-0 text-xs font-medium text-cente py-2 px-10 bg-sky-400"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default CommentBox;
