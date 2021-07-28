import React, { InputHTMLAttributes } from 'react';
import colors from 'styles/colors';
import styled from 'styled-components';

const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return <Root {...props} />;
};

export default Input;

const Root = styled.input`
  color: ${colors.gray};
  display: flex;
  flex: 1;
  height: 40px;
  width: 100%;
  border-radius: 4px;
  padding: 0 16px;
  font-size: 16px;
  line-height: 1.13;
  font-weight: 400;
  border: 1px solid transparent;
  background-color: ${colors.opacityWhite};

  &&:focus,
  &&:active {
    outline: none;
    background: ${colors.white};
    border: solid 1px ${colors.lightBlue};
  }
`;
