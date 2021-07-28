import React, { ReactNode } from 'react';
import styled from 'styled-components';
import colors from 'styles/colors';

const TableRow = ({ children }: TableRowProps) => {
  return <Root>{children}</Root>;
};

export default TableRow;

interface TableRowProps {
  children: ReactNode;
}

const Root = styled.div`
  margin-bottom: 4px;
  height: 44px;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  display: flex;
  background: ${colors.gray5};
  font-size: 14px;
  line-height: 1;
  font-weight: 300;
  color: ${colors.gray3};
  border-radius: 4px;
  &:hover {
    background: ${colors.lightBlue3};
  }
`;
