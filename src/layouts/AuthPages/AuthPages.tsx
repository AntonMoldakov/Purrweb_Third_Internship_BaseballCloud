import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface AuthPagesProps {
  children: ReactNode;
}

function AuthPages({ children }: AuthPagesProps) {
  return <Root>{children}</Root>;
}

export default AuthPages;

const Root = styled.div`
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
