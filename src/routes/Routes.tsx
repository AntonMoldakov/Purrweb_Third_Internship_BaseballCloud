import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { Leaderboard, Network, NotFound, Profile, SignIn, SignUp } from 'pages';
import { Header, Footer } from 'components';
import { Content, Main } from 'layouts';
import { PrivateRoute } from 'routes/PrivateRoute';

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
            <PrivateRoute exact path={['/profile', '/profile/:id']} component={Profile} />
            <PrivateRoute exact path={'/leaderboard'} component={Leaderboard} />
            <PrivateRoute exact path={'/network'} component={Network} />
            <Route exact path={'/login'} component={SignIn} />
            <Route exact path={'/registration'} component={SignUp} />
            <Route component={NotFound} />
          </Switch>
        </Content>
        <Footer />
      </Main>
    </Router>
  );
};

export default Routes;
