import React from 'react';
import colors from 'styles/colors';
import styled from 'styled-components';
import Select from 'react-select';
import { FieldRenderProps } from 'react-final-form';

const FieldSelect = ({ input, meta, ...rest }: CustomSelectProps) => {
  return (
    <>
      <Root {...input} {...rest} />
      {meta.error && meta.touched && <Error>{rest.placeholder + ' ' + meta.error}</Error>}
    </>
  );
};

export default FieldSelect;

interface CustomSelectProps
  extends FieldRenderProps<
    | Array<{ value: string | number; label: string | undefined; data: string }>
    | { value: string | number; label: string | undefined; data: string }
    | undefined,
    HTMLSelectElement
  > {}

const Root = styled(Select)`
  & .Select__control {
    color: ${colors.gray};
    height: 40px;
    border-radius: 4px;
    padding: 0 16px;
    font-size: 16px;
    line-height: 1.13;
    font-weight: 400;
    border: 1px solid transparent;
    background-color: ${colors.opacityWhite};
  }
  // &&:focus,
  // &&:active {
  //   background-color: ${colors.white};
  //   outline: none;
  //   border: solid 1px ${colors.lightBlue};
  // }
`;

const Error = styled.section`
  margin-top: 8px;
  color: ${colors.red};
`;
