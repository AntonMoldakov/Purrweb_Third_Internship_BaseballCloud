import React from 'react';
import colors from 'styles/colors';
import styled from 'styled-components';
import Select from 'react-select';
import { FieldRenderProps } from 'react-final-form';

interface CustomSelectProps
  extends FieldRenderProps<
    Array<{ value: string | number; label: string }> | { value: string | number; label: string },
    HTMLSelectElement
  > {}

const CustomSelect = ({ input, meta, ...rest }: CustomSelectProps) => {
  return <Root {...input} {...rest} />;
};

export default CustomSelect;

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
