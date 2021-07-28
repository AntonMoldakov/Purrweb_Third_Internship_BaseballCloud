import React from 'react';
import { Default } from 'react-spinners-css';
import colors from 'styles/colors';
import styled from 'styled-components';

const Loader = ({ color = colors.lightBlue, size }: LoaderProps) => {
  return (
    <Root>
      <Default color={color} size={size} />
    </Root>
  );
};

export default Loader;

interface LoaderProps {
  color?: string;
  size: number;
}

const Root = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
