
const uploadPublication = (body, onSuccess, onError, onFinale) => {
  fetch(
    'https://28.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },)
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      } else {
        onSuccess();
      }
    })
    .catch(() => onError())
    .finally(() => onFinale());
};

export { uploadPublication };

