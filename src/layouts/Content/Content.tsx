import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface ContentProps {
  children: ReactNode;
}

function Content({ children }: ContentProps) {
  return <Root>{children}</Root>;
}

export default Content;

const Root = styled.div`
  overflow: auto;
  grid-area: content;
  background: #fff;
  display: flex;
`;
