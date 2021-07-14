import React from 'react';
import colors from 'styles/colors';
import styled from 'styled-components';
import Loader from 'ui/Loader';

const Button = (props: ButtonProps) => {
  return <Root>{props.isLoading ? <Loader /> : props.title}</Root>;
};

export default Button;

interface ButtonProps {
  isLoading: boolean;
  title: string;
}

const Root = styled.button`
  flex: 1 1 auto;
  width: 100%;
  padding-top: 15px;
  padding-bottom: 17px;
  margin-bottom: 15px;
  color: ${colors.white};
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
