const API_ROOT = `${process.env.API_URL || '' }`;


function callApi(endpoint, params ) {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;
  return fetch(fullUrl, params )
    .then(function (response) {
      if (response.ok) { // a boolean stating whether the response was successful (status in the range 200-299) or not.
        return response.json();
      }
      let message = "Server Error";
      try {
        console.log('response=', response );
        message = response.statusText;
      } catch (e) {
        console.log(e);
      }
      let status = 500;
      try {
        status = response.status;
      } catch (e) {
        console.log(e);
      }
      let e = new Error(message);
      e.status = status;
      throw e;
    })
}

/**
 * Fetch All Movies, no paging.
 * @function
 * @returns Promise
 */
export const fetchMovies = (password) => callApi(`movies/`, {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({password})
});
