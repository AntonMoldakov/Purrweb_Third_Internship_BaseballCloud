import React, { useState } from 'react';
import useDebounce from 'hooks';
import { useQuery } from '@apollo/client';
import { IPitchingLogData, IPitchingRowsData, IPitchingData } from 'graphql/types';
import { PITCHING_GRAPH_DATA, PITCHING_LOG_DATA } from 'graphql/consts';
import { Log, Summary, Charts } from '..';
import styled from 'styled-components';
import colors from 'styles/colors';
import { columnsPitchingDataLog, subColumnsPitchingDataLog, valuesColumnsPitchingDataSummary } from 'consts';

const Pitching = ({ pitching, tabPage, userId, userName }: PitchingTabProps) => {
  const [typeSelectorCharts, setTypeSelectorCharts] = useState({
    value: '',
    label: 'None',
  });
  const [typeSelectorLog, setTypeSelectorLog] = useState({
    value: '',
    label: 'None',
  });
  const [pitchingLogPage, setpitchingLogPage] = useState(1);
  const [pitcherName, setPitcherName] = useState('');
  const pitcherNameDebouncedValue = useDebounce<string>(pitcherName, 500);

  const averageValues = pitching.data?.pitching_summary.average_values;
  const topValues = pitching.data?.pitching_summary.top_values;
  const logPageSize = 10;

  const pitchingRowsData = useQuery<IPitchingRowsData>(PITCHING_GRAPH_DATA, {
    variables: {
      input: {
        pitch_type: typeSelectorCharts.value,
        profile_id: userId,
      },
    },
  });

  const pitchingLogData = useQuery<IPitchingLogData>(PITCHING_LOG_DATA, {
    variables: {
      input: {
        profile_id: userId,
        batter_name: pitcherNameDebouncedValue,
        pitch_type: typeSelectorLog.value,
        count: logPageSize,
        offset: pitchingLogPage === 1 ? 0 : pitchingLogPage,
      },
    },
  });

  const pitchingRows = pitchingRowsData.data?.pitching_graph.graph_rows;
  const pitchingLog = pitchingLogData.data?.pitching_log.pitching_log;
  const pitchingLogTotalCount = pitchingLogData.data?.pitching_log.total_count;

  switch (tabPage) {
    case 'summary': {
      return (
        <Summary
          valuesColumnsData={valuesColumnsPitchingDataSummary}
          values={{ averageValues, topValues, loading: pitching.loading }}
        />
      );
    }
    case 'charts': {
      return (
        <Charts
          loading={pitchingRowsData.loading}
          userName={userName}
          Rows={pitchingRows}
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
          totalCount={pitchingLogTotalCount}
          pageSize={logPageSize}
          setPage={setpitchingLogPage}
          values={{
            type: 'pitcher',
            loading: pitchingLogData.loading,
            columnsData: columnsPitchingDataLog,
            subColumnsData: subColumnsPitchingDataLog,
            rowsData: pitchingLog,
          }}
        />
      );
    }
    default: {
      return <TabMessage>There's no info yet!</TabMessage>;
    }
  }
};

export default Pitching;

interface PitchingTabProps {
  pitching: { data: IPitchingData | undefined; loading: boolean };
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
