import { Button } from "@mui/material";
import { Comment } from "../../../../types/types";
import "./ReviewItem.css";
import { Pencil, Trash } from "../../../../resources/svg/GeneralIcons";
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
              <strong>{item.message}</strong>
              <span>{item.updatedDate as string}</span>
            </div>
          </div>
          {!disableButtons && (
            <div className="reviews">
              <div className="flex items-center mb-1">
                <Button
                  className=""
                  endIcon={
                    <Pencil
                      width={ICON_SIZE_DEFAULT}
                      height={ICON_SIZE_DEFAULT}
                      color={ICON_COLOR_LIKE_DEFAULT}
                    />
                  }
                />
                <Button
                  endIcon={
                    <Trash
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
        <p className="mb-2 text-gray-500 dark:text-gray-400">{item.message}</p>
      </article>
    </div>
  );
}

export default ReviewItem;
