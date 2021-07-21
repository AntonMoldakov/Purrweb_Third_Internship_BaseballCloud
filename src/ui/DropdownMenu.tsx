import React, { ButtonHTMLAttributes, ReactNode, useState } from 'react';
import styled from 'styled-components';
import colors from 'styles/colors';

const DropdownMenu = ({ children, title, ...props }: IconButtonProps) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <Root>
      <Button onClick={() => setOpen(!isOpen)} {...props}>
        {title}
      </Button>
      {isOpen && (
        <Menu tabIndex={0} onBlur={() => setOpen(false)}>
          {children}
        </Menu>
      )}
    </Root>
  );
};

export default DropdownMenu;

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

const Root = styled.div`
  position: relative;
`;
const Button = styled.button`
  padding: 10px 18px;
  border-radius: 4px;
  box-shadow: none;
  font-size: 16px;
  line-height: 19px;
  font-weight: 400;
  background: none;
  outline: none;
  border: 0;
  cursor: pointer;
  color: ${colors.gray2};
  &&:focus,
  &&:active {
    outline: none;
    border: 0;
  }
  &:hover {
    background: ${colors.opacityWhite2};
  }
`;
const Menu = styled.div`
  width: 100%;
  margin-top: 12px;
  padding: 8px 0;
  position: absolute;
  border-radius: 5px;
  background-color: ${colors.white};
  box-shadow: 0 3px 8px 0 rgb(0 0 0 / 15%);
  border: solid 1px ${colors.opacityWhite};
  z-index: 100;
  & a {
    display: block;
    padding: 8px 16px;
    line-height: 1;
    text-decoration: none;
    color: ${colors.gray2};
    font-size: 16px;
    font-weight: 400;
    cursor: pointer;
    &:hover {
      text-decoration: none;
      background-color: ${colors.opacityBlue};
    }
  }
`;
