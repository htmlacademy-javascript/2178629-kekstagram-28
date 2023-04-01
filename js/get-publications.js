import { showAlert } from './utils.js';
import { ALERT_SHOW_TIME } from './constants.js';

const DOWNLOAD_ERROR_MESSAGE = 'Что-то пошло не так... Попробуйте перегрузить страницу.';

// async function getPublications____() {
//   try {
//     const response = await fetch('https://28.javascript.pages.academy/kekstagram/data');
//     const result = await response.json();
//     return result;
//   } catch {
//     showAlert(DOWNLOAD_ERROR_MESSAGE, ALERT_SHOW_TIME);
//   }
// }

const getPublications = () =>
  fetch(
    'https://28.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      } else {
        return response.json();
      }
    })
    .catch(() => showAlert(DOWNLOAD_ERROR_MESSAGE, ALERT_SHOW_TIME));

export { getPublications };
