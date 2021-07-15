import React, { InputHTMLAttributes } from 'react';
import colors from 'styles/colors';
import styled from 'styled-components';

const InputIcon = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return <Root {...props} />;
};

export default InputIcon;

const Root = styled.input`
  color: ${colors.gray};
  display: flex;
  flex: 1;
  height: 50px;
  border-radius: 4px;
  padding: 6px 12px 10px 37px;
  font-size: 16px;
  line-height: 1.13;
  font-weight: 400;
  border: 1px solid transparent;
  background-color: ${colors.opacityWhite};

  &&:focus,
  &&:active {
    outline: none;
    border: solid 1px ${colors.lightBlue};
  }
`;
