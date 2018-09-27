const { REACT_APP_GMARCONE_API_URL } = process.env;

class Forecast {
  static requestData(latitude, longitude) {
    const URL = `${REACT_APP_GMARCONE_API_URL}/api/forecast?latitude=${latitude}&longitude=${longitude}&lang=es`;

    return fetch(URL)
      .then(res => {
        if (res.status === 400) {
          const error = 'No pudimos encontrar datos de esa zona que clickeaste :(';

          return Promise.reject(new Error(error));
        }

        if (res.status === 500) {
          const error = 'Error crítico, vuelve a intentarlo en un rato.';

          return Promise.reject(new Error(error));
        }

        return res.json();
      })
      .then(res => res);
  }
}
export default Forecast;
