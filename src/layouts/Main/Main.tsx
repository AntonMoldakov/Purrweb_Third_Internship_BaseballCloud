import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface MainProps {
  children: ReactNode;
}

function Main({ children }: MainProps) {
  return <Root>{children}</Root>;
}

export default Main;

const Root = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    'hd hd'
    'content content'
    'ft ft';
`;
