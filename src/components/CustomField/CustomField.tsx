import React, { ReactNode } from 'react';
import { Input, InputIcon } from 'ui';
import { FieldRenderProps } from 'react-final-form';
import styled from 'styled-components';
import colors from 'styles/colors';

const CustomField = ({ input, meta, children, ...rest }: CustomFieldProps) => {
  return (
    <div>
      {children ? (
        <InputIcon {...input} {...rest}>
          {children}
        </InputIcon>
      ) : (
        <Input {...input} {...rest} />
      )}
      {meta.error && meta.touched && <Error>{rest.title + ' ' + meta.error}</Error>}
    </div>
  );
};

export default CustomField;

interface CustomFieldProps extends FieldRenderProps<string | number, HTMLInputElement> {
  children?: ReactNode;
}

const Error = styled.section`
  width: 100%;
  text-align: start;
  margin-top: 8px;
  color: ${colors.red};
`;
