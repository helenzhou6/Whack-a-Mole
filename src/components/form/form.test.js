import React from 'react';
import { renderIntoDocument, cleanup, fireEvent, waitForElement } from 'react-testing-library';
import Form from './form.js';
import mockData from './mock.json'
import fetchMock from 'fetch-mock';
import { accessToken } from "../../../token";

afterEach(cleanup);

test('form component', () => {
  fetchMock.mock(`https://api.github.com/users/helenzhou6?access_token=${accessToken}`, mockData)
  const { getByText, getByLabelText, getByTestId } = renderIntoDocument(
    <Form />
  );

  const button = getByText('Submit');
  const input = getByLabelText('Enter your GitHub Username:');

  input.value = 'helenzhou6';
  fireEvent.change(input);
  fireEvent.click(button);
  return waitForElement(() => getByTestId('userData')).then(output => expect(output.innerHTML).toEqual("Hello <a href=\"https://github.com/helenzhou6\">helenzhou6!</a>"))

})