import { IBatting, IBattingLog, IEvent, IPitching, IPitchingLog } from 'graphql/types';
import React from 'react';
import { useTable } from 'react-table';
import { Cell, ColumnTitle, Row, StyledTable, TableMessage } from './TabelStyles';
import { IColumnsData } from 'interface';

const Table = ({ rowsData, columnsData }: TableProps) => {
  const data = React.useMemo(() => rowsData, [rowsData]);
  const columns = React.useMemo(() => columnsData, [columnsData]);

  // @ts-ignore
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

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
          {rows.length > 0 &&
            rows.map(row => {
              prepareRow(row);
              return (
                <Row {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <Cell {...cell.getCellProps()}>{cell.render('Cell') ? cell.render('Cell') : '-'}</Cell>;
                  })}
                </Row>
              );
            })}
        </tbody>
      </StyledTable>
      {rows.length === 0 && <TableMessage>There's no info yet!</TableMessage>}
    </>
  );
};

export default Table;

interface TableProps {
  columnsData: IColumnsData;
  rowsData: Array<IBatting> | Array<IEvent> | Array<IPitching> | Array<IPitchingLog> | Array<IBattingLog>;
}
