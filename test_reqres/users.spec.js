import { test } from '@playwright/test';
import EndpointUtils from '../utils/EndpointUtils';
import ApiContext from '../utils/ApiContext';
import ResponseUtils from '../utils/ResponseUtils';
import VerificationUtils from '../utils/AssertManagement';
import DataContext from '../utils/DataContext';

test.describe('Users', () => {
  const singleUserEndPoint = EndpointUtils.SINGLE_USER;
  const userEnpoint = EndpointUtils.USER;
  const singleUser404EndPoint = EndpointUtils.SINGLE_USER_404;
  const listUserEndPoint = EndpointUtils.LIST_USER;

  test('Get Request-users - @regression', async ({ request }) => {
    const response = await ApiContext.get(request, singleUserEndPoint);
    const responseBody = await ResponseUtils.parseAndLog(response);

    VerificationUtils.assertResponseStatusCode(response, 200);
    VerificationUtils.assertResponseBodyKeyValue(responseBody.data, 'id', 2);
    VerificationUtils.assertResponseBodyKeyValue(
      responseBody.data,
      'first_name',
      'Janet'
    );
    VerificationUtils.assertResponseBodyKeyValue(
      responseBody.data,
      'last_name',
      'Weaver'
    );
    VerificationUtils.assertResponseBodyKeyValue(
      responseBody.data,
      'janet.weaver@reqres.in'
    );
  });

  test('POST request - Create new user @regression', async ({ request }) => {
    const response = await ApiContext.post(
      request,
      userEnpoint,
      DataContext.USER_CREATE
    );
    const responseBody = await ResponseUtils.parseAndLog(response);

    VerificationUtils.assertResponseBodyKeyValue(responseBody, 'id', 99999);
    VerificationUtils.assertResponseBodyKeyPresent(responseBody, 'createdAt');
  });

  test('PUT-Request -Update user @regression', async ({ request }) => {
    const response = await ApiContext.put(
      request,
      singleUserEndPoint,
      DataContext.USER_UPDATE
    );

    const responseBody = await ResponseUtils.parseAndLog(response);
    VerificationUtils.assertResponseStatusCode(response, 200);
    VerificationUtils.assertResponseBodyKeyValue(
      responseBody,
      'name',
      'test tousaura3 - updated'
    );
    VerificationUtils.assertResponseBodyKeyValue(
      responseBody,
      'job',
      'test unemployed - updated'
    );
    VerificationUtils.assertResponseBodyKeyPresent(responseBody, 'updatedAt');
  });

  test('DELETE Request -Delete Dinosaurio User. @regression', async ({
    request,
  }) => {
    const response = await ApiContext.delete(request, singleUserEndPoint);
    VerificationUtils.assertResponseStatusCode(response, 204);
  });

  // + GET Scenarios

  test('GET Request- 404 @regression', async ({ request }) => {
    const response = await ApiContext.get(request, singleUser404EndPoint);
    VerificationUtils.assertResponseStatusCode(response, 404);
  });

  test('GET -List users @regression', async ({ request }) => {
    const response = await ApiContext.get(request, listUserEndPoint);
    const responseBody = await ResponseUtils.parseAndLog(response);

    VerificationUtils.assertResponseStatusCode(response, 200);
    VerificationUtils.assertResponseBodyKeyValue(responseBody, 'page', 2);

    // assert object position

    VerificationUtils.assertResponseBodyKeyPresent(responseBody.data[0], 'id');
    VerificationUtils.assertResponseBodyKeyPresent(
      responseBody.data[0],
      'email'
    );
    VerificationUtils.assertResponseBodyKeyPresent(
      responseBody.data[0],
      'first_name'
    );
    VerificationUtils.assertResponseBodyKeyPresent(
      responseBody.data[0],
      'last_name'
    );
    VerificationUtils.assertResponseBodyKeyPresent(
      responseBody.data[0],
      'avatar'
    );
    VerificationUtils.assertResponseBodyKeyValue(
      responseBody.support,
      'text',
      'To keep ReqRes free, contributions towards server costs are appreciated!'
    );
  });

  test('PATCH -Update user @regression', async ({ request }) => {
    const response = await ApiContext.patch(
      request,
      singleUserEndPoint,
      DataContext.USER_UPDATE_PATCH
    );

    const responseBody = await ResponseUtils.parseAndLog(response);

    VerificationUtils.assertResponseStatusCode(response, 200);
    VerificationUtils.assertResponseBodyKeyValue(
      responseBody,
      'name',
      'test juliet@3 - updated using patch'
    );
    VerificationUtils.assertResponseBodyKeyPresent(responseBody, 'updatedAt');
  });
});
