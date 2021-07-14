import React, { InputHTMLAttributes, ReactNode } from 'react';
import colors from 'styles/colors';
import styled from 'styled-components';

const Input = ({ children, ...input }: InputProps) => {
  return (
    <>
      {children && children}
      <Root {...input} />
    </>
  );
};

export default Input;

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  children?: ReactNode;
}

const Root = styled.input`
  display: block;
  width: 100%;
  height: 50px;
  border-radius: 4px;
  padding: 6px 12px 10px 37px;
  font-size: 16px;
  line-height: 1.13;
  font-weight: 400;
  border: 1px solid transparent;

  &&:focus,
  &&:active {
    outline: none;
    border: solid 1px ${colors.lightBlue};
  }
`;
