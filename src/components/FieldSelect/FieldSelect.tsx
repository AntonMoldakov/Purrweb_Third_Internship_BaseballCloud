import React from 'react';
import colors from 'styles/colors';
import styled from 'styled-components';
import Select from 'react-select';
import { FieldRenderProps } from 'react-final-form';

const FieldSelect = ({ input, meta, lite, ...rest }: CustomSelectProps) => {
  return (
    <>
      <StyledSelect $lite={lite} classNamePrefix={'Select'} {...input} {...rest} />
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
  > {
  lite?: boolean;
}

interface StyledSelectProps extends CustomSelectProps {
  $lite?: boolean;
}

const StyledSelect = styled(Select)<StyledSelectProps>`
  ${({ $lite }) =>
    $lite &&
    `.Select__control {
    background: none;
    border: none;
    box-shadow: none;
    cursor: pointer;
    &:focus,
    &:hover {
      border: none;
      outline: none;
    }
  }
  .Select__indicator-separator {
    display: none;
  }
  .Select__indicator {
    padding: 0;
    color: ${colors.lightBlue};
    &:hover {
      color: ${colors.lightBlue};
    }
  }
  .Select__placeholder,
  .Select__single-value {
    color: ${colors.lightBlue};
    position: relative;
    transform: none;
  }
  .Select__input {
    cursor: pointer;
    caret-color: transparent; 
    color: ${colors.lightBlue};
  }
  
  .Select__menu {
  width: fit-content;
  }
   
  .Select__option {
    background-color: #fff;
    color: ${colors.gray};
    cursor: pointer;
    &:hover {
      background-color: ${colors.opacityBlue};
    }
  }

  .Select__option.is-selected {
    background-color: none;
    color: ${colors.gray};
  }

  .Select__option.is-focused {
    background-color: ${colors.opacityBlue};
    color: ${colors.gray};
  }`}
`;

const Error = styled.section`
  margin-top: 8px;
  color: ${colors.red};
`;
