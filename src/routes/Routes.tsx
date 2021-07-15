import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { SignIn, SignUp } from 'pages';
import styled from 'styled-components';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/home">
          <div>
            <Link to="/home">Home</Link>
            <Link to="/login">login</Link>
            <Link to="/profile">Profile</Link>
          </div>
        </Route>
        <AuthPagesLayout>
          <Route path={'/login'} component={SignIn} />
          <Route path={'/registration'} component={SignUp} />
        </AuthPagesLayout>
        <Route path="/profile">
          <h1>Profile</h1>
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;

const AuthPagesLayout = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  overflow: auto;
  padding: 16px;
  background-image: url('https://baseballcloud-front.herokuapp.com/e2b853b6994b3e23d56d2dc1139f8d75.png');
  background-position: top center;
  background-size: cover;
`;
