import React from 'react';
import colors from 'styles/colors';
import styled from 'styled-components';
import { FieldRenderProps } from 'react-final-form';

const TextArea = ({ input, meta, ...rest }: FieldRenderProps<string, HTMLTextAreaElement>) => {
  return <Root {...input} {...rest} />;
};

export default TextArea;

const Root = styled.textarea`
  resize: none;
  color: ${colors.gray};
  display: flex;
  height: 110px;
  width: 100%;
  border-radius: 4px;
  padding: 16px;
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
