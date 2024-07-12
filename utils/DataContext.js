import requestBodyRegisterDone from '../testdata/registerdata/register-done.json';
import requestBodyRegisterError from '../testdata/registerdata/register-error.json';

import requestBodyLoginDone from '../testdata/login/login-done.json';
import requestBodyLoginFail from '../testdata/login/login-fail.json';

import requestBodyUserCreate from '../testdata/user/create_user.json';
import requestUserUpdatePut from '../testdata/user/update_user_put.json';
import requestBodyUserUpdatePatch from '../testdata/user/update_user_patch.json';

class DataContext {
  REGISTER_DONE = requestBodyRegisterDone;
  REGISTER_ERROR = requestBodyLoginFail;
  LOGIN_DONE = requestBodyLoginDone;
  LOGIN_FAIL = requestBodyLoginFail;

  USER_CREATE = requestBodyUserCreate;
  USER_UPDATE = requestUserUpdatePut;
  USER_UPDATE_PATCH = requestBodyUserUpdatePatch;
}

export default new DataContext;
