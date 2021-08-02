import React from 'react';
import Input, { InputBaseProps } from 'ui/Input';
import { FieldRenderProps } from 'react-final-form';
import styled from 'styled-components';
import colors from 'styles/colors';

const TextField = ({ input, meta, ...rest }: TextFieldProps) => {
  return (
    <div>
      <Input {...input} {...rest} />
      {meta.error && meta.touched && <Error>{rest.title + ' ' + meta.error}</Error>}
    </div>
  );
};

export default TextField;

type TextFieldProps = InputBaseProps & FieldRenderProps<string, HTMLInputElement>;

const Error = styled.section`
  width: 100%;
  text-align: start;
  margin-top: 8px;
  color: ${colors.red};
`;
