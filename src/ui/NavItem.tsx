import React from 'react';
import styled from 'styled-components';
import colors from 'styles/colors';
import { Link, LinkProps } from 'react-router-dom';

function NavItem({ title, ...props }: NavItemProps) {
  return <Root {...props}>{title}</Root>;
}

export default NavItem;

interface NavItemProps extends LinkProps {
  title: string;
}

const Root = styled(Link)`
  display: flex;
  align-items: center;
  position: relative;
  font-size: 16px;
  padding: 0 8px;
  color: ${colors.gray2};
  &:hover,
  &:focus {
    color: ${colors.gray2};
    text-decoration: none;
  }
  &:hover:after,
  &:focus:after {
    content: '';
    display: block;
    left: 0;
    right: 0;
    position: absolute;
    bottom: -9px;
    border-bottom: 4px solid rgba(120, 139, 153, 0.4);
  }
`;
