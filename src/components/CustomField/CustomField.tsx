import React, { ReactNode } from 'react';
import { InputIcon } from 'ui';
import { FieldRenderProps } from 'react-final-form';

interface CustomFieldProps extends FieldRenderProps<string, HTMLInputElement> {
  children?: ReactNode;
}

const CustomField = ({ input, meta, children, ...rest }: CustomFieldProps) => {
  return (
    <div>
      <InputIcon {...input} {...rest}>
        {children}
      </InputIcon>
      {meta.error && meta.touched && <div>{meta.error}</div>}
    </div>
  );
};

export default CustomField;
