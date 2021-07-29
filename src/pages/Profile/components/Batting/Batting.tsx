import React, { useState } from 'react';
import styled from 'styled-components';
import colors from 'styles/colors';
import { IBattingData, IBattingLogData, IBattingRowsData } from 'graphql/types';
import { useQuery } from '@apollo/client';
import { BATTING_GRAPH_DATA, BATTING_LOG_DATA } from 'graphql/consts';
import useDebounce from 'hooks';
import { Charts, Log, Summary } from '..';
import { columnsButtingDataLog, subColumnsButtingDataLog, valuesColumnsButtingDataSummary } from 'consts';

const Batting = ({ batting, tabPage, userId, userName }: BattingCardTabProps) => {
  const [typeSelectorCharts, setTypeSelectorCharts] = useState({ value: '', label: 'None' });
  const [typeSelectorLog, setTypeSelectorLog] = useState({ value: '', label: 'None' });
  const [battingLogPage, setBattingLogPage] = useState(1);
  const [pitcherName, setPitcherName] = useState('');
  const pitcherNameDebouncedValue = useDebounce<string>(pitcherName, 500);

  const averageValues = batting.data?.batting_summary.average_values;
  const topValues = batting.data?.batting_summary.top_values;
  const logPageSize = 10;

  const battingRowsData = useQuery<IBattingRowsData>(BATTING_GRAPH_DATA, {
    variables: {
      input: {
        pitch_type: typeSelectorCharts.value,
        profile_id: userId,
      },
    },
  });

  const battingLogData = useQuery<IBattingLogData>(BATTING_LOG_DATA, {
    variables: {
      input: {
        profile_id: userId,
        pitcher_name: pitcherNameDebouncedValue,
        pitch_type: typeSelectorLog.value,
        count: logPageSize,
        offset: battingLogPage === 1 ? 0 : battingLogPage,
      },
    },
  });

  const battingRows = battingRowsData.data?.batting_graph.graph_rows;
  const battingLog = battingLogData.data?.batting_log.batting_log;
  const battingLogTotalCount = battingLogData.data?.batting_log.total_count;

  switch (tabPage) {
    case 'summary': {
      return (
        <Summary
          valuesColumnsData={valuesColumnsButtingDataSummary}
          values={{ averageValues, topValues, loading: batting.loading }}
        />
      );
    }
    case 'charts': {
      return (
        <Charts
          loading={battingRowsData.loading}
          userName={userName}
          Rows={battingRows}
          setTypeSelector={setTypeSelectorCharts}
          typeSelector={typeSelectorCharts}
        />
      );
    }
    case 'log': {
      return (
        <Log
          setTypeSelector={setTypeSelectorLog}
          pitcherName={pitcherName}
          setPitcherName={setPitcherName}
          totalCount={battingLogTotalCount}
          pageSize={logPageSize}
          setPage={setBattingLogPage}
          values={{
            loading: battingLogData.loading,
            columnsData: columnsButtingDataLog,
            subColumnsData: subColumnsButtingDataLog,
            rowsData: battingLog,
          }}
        />
      );
    }
    default: {
      return <TabMessage>There's no info yet!</TabMessage>;
    }
  }
};

export default Batting;

interface BattingCardTabProps {
  batting: { data: IBattingData | undefined; loading: boolean };
  tabPage: string;
  userId: number;
  userName: string;
}

const TabMessage = styled.div`
  min-height: 420px;
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  color: ${colors.gray};
  font-size: 16px;
`;
