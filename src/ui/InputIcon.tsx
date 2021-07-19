import React, { InputHTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';
import { Input } from 'ui';
import colors from 'styles/colors';

const InputIcon = ({ children, ...input }: InputProps) => {
  return (
    <Root>
      {children && <Icon>{children}</Icon>}
      <Input style={{ paddingLeft: 37, paddingTop: 6, paddingBottom: 10, height: 50 }} {...input} />
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
  background-color: ${colors.opacityWhite};
`;
const Icon = styled.div`
  position: absolute;
  left: 15px;
`;
