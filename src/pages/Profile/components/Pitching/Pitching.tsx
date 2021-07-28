import React, { useState } from 'react';
import useDebounce from 'hooks';
import { useQuery } from '@apollo/client';
import { IPitchingLogData, IPitchingRowsData, IPitchingData } from 'graphql/types';
import { PITCHING_GRAPH_DATA, PITCHING_LOG_DATA } from 'graphql/consts';
import { Log, Summary, Charts } from '..';
import styled from 'styled-components';
import colors from 'styles/colors';

const Pitching = ({ pitching, tabPage, userId, userName }: PitchingTabProps) => {
  const [typeSelectorCharts, setTypeSelectorCharts] = useState({ value: '', label: 'None' });
  const [typeSelectorLog, setTypeSelectorLog] = useState({ value: '', label: 'None' });
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

  const valuesColumnsData = [
    {
      Header: 'Pitch Type',
      accessor: 'pitch_type',
    },
    {
      Header: 'Velocity',
      accessor: 'velocity',
    },
    {
      Header: 'Spin Rate',
      accessor: 'spin_rate',
    },
  ];

  const columnsDataLog = React.useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'date',
      },
      {
        Header: 'Batter Name',
        accessor: 'batter_name',
      },
      {
        Header: 'Pitch Type',
        accessor: 'pitch_type',
      },
      {
        Header: 'Pitch Call',
        accessor: 'pitch_call',
      },
      {
        Header: 'Velocity',
        accessor: 'velocity',
      },
      {
        Header: 'Spin Rate',
        accessor: 'spin_rate',
      },
      {
        Header: 'Spin Axis',
        accessor: 'spin_axis',
      },
    ],
    [],
  );

  const subColumnsDataLog = React.useMemo(
    () => [
      {
        Header: 'Vertical Break',
        accessor: 'vertical_break',
      },
      {
        Header: 'Horizontal Break',
        accessor: 'horizontal_break',
      },
      {
        Header: 'Height at Plate',
        accessor: 'height_at_plate',
      },
      {
        Header: 'Release Height',
        accessor: 'release_height',
      },
      {
        Header: ' Extension',
        accessor: 'extension',
      },
      {
        Header: 'Release Side',
        accessor: 'release_side',
      },
      {
        Header: 'Tilt',
        accessor: 'tilt',
      },
    ],
    [],
  );

  switch (tabPage) {
    case 'summary': {
      return (
        <Summary
          valuesColumnsData={valuesColumnsData}
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
            loading: pitchingLogData.loading,
            columnsData: columnsDataLog,
            subColumnsData: subColumnsDataLog,
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
