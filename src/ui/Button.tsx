import React, { ButtonHTMLAttributes } from 'react';
import colors from 'styles/colors';
import styled from 'styled-components';
import { Loader } from 'ui';

const Button = ({ isLoading = false, white = false, title, ...props }: ButtonProps) => {
  return (
    <Root $white={white} {...props}>
      {isLoading ? <Loader size={40} color={colors.white} /> : title}
    </Root>
  );
};

export default Button;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  white?: boolean;
}

interface StyledButtonProps {
  $white?: boolean;
}

const Root = styled.button<StyledButtonProps>`
  height: 52px;
  width: 100%;
  align-items: center;
  color: ${({ $white }) => ($white ? colors.darkGray : colors.white)};
  font-family: Lato, sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  border-radius: 4px;
  border: ${({ $white }) => ($white ? `solid 1px ${colors.gray4}` : ' solid 1px transparent')};
  background-color: ${({ $white }) => ($white ? colors.white : colors.lightBlue)};
  box-shadow: 0 0 4px 0 rgb(72 187 255 / 0%);
  cursor: pointer;
  &:hover {
    color: ${({ $white }) => ($white ? colors.lightBlue : colors.white)};
    border: ${({ $white }) => ($white ? `solid 1px ${colors.lightBlue}` : ' solid 1px transparent')};
    box-shadow: 0 0 4px 0 rgb(72 187 255 / 80%);
  }
  &&:focus,
  &&:active {
    outline: none;
    box-shadow: inset 0 1px 3px 0 rgb(0 0 0 / 25%);
    border: ${({ $white }) => ($white ? `solid 1px ${colors.lightBlue}` : ' solid 1px transparent')};
  }
`;
