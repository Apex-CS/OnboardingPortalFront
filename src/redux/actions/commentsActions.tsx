import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import { CommentsState, Comment } from "../../types/types";
import { getRandomDate, getRandomNumber } from "../../utils/utils";
export const fetchComments =
  (): ThunkAction<void, CommentsState, null, Action<string>> =>
  async (dispatch) => {
    try {
      const comments: Comment[] = await [
        {
          id: getRandomNumber(1999),
          name: "Leonardo Gonzalez",
          body: `Hey guys, have you seen the latest updates on the project? I think we're making good progress.`,
          reviewedDate: getRandomDate(),
          rating: 5,
        },
        {
          id: getRandomNumber(1999),
          name: "Emanuel Lopez",
          body: "Yeah, things are going well overall. However, I have some concerns about John's performance. Lately, he seems to be falling behind on his tasks.",
          reviewedDate: getRandomDate(),
          rating: getRandomNumber(5),
        },
        {
          id: getRandomNumber(1999),
          name: "Jennifer Languren",
          body: "I've noticed that too. It's been taking him longer to complete his assignments, and his code quality has been inconsistent.",
          reviewedDate: getRandomDate(),
          rating: getRandomNumber(5),
        },
        {
          id: getRandomNumber(1999),
          name: "Leonardo Gonzalez",
          body: "Hmm, that's concerning. Do we know if there's any specific reason for his performance decline? Maybe he's facing some personal issues or struggling with the technology stack?",
          reviewedDate: getRandomDate(),
          rating: getRandomNumber(5),
        },
        {
          id: getRandomNumber(1999),
          name: "Emanuel Lopez",
          body: "I was completely absorbed in this movie. The acting was phenomenal and the script was masterfully written.",
          reviewedDate: getRandomDate(),
          rating: getRandomNumber(5),
        },
        {
          id: getRandomNumber(1999),
          name: "Emanuel Lopez",
          body: "It's important for us to support John and help him overcome these challenges. Maybe we can pair program with him on some tasks and offer guidance whenever he needs it. Additionally, we can suggest resources or training opportunities to help him improve his skills.",
          reviewedDate: getRandomDate(),
          rating: getRandomNumber(5),
        },
        {
          id: getRandomNumber(1999),
          name: "Jennifer Languren",
          body: "That's a good idea, Developer 3. Let's make an effort to create a supportive and inclusive environment for John. We can also discuss the situation with our project manager and see if there are any adjustments we can make to the workload or provide additional training to address the gaps in John's knowledge.",
          reviewedDate: getRandomDate(),
          rating: getRandomNumber(5),
        },
        {
          id: getRandomNumber(1999),
          name: "Leonardo Gonzalez",
          body: "Absolutely. It's crucial that we address this issue early on to ensure the success of the project and support the growth of our team members. Let's schedule a team meeting to discuss this further and come up with a plan of action.",
          reviewedDate: getRandomDate(),
          rating: getRandomNumber(5),
        },
        {
          id: getRandomNumber(1999),
          name: "Emanuel Lopez",
          body: "Great. I'm glad we're taking a proactive approach. Our collective effort will not only benefit John but also contribute to the overall productivity and success of the project.",
          reviewedDate: getRandomDate(),
          rating: getRandomNumber(5),
        },
        {
          id: getRandomNumber(1999),
          name: "Leonardo Gonzalez",
          body: "This film was a masterpiece. The directing and editing were superb, and the performances from the entire cast were outstanding.",
          reviewedDate: getRandomDate(),
          rating: getRandomNumber(5),
        },
      ];
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
