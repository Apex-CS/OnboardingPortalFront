import { Button } from "@mui/material";
import { Comment } from "../../../../types/types";
import "./ReviewItem.css";
import { DisLike, Like } from "../../../../resources/svg/GeneralIcons";
import {
  ICON_COLOR_DISLIKE_DEFAULT,
  ICON_COLOR_LIKE_DEFAULT,
} from "../../../../utils/utils";

interface ReviewItemProps {
  item: Comment;
  disableButtons?: boolean;
}

const ICON_SIZE_DEFAULT = "28";

function ReviewItem({ item, disableButtons = false }: ReviewItemProps) {
  return (
    <div className="testimonial-box">
      <article>
        <div className="box-top">
          <div className="profile">
            <div className="name-user">
              <strong>{item.name}</strong>
              <span>{item.reviewedDate.toDateString()}</span>
            </div>
          </div>
          {!disableButtons && (
            <div className="reviews">
              <div className="flex items-center mb-1">
                <Button
                  className=""
                  endIcon={
                    <Like
                      width={ICON_SIZE_DEFAULT}
                      height={ICON_SIZE_DEFAULT}
                      color={ICON_COLOR_LIKE_DEFAULT}
                    />
                  }
                />
                <Button
                  endIcon={
                    <DisLike
                      width={ICON_SIZE_DEFAULT}
                      height={ICON_SIZE_DEFAULT}
                      color={ICON_COLOR_DISLIKE_DEFAULT}
                    />
                  }
                />
              </div>
            </div>
          )}
        </div>
        <p className="mb-2 text-gray-500 dark:text-gray-400">{item.body}</p>
      </article>
    </div>
  );
}

export default ReviewItem;
