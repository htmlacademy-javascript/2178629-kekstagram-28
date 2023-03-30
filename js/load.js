const loader = (onSucsess, onError) => () => {
  fetch('https://28.javascript.pages.academy/kekstagram/data',
    {
      method: 'GET'
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.status} ${response.statusText} (статусный текст ошибки)`);
    })
    .then((data) => onSucsess(data))
    .catch((err) => onError(err));
};

export { loader };
