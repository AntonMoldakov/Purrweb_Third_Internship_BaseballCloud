import React, { ReactNode } from 'react';
import { Cell, Row, useExpanded, useTable } from 'react-table';
import { StyledCell, ColumnTitle, StyledRow, StyledTable, TableMessage } from './TabelStyles';
import { IColumnsData } from 'types';
import { Loader } from 'ui';
import styled from 'styled-components';
import { color } from 'highcharts';
import colors from '../../styles/colors';

const Table = <T extends Record<string, any>>({
  rowsData,
  columnsData,
  loading,
  renderCell,
  renderRowSubComponent,
}: TableProps<T>) => {
  const data = React.useMemo(() => rowsData, [rowsData]);
  const columns = React.useMemo(() => columnsData, [columnsData]);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    visibleColumns,
    state: { expanded },
  } = useTable(
    {
      columns,
      data,
    },
    useExpanded,
  );

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
        {!loading && (
          <tbody {...getTableBodyProps()}>
            {rows.length > 0 &&
              rows.map(row => {
                prepareRow(row);
                if (renderRowSubComponent) {
                  return (
                    <React.Fragment key={row.id}>
                      <ButtonRow>
                        {row.cells.map(cell => {
                          return (
                            <StyledCell {...row.getToggleRowExpandedProps()} {...cell.getCellProps()}>
                              {cell.value ? cell.render('Cell') : '-'}
                            </StyledCell>
                          );
                        })}
                      </ButtonRow>
                      {row.isExpanded ? (
                        <tr>
                          <td colSpan={visibleColumns.length}>{renderRowSubComponent(row)}</td>
                        </tr>
                      ) : null}
                    </React.Fragment>
                  );
                } else {
                  return (
                    <StyledRow {...row.getRowProps()}>
                      {row.cells.map(cell => {
                        return (
                          <StyledCell {...cell.getCellProps()}>
                            {renderCell ? renderCell(cell) : cell.value ? cell.render('Cell') : '-'}
                          </StyledCell>
                        );
                      })}
                    </StyledRow>
                  );
                }
              })}
          </tbody>
        )}
      </StyledTable>
      {loading && (
        <TableMessage>
          <Loader size={50} />
        </TableMessage>
      )}
      {rows.length === 0 && !loading && <TableMessage>There's no info yet!</TableMessage>}
    </>
  );
};

export default Table;

interface TableProps<T extends Record<string, unknown>> {
  columnsData: IColumnsData;
  loading?: boolean;
  rowsData: Array<T>;
  renderRowSubComponent?: (row: Row<T>) => JSX.Element;
  renderCell?: (cell: Cell<T>) => JSX.Element | string | ReactNode;
}

const ButtonRow = styled(StyledRow)`
  cursor: pointer;
`;
