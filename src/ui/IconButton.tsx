import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';

const IconButton = ({ children, ...props }: IconButtonProps) => {
  return <Root {...props}>{children}</Root>;
};

export default IconButton;

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

const Root = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  &&:focus,
  &&:active {
    outline: none;
    border: 0;
  }
`;
