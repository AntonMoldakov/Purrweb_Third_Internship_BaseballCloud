import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { Profile, SignIn, SignUp } from 'pages';
import { Header, Footer } from 'components';
import { Content, Main } from 'layouts';

const Routes = () => {
  return (
    <Router>
      <Main>
        <Header />
        <Content>
          <Switch>
            <Route path="/home">
              <div>
                <Link to="/home">Home</Link>
                <Link to="/login">login</Link>
                <Link to="/profile">Profile</Link>
              </div>
            </Route>
            <Route path={'/profile'} component={Profile} />
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
