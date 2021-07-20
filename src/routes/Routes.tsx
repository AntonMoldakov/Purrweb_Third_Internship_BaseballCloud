import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { Profile, SignIn, SignUp } from 'pages';
import { Header, Footer } from 'components';
import { Content, Main } from 'layouts';
import { PrivateRoute } from 'utils/PrivateRoute';

const Routes = () => {
  return (
    <Router>
      <Main>
        <Header />
        <Content>
          <Switch>
            <Route exact path={'/'}>
              <Redirect to={'/profile'} />
            </Route>
            <PrivateRoute path={'/profile'} component={Profile} />
            <Route path={'/login'} component={SignIn} />
            <Route path={'/registration'} component={SignUp} />
          </Switch>
        </Content>
        <Footer />
      </Main>
    </Router>
  );
};

export default Routes;
