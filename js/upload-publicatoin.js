
function uploadPublication(body, onSuccess) {
  fetch(
    'https://28.javascript.pages.academy/kekstagram1',
    {
      method: 'POST',
      body,
    },)
    .then((response) => {
      console.log(response.ok);
      if (!response.ok) {
        new Error();
      } else {
      onSuccess();
      }
    })
    .catch((err) => console.log('лажа'));
}

export { uploadPublication };

