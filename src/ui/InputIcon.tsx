import React, { InputHTMLAttributes, ReactNode } from 'react';
import colors from 'styles/colors';
import styled from 'styled-components';
import Input from 'ui/Input';

const InputIcon = ({ children, ...input }: InputProps) => {
  return (
    <Root>
      {children && <Icon>{children}</Icon>}
      <Input {...input} />
    </Root>
  );
};

export default InputIcon;

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  children?: ReactNode;
}

const Root = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Icon = styled.div`
  position: absolute;
  left: 10px;
`;
