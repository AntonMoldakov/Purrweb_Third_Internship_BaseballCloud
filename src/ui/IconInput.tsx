import React, { InputHTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';
import colors from 'styles/colors';

const IconInput = ({ children, $right = true, $width = 'auto', ...input }: InputProps) => {
  return (
    <Root>
      <Input $width={$width} $right={$right} {...input} />
      {children && <Icon $right={$right}>{children}</Icon>}
    </Root>
  );
};

export default IconInput;

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  children?: ReactNode;
  $right?: boolean;
  $width?: string;
}

const Root = styled.div`
  display: flex;
  position: relative;
  align-items: center;
`;

const Icon = styled.div<InputProps>`
  position: absolute;
  margin: 0 5px;
  ${({ $right }) => ($right ? 'right: 0;' : '')}
`;

const Input = styled.input<InputProps>`
  ${({ $right }) => ($right ? 'padding: 5px 5px 7px 0;' : 'padding: 5px 5px 7px 24px;')}
  font-size: 16px;
  width: ${({ $width }) => $width};
  line-height: 19px;
  min-height: 38px;
  font-weight: 400;
  color: ${colors.lightBlue};
  transition: width 0.5s;
  border: none;
  &: focus {
    width: 180px;
    border-bottom: 1px solid ${colors.lightBlue};
    outline: none;
    color: ${colors.gray2};
    padding-bottom: 6px;
    outline: none;
    ::placeholder,
    ::-webkit-input-placeholder {
      color: ${colors.gray2};
    }
    :-ms-input-placeholder {
      color: ${colors.gray2};
    }
  }
  ::placeholder,
  ::-webkit-input-placeholder {
    color: ${colors.lightBlue};
  }
  :-ms-input-placeholder {
    color: ${colors.lightBlue};
  }
`;
