import { test } from '@playwright/test';
import EndpointManage from '../utils/EndpointUtils';
import ApiContext from '../utils/ApiContext';
import ResponseUtils from '../utils/ResponseUtils';
import AssertManagement from '../utils/AssertManagement';
import DataContext from '../utils/DataContext';

test.describe('Login', () => {
  const loginEndpoint = EndpointManage.LOGIN;

  test('POST Request - Login Successful. @regression @sanity', async ({
    request,
  }) => {
    const response = await ApiContext.post(
      request,
      loginEndpoint,
      DataContext.LOGIN_DONE
    );
    const responseBody = await ResponseUtils.parseAndLog(response);
    AssertManagement.assertResponseStatusCode(response, 200);
    AssertManagement.assertResponseBodyKeyPresent(responseBody, 'token');
  });

  // pending test

  test.only('POST Request - Bad login test @regression', async ({ request }) => {
    const response = await ApiContext.post(
      request,
      loginEndpoint,
      DataContext.LOGIN_FAIL
    );

    const responseBody = await ApiContext.parseAndLog(response);
    AssertManagement.assertResponseStatusCode(response, 400);
    AssertManagement.assertResponseBodyKeyValue(
      responseBody,
      'error',
      'Missing password'
    );
  });
});
