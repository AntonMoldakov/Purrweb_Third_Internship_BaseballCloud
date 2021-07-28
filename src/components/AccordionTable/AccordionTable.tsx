import React, { useState } from 'react';
import { useTable } from 'react-table';
import { Table } from 'components';
import { IBattingLog, IPitchingLog } from 'graphql/types';
import { IColumnsData } from 'interface';
import { Cell, ColumnTitle, Row, StyledTable, TableMessage } from '../Table/TabelStyles';
import styled from 'styled-components';

function AccordionTable({ rowsData, columnsData, subColumnsData }: IAccordionTableProps) {
  const data = React.useMemo(() => rowsData, [rowsData]);
  const columns = React.useMemo(() => columnsData, [columnsData]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, visibleColumns } = useTable({
    // @ts-ignore
    columns,
    // @ts-ignore
    data,
  });

  return (
    <>
      <StyledTable {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <ColumnTitle {...column.getHeaderProps()}>{column.render('Header')}</ColumnTitle>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            const [isOpen, setOpen] = useState(false);
            return (
              <React.Fragment key={row.id}>
                <StyledRow {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <Cell onClick={() => setOpen(!isOpen)} {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </Cell>
                    );
                  })}
                </StyledRow>
                {isOpen
                  ? rowsData && (
                      <tr>
                        <td colSpan={visibleColumns.length}>
                          <Table rowsData={[row.original]} columnsData={subColumnsData} />{' '}
                        </td>
                      </tr>
                    )
                  : null}
              </React.Fragment>
            );
          })}
        </tbody>
      </StyledTable>
      {rows.length === 0 && <TableMessage>There's no info yet!</TableMessage>}
    </>
  );
}

export default AccordionTable;

interface IAccordionTableProps {
  rowsData: IPitchingLog[] | IBattingLog[];
  columnsData: IColumnsData;
  subColumnsData: IColumnsData;
}

const StyledRow = styled(Row)`
  cursor: pointer;
`;
