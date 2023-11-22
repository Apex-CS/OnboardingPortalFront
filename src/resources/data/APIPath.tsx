// MAIN ENDPOINT:
const ENDPOINT_API = "https://onportal.azurewebsites.net/api/v1";

// TAGS:
const ENDPOINT_ADD_TAG_POST = "/tags";
const ENDPOINT_GET_TAGS_GET = "/tags";

// NEWS LETTER:
const ENDPOINT_NEWS_LETTER_SUSCRIBE_POST = `${ENDPOINT_API}/newsletter/subscribe`;
const ENDPOINT_NEWS_LETTER_UNSUSCRIBE = `${ENDPOINT_API}/newsletter/unsubscribe/{email}`;

// CATEGORY
const URL_GET_CATEGORY = `${ENDPOINT_API}/categories/all`;

// TASK
const URL_TASK_COUNT = `${ENDPOINT_API}/task/count?userId=3`;
const URL_TASK_USER_ALL = `${ENDPOINT_API}/task/user/addall?userId=3&type=Meetings`;
export {
  ENDPOINT_ADD_TAG_POST,
  ENDPOINT_GET_TAGS_GET,
  ENDPOINT_NEWS_LETTER_SUSCRIBE_POST,
  ENDPOINT_NEWS_LETTER_UNSUSCRIBE,
  ENDPOINT_API,
  URL_GET_CATEGORY,
  URL_TASK_COUNT,
  URL_TASK_USER_ALL,
};
