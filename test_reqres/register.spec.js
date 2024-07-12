import { test } from '@playwright/test';
import EndpointManage from '../utils/EndpointUtils';
import ApiContext from '../utils/ApiContext';
import ResponseUtils from '../utils/ResponseUtils';
import AssertManagement from '../utils/AssertManagement';
import DataContext from '../utils/DataContext';

test.describe('Register test Suite', () => {
  const registerEndPoint = EndpointManage.REGISTER;

  test('POST Request - happy path register user @regressionR', async ({
    request,
  }) => {
    const response = await ApiContext.post(
      request,
      registerEndPoint,
      DataContext.REGISTER_DONE
    );
    const responseBody = await ResponseUtils.parseAndLog(response);
    AssertManagement.assertResponseStatusCode(response, 200);
    AssertManagement.assertResponseBodyKeyPresent(responseBody, 'id');
    AssertManagement.assertResponseBodyKeyPresent(responseBody, 'token');
  });

  test.only('Post Bad register user @regressionR', async ({ request }) => {
    const response = await ApiContext.post(
      request,
      registerEndPoint,
      DataContext.REGISTER_ERROR
    );
    const responseBody = await ResponseUtils.parseAndLog(response);

    AssertManagement.assertResponseStatusCode(response, 400);
    AssertManagement.assertResponseBodyKeyPresent(responseBody, 'error');
    AssertManagement.assertResponseBodyKeyValue(
      responseBody,
      'error',
      'Missing password'
    );
  });
});
