import { showAlert } from './utils.js';
import { ALERT_SHOW_TIME } from './constants.js';

const BASE_URL = 'https://28.javascript.pages.academy/kekstagram';
const Route = {
  GET_DATA : '/data',
  SEND_DATA : '/'
};
const Method = {
  GET : 'GET',
  POST : 'POST'
};
const GET_DATA_ERROR_MESSAGE = 'Что-то пошло не так... Попробуйте перегрузить страницу.';

const onGetDataError = () => showAlert(GET_DATA_ERROR_MESSAGE, ALERT_SHOW_TIME);

const load = (
  route = Route.GET_DATA,
  method = Method.GET,
  body = null,
) => fetch(`${BASE_URL}${route}`, {method : method, body})
  .then((response) => {
    if (!response.ok) {
      throw new Error();
    } else {
      return response.json();
    }
  })
  .catch(() => {
    throw new Error();
  });

const getPublications = () => load(Route.GET_DATA);

const postPublication = (body) => load(Route.SEND_DATA, Method.POST, body);

export {
  getPublications,
  postPublication,
  onGetDataError
};
