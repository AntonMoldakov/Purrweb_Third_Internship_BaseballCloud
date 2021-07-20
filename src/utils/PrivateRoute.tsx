import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../store/auth/selectors';

export const PrivateRoute = ({ component, ...rest }: RouteProps) => {
  const { token } = useSelector(selectUser);
  return <Route {...rest} component={token ? component : () => <Redirect to={'/login'} />} />;
};
