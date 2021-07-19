import React, { ReactNode } from 'react';
import { Input, InputIcon } from 'ui';
import { FieldRenderProps } from 'react-final-form';
import styled from 'styled-components';
import colors from 'styles/colors';

interface CustomFieldProps extends FieldRenderProps<string | number, HTMLInputElement> {
  children?: ReactNode;
}

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

const Error = styled.section`
  margin-top: 8px;
  color: ${colors.red};
`;
