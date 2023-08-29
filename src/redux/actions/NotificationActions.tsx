import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import { Notification, NotificationsState } from "../../types/types";

export const fetchNotifications =
  (): ThunkAction<void, NotificationsState, null, Action<string>> =>
  async (dispatch) => {
    try {
      const notification: Notification[] = [
        {
          title: "Aelrta",
          description:
            " jahnsdjk asdahsiuahsdh aisud iuashiu isdh aisu asu uah uad",
          releaseDate: new Date(),
          url: "",
        },
        {
          title: "Alerta 2",
          description: " sadd as aw q q dq dqd qcd qv qcq qv q ",
          releaseDate: new Date(),
          url: "",
        },
        {
          title: "Alerta 3",
          description:
            "as dnajks hjkaiuah iuqw8 dhiuqbwiuyqwguyg quy qyuy gqwy quwy quwy duyqiuyqwiuy ai",
          releaseDate: new Date(),
          url: "",
        },
      ];

      dispatch({
        type: "FETCH_NOTIFICATIONS_SUCCESS",
        payload: notification,
      });
    } catch (error) {
      console.error(error);
    }
  };

export const ADD_NOTIFICATION = "ADD_NOTIFICATION";

export interface AddNotificationAction {
  type: typeof ADD_NOTIFICATION;
  payload: Notification;
}

export const addNotification = (
  notification: Notification
): AddNotificationAction => ({
  type: ADD_NOTIFICATION,
  payload: notification,
});
