import React from 'react';
import styled from 'styled-components';

const NotFound = () => {
  return (
    <Root>
      <Title>404</Title>
      <Subtitle>Page Not Found!</Subtitle>
    </Root>
  );
};

export default NotFound;

const Root = styled.div`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-flow: column;
`;

const Title = styled.h1`
  font-size: 100px;
  margin-bottom: 10px;
  text-align: center;
`;

const Subtitle = styled.h3`
  text-align: center;
`;
