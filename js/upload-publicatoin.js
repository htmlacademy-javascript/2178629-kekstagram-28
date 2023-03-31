
function uploadPublication(body, onSuccess) {
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
    .catch((err) => console.log(err));
}

export { uploadPublication };

