import React from 'react';
import colors from 'styles/colors';
import styled from 'styled-components';
import { Line } from 'rc-progress';

const TopValues = ({ values }: TopValuesCardProps) => {
  const widthProgressBar = 2;
  return (
    <>
      <CardBody>
        {values.map((item, index) => {
          return (
            <CardItem key={index}>
              <CardItemHeader>
                <span>{item.title}</span>
                <Percent>{item.value ? item.value : 'N/A'}</Percent>
              </CardItemHeader>
              <Line
                percent={item.value && item.value / 1.5}
                trailWidth={widthProgressBar}
                strokeWidth={widthProgressBar}
                strokeColor={colors.yellow}
              />
            </CardItem>
          );
        })}
      </CardBody>
    </>
  );
};

export default TopValues;

interface TopValuesCardProps {
  values: Array<{
    title: string;
    value: number | undefined;
  }>;
}

const CardBody = styled.div`
  width: 100%;
  font-size: 16px;
  color: ${colors.gray};
  display: flex;
`;

const CardItem = styled.div`
  margin-top: 16px;
  margin-right: 24px;
  flex-direction: column;
  width: 33.33%;

  &:last-child {
    margin: 16px 0 0 0;
  }
`;

const CardItemHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const Percent = styled.span`
  font-size: 16px;
  color: ${colors.gray};
  font-weight: 700;
`;
