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

const emptyFunction = () => {};
const onGetDataError = () => showAlert(GET_DATA_ERROR_MESSAGE, ALERT_SHOW_TIME);

const load = (
  route = Route.SEND_DATA,
  method = Method.GET,
  body = null,
  onSuccess = emptyFunction,
  onError = onGetDataError,
  onFinale = emptyFunction,
) => fetch(`${BASE_URL}${route}`, {method : method, body})
  .then((response) => {
    if (!response.ok) {
      throw new Error();
    } else {
      onSuccess();
      return response.json();
    }
  })
  .catch(() => onError())
  .finally(() => onFinale());

const getPublications = () => load(Route.GET_DATA);

const uploadPublication = (body, onSuccess, onError, onFinale) => load(Route.SEND_DATA, Method.POST, body, onSuccess, onError, onFinale);

export {
  getPublications,
  uploadPublication,
  onGetDataError
};
