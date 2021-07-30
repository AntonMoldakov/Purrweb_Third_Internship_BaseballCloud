import React from 'react';
import { Loader } from 'ui';
import { Table } from 'components/Table';
import styled from 'styled-components';
import colors from 'styles/colors';
import { IColumnsData } from 'interface';
import { IBatting, IPitching } from 'graphql/types';

const Summary = ({ values, valuesColumnsData }: SummaryProps) => {
  const handleCheckData = (): boolean =>
    values.topValues && values.averageValues ? values.topValues.length > 0 && values.averageValues.length > 0 : false;
  return (
    <div>
      {values.loading ? (
        <Loader size={50} />
      ) : !handleCheckData() ? (
        <TabMessage>There's no info yet!</TabMessage>
      ) : (
        <>
          {values.topValues && (
            <>
              <TableTitle>Top Batting Values</TableTitle>
              <Table rowsData={values.topValues} columnsData={valuesColumnsData} />
            </>
          )}
          {values.averageValues && (
            <>
              <TableTitle>Average Batting Values</TableTitle>
              <Table rowsData={values.averageValues} columnsData={valuesColumnsData} />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Summary;

interface SummaryProps {
  values: {
    averageValues: Array<IBatting> | Array<IPitching> | undefined;
    topValues: Array<IBatting> | Array<IPitching> | undefined;
    loading: boolean;
  };
  valuesColumnsData: IColumnsData;
}

const TableTitle = styled.h2`
  margin: 0;
  font-size: 18px;
  line-height: 1.25;
  font-weight: 400;
  color: ${colors.gray3};
`;

const TabMessage = styled.div`
  min-height: 420px;
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  color: ${colors.gray};
  font-size: 16px;
`;
