import React, { ReactNode } from 'react';
import styled from 'styled-components';
import colors from 'styles/colors';

const DropdownMenu = ({ isOpen, setOpen, children }: IDropdownMenuProps) => {
  return isOpen ? (
    <Root tabIndex={1} onBlur={() => setTimeout(() => setOpen(false), 500)} ref={menu => menu && menu.focus()}>
      {children}
    </Root>
  ) : (
    <></>
  );
};

export default DropdownMenu;

interface IDropdownMenuProps {
  isOpen: boolean;
  children: ReactNode;
  setOpen: (value: boolean) => void;
}

const Root = styled.div`
  top: 35px;
  right: 0;
  max-height: 200px;
  width: fit-content;
  overflow: auto;
  padding: 8px 0;
  position: absolute;
  border-radius: 5px;
  background-color: ${colors.white};
  box-shadow: 0 3px 8px 0 rgb(0 0 0 / 15%);
  border: solid 1px ${colors.opacityWhite};
  z-index: 100;
  & a,
  button {
    width: 100%;
    text-align: start;
    display: block;
    padding: 8px 16px;
    line-height: 1;
    text-decoration: none;
    color: ${colors.gray2};
    font-size: 16px;
    font-weight: 400;
    cursor: pointer;
    border: none;
    background: none;
    &:hover {
      border: none;
      text-decoration: none;
      background-color: ${colors.opacityBlue};
    }
    &:focus,
    &:focus-visible {
      outline: none;
    }
  }
`;
