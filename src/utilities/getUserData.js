const env = require('env2')('.env');

const checkResponse = response => {
  if (response.status === 404) {
    return "not valid user";
  } else if (response.status !== 200) {
    console.log(`Error with the request! ${response.status}`);
    return "error";
  }
  return response.json();
};

export const getUserData = (url) => {
  return fetch(`${url}?access_token=${process.env.accessToken}`)
    .then(checkResponse)
};