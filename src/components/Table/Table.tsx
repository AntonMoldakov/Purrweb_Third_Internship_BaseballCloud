import React, { useState } from 'react';
import { useTable } from 'react-table';
import { Cell, ColumnTitle, Row, StyledTable, TableMessage } from './TabelStyles';
import { IColumnsData } from 'interface';
import { IconButton, Loader } from 'ui';
import { HeartRegularIcon, HeartSolidIcon } from 'assets/icons/components';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Table = <T extends Record<string, any>>({
  rowsData,
  columnsData,
  loading,
  onFavorite,
  subColumnsData,
}: TableProps<T>) => {
  const data = React.useMemo(() => rowsData, [rowsData]);
  const columns = React.useMemo(() => columnsData, [columnsData]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, visibleColumns } = useTable({
    columns,
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
        {!loading && (
          <tbody {...getTableBodyProps()}>
            {rows.length > 0 &&
              rows.map((row, index) => {
                prepareRow(row);
                if (subColumnsData) {
                  const [isOpen, setOpen] = useState(false);
                  return (
                    <React.Fragment key={row.id}>
                      <ButtonRow {...row.getRowProps()}>
                        {row.cells.map(cell => {
                          return (
                            <Cell onClick={() => setOpen(!isOpen)} {...cell.getCellProps()}>
                              {cell.value ? cell.render('Cell') : '-'}
                            </Cell>
                          );
                        })}
                      </ButtonRow>
                      {isOpen
                        ? rowsData && (
                            <tr>
                              <td colSpan={visibleColumns.length}>
                                <Table rowsData={[row.original]} columnsData={subColumnsData} />
                              </td>
                            </tr>
                          )
                        : null}
                    </React.Fragment>
                  );
                } else {
                  return (
                    <Row {...row.getRowProps()}>
                      {row.cells.map(cell => {
                        const id = row.original.batter_datraks_id | row.original.pitcher_datraks_id | row.original.id;
                        return (
                          <Cell {...cell.getCellProps()}>
                            {cell.column.id === 'favorite' ? (
                              <IconButton onClick={() => onFavorite && onFavorite(id, !cell.value as boolean)}>
                                {cell.value ? <HeartSolidIcon /> : <HeartRegularIcon />}
                              </IconButton>
                            ) : cell.column.id === 'rank' ? (
                              index + 1
                            ) : cell.column.id === 'player_name' ||
                              cell.column.id === 'batter_name' ||
                              cell.column.id === 'pitcher_name' ? (
                              <Link to={`/profile/${id}`}>{cell.render('Cell')}</Link>
                            ) : cell.value ? (
                              cell.render('Cell')
                            ) : (
                              '-'
                            )}
                          </Cell>
                        );
                      })}
                    </Row>
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
  onFavorite?: (id: number, favorite: boolean) => void;
  subColumnsData?: IColumnsData;
}

const ButtonRow = styled(Row)`
  cursor: pointer;
`;
