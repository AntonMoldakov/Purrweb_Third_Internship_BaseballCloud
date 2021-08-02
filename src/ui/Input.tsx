import React, { InputHTMLAttributes } from 'react';
import colors from 'styles/colors';
import styled, { css } from 'styled-components';

const Input = ({ Icon, position = 'left', theme = 'primary', ...inputProps }: InputBaseProps) => {
  return (
    <Root $theme={theme}>
      {Icon && <IconContainer $position={position}>{Icon}</IconContainer>}
      <StyledInput {...inputProps} $theme={theme} />
    </Root>
  );
};

export default Input;

export interface InputBaseProps extends InputHTMLAttributes<HTMLInputElement> {
  Icon?: JSX.Element;
  position?: 'left' | 'right';
  theme?: 'primary' | 'secondary' | 'thirdary' | 'fourth';
}

interface IconContainerProps {
  $position: 'left' | 'right';
}

interface StyledInputProps {
  $theme: 'primary' | 'secondary' | 'thirdary' | 'fourth';
}

const Root = styled.div<StyledInputProps>`
  display: flex;
  position: relative;
  align-items: center;
  border-radius: 4px;
  ${({ $theme }) =>
    $theme === 'thirdary'
      ? `flex-direction: row;
        background-color: ${colors.opacityWhite};`
      : ''}
`;

const IconContainerRightCSS = css`
  right: 0;
`;

const IconContainerLeftCSS = css`
  left: 10px;
`;

const IconContainer = styled.div<IconContainerProps>`
  position: absolute;
  ${({ $position }) => ($position === 'right' ? IconContainerRightCSS : IconContainerLeftCSS)}
`;

const StyledInputPrimaryCSS = css`
  padding: 5px;
  padding-left: 35px;
  font-size: 16px;
  width: 100%;
  line-height: 19px;
  min-height: 38px;
  font-weight: 400;
  color: ${colors.lightBlue};
  transition: width 0.5s;
  border: none;
  border-bottom: 1px solid ${colors.lightBlue};
  &:focus {
    background: none;
    width: 180px;
    border-bottom: 1px solid ${colors.lightBlue};
    outline: none;
    color: ${colors.gray2};
    padding-bottom: 6px;
    outline: none;
    &::placeholder,
    &::-webkit-input-placeholder {
      color: ${colors.gray2};
    }
    &:-ms-input-placeholder {
      color: ${colors.gray2};
    }
  }
`;

const StyledInputSecondaryCSS = css`
  font-size: 16px;
  width: 5rem;
  line-height: 19px;
  min-height: 38px;
  font-weight: 400;
  color: ${colors.lightBlue};
  transition: width 0.5s;
  border: none;
  &:focus {
    width: 180px;
    border-bottom: 1px solid ${colors.lightBlue};
    outline: none;
    color: ${colors.gray2};
    padding-bottom: 6px;
    outline: none;
    &::placeholder,
    &::-webkit-input-placeholder {
      color: ${colors.gray2};
    }
    &:-ms-input-placeholder {
      color: ${colors.gray2};
    }
  }
  &::placeholder,
  &::-webkit-input-placeholder {
    color: ${colors.lightBlue};
  }
  :-ms-input-placeholder {
    color: ${colors.lightBlue};
  }
`;

const StyledInputThirdayCSS = css`
  padding: 6px 0px 10px 37px;
  height: 50px;
  color: ${colors.gray};
  display: flex;
  flex: 1;
  width: 100%;
  border-radius: 4px;
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

const StyledInputFourthCSS = css`
  padding: 0 16px;
  height: 40px;
  color: ${colors.gray};
  display: flex;
  flex: 1;
  width: 100%;
  border-radius: 4px;
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

const StyledInput = styled.input<StyledInputProps>`
  ${({ $theme }) =>
    $theme === 'primary'
      ? StyledInputPrimaryCSS
      : $theme === 'secondary'
      ? StyledInputSecondaryCSS
      : $theme === 'thirdary'
      ? StyledInputThirdayCSS
      : $theme === 'fourth'
      ? StyledInputFourthCSS
      : ''}
`;
