import React, { ButtonHTMLAttributes } from 'react';
import colors from 'styles/colors';
import styled from 'styled-components';
import Loader from 'ui/Loader';

const Button = ({ isLoading = false, title, ...props }: ButtonProps) => {
  return <Root {...props}>{isLoading ? <Loader size={40} color={colors.white} /> : title}</Root>;
};

export default Button;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  title: string;
}

const Root = styled.button`
  height: 52px;
  flex: 1 1 auto;
  width: 100%;
  align-items: center;
  color: ${colors.white};
  font-family: Lato, sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  border-radius: 4px;
  border: solid 1px transparent;
  background-color: ${colors.lightBlue};
  box-shadow: 0 0 4px 0 rgb(72 187 255 / 0%);
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 4px 0 rgb(72 187 255 / 80%);
  }
  &&:focus,
  &&:active {
    outline: none;
    box-shadow: inset 0 1px 3px 0 rgb(0 0 0 / 25%);
    border: solid 1px transparent;
  }
`;
