import React, { ReactNode } from 'react';
import styled from 'styled-components';

function Content({ children }: ContentProps) {
  return <Root>{children}</Root>;
}

export default Content;

interface ContentProps {
  children: ReactNode;
}

const Root = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  grid-area: content;
  background: #fff;
  display: flex;
`;
