import React from 'react';
import { renderIntoDocument, cleanup, fireEvent, waitForElement } from 'react-testing-library';
import Form from './form.js';
import mockData from './mock.json'
import fetchMock from 'fetch-mock';
const env = require('env2')('.env');

afterEach(cleanup);

test('form component', () => {
  fetchMock.mock(`https://api.github.com/users/helenzhou6?access_token=${process.env.accessToken}`, mockData)
  const { getByText, getByLabelText, getByTestId } = renderIntoDocument(
    <Form />
  );

  const button = getByText('Play!');
  const input = getByLabelText('Enter any GitHub Username:');

  input.value = 'helenzhou6';
  fireEvent.change(input);
  fireEvent.click(button);
  return waitForElement(() => getByTestId('userData'))
    .then(output => expect(output.innerHTML)
      .toEqual("The mole:<a class=\"userCard__details\" href=\"https://github.com/helenzhou6\"><img class=\"userCard__avatar\" src=\"https://avatars1.githubusercontent.com/u/25727036?v=4\">helenzhou6</a><button class=\"button\">↩</button>"))

})