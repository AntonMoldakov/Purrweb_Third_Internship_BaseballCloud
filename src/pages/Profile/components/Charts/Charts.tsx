import React from 'react';
import { Selector } from 'components/Selector';
import { pitchTypeData } from 'consts';
import { Loader } from 'ui';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highstock';
import styled from 'styled-components';
import colors from 'styles/colors';

const Charts = ({ Rows, userName, loading, setTypeSelector, typeSelector }: IChartsProps) => {
  const options = {
    title: {
      text: `Rolling Velocity for ${userName}`,
    },
    subtitle: {
      text: `Average over last ${Rows ? Rows.length : '0'} batted balls`,
    },
    yAxis: {
      title: {
        text: typeSelector.value ? typeSelector.label : 'Exit Velocity',
      },
    },

    series: [
      {
        name: typeSelector.value ? typeSelector.label : 'Exit Velocity',
        data: Rows,
      },
    ],
  };
  return (
    <div>
      <CardHeader>
        <div />
        <Selector onReturnValue={setTypeSelector} options={pitchTypeData} />
      </CardHeader>
      {loading ? (
        <Loader size={50} />
      ) : Rows && Rows.length === 0 ? (
        <TabMessage>There's no info yet!</TabMessage>
      ) : (
        <>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </>
      )}
    </div>
  );
};

export default Charts;

interface IChartsProps {
  userName: string;
  Rows: Array<number> | undefined;
  loading: boolean;
  setTypeSelector: (values: { value: string; label: string }) => void;
  typeSelector: { value: string; label: string };
}

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 23px;
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
