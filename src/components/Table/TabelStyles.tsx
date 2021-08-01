import styled from 'styled-components';
import colors from 'styles/colors';

export const StyledTable = styled.table`
  width: 100%;
  margin-bottom: 20px;
  border-spacing: 0 4px;
`;

export const ColumnTitle = styled.th`
  text-align: start;
  height: 44px;
  align-items: center;
  font-size: 14px;
  line-height: 1;
  font-weight: 300;
  color: ${colors.gray};
`;

export const StyledRow = styled.tr`
  height: 44px;
  align-items: center;
  background: ${colors.gray5};
  font-size: 14px;
  line-height: 1;
  font-weight: 300;
  color: ${colors.gray3};
  border-radius: 4px;
  &:hover {
    background: ${colors.lightBlue3};
  }
  &: first-child {

  }
`;

export const StyledCell = styled.td`
  border: none;
  &: first-child {
    border-bottom-left-radius: 4px;
    border-top-left-radius: 4px;
  }
  &: last-child {
    border-bottom-right-radius: 4px;
    border-top-right-radius: 4px;
  }
  a{
   font-size: 14px;
  line-height: 1;
  font-weight: 300;
  color: ${colors.gray3};}
  a:hover {
    color: ${colors.lightBlue} ;
    text-decoration: underline;
   }
}


  }
`;

export const TableMessage = styled.div`
  min-height: 420px;
  width: 100%;
  margin-top: 8px;
  font-weight: 300;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.gray};
  font-size: 16px;
`;
