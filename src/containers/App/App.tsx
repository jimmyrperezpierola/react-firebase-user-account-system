import * as React from 'react';
import { Route, Switch } from 'react-router';

import { LoginContainer } from '../Login/Login';
import { SignUpContainer } from '../SignUp/SignUp';
import { AccountContainer } from '../Account/Account';
import { ChangeEmailContainer } from '../ChangeEmail/ChangeEmail';
import { ChangePasswordContainer } from '../ChangePassword/ChangePassword';
import { ForgotPasswordContainer } from '../ForgotPassword/ForgotPassword';
import { TermsOfServiceContainer } from '../TermsOfService/TermsOfService';
import { requireAuth } from '../../components';
import { ROUTES } from '../../models/routes';

import { Header } from '../../components';
import { hot } from 'react-hot-loader';

export const App = hot(module)(() => (
  <Switch>
    <>
      <Header user={null} navigateTo={() => undefined} />
      <Route exact path={ROUTES.BASE} component={requireAuth(AccountContainer)} />
      <Route exact path={ROUTES.LOGIN} component={LoginContainer} />
      <Route path={ROUTES.SIGNUP} component={SignUpContainer} />
      <Route path={ROUTES.ACCOUNT} component={requireAuth(AccountContainer)} />
      <Route path={ROUTES.CHANGE_EMAIL} component={ChangeEmailContainer} />
      <Route path={ROUTES.CHANGE_PASSWORD} component={ChangePasswordContainer} />
      <Route path={ROUTES.FORGOT_PASSWORD} component={ForgotPasswordContainer} />
      <Route path={ROUTES.TERMS} component={TermsOfServiceContainer} />
    </>
  </Switch>
));
