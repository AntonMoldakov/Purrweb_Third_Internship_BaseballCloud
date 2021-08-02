import React, { ReactNode } from 'react';
import { IconInput, Input } from 'ui';
import { FieldRenderProps } from 'react-final-form';
import styled from 'styled-components';
import colors from 'styles/colors';

const InputField = ({ input, meta, children, ...rest }: InputFieldProps) => {
  return (
    <div>
      {children ? (
        <IconInput {...input} {...rest}>
          {children}
        </IconInput>
      ) : (
        <Input {...input} {...rest} />
      )}
      {meta.error && meta.touched && <Error>{rest.title + ' ' + meta.error}</Error>}
    </div>
  );
};

export default InputField;

interface InputFieldProps extends FieldRenderProps<string | number, HTMLInputElement> {
  children?: ReactNode;
  staticWidth?: boolean;
}

const Error = styled.section`
  width: 100%;
  text-align: start;
  margin-top: 8px;
  color: ${colors.red};
`;
