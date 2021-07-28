import React, { InputHTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';
import colors from 'styles/colors';
import Input from './Input';

const InputIcon = ({ children, ...input }: InputProps) => {
  return (
    <Root>
      {children && <Icon>{children}</Icon>}
      <StyledInput {...input} />
    </Root>
  );
};

export default InputIcon;

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  children?: ReactNode;
}

const Root = styled.div`
  border-radius: 4px;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${colors.opacityWhite};
`;

const Icon = styled.div`
  position: absolute;
  left: 15px;
`;

const StyledInput = styled(Input)`
  padding-left: 37px;
  padding-top: 6px;
  padding-bottom: 10px;
  height: 50px;
`;
