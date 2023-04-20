const apiPath = '/api/v1';

export default {
  chatPagePath: () => '/',
  loginPagePath: () => '/login',
  loginPath: () => [apiPath, 'login'].join('/'),
  getUserPath: () => [apiPath, 'data'].join('/'),
};
