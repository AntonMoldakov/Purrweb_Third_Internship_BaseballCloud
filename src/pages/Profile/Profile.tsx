import React from 'react';
import styled from 'styled-components';
import colors from 'styles/colors';
import { Line } from 'rc-progress';
import { Sidebar } from './components';
function Profile() {
  const percent = 10;
  const widthProgressBar = 2.5;
  return (
    <Root>
      <Sidebar />
      <Main>
        <MainCard>
          <CardTitle>Top Batting Values</CardTitle>
          <CardBody>
            <CardItem>
              <CardItemHeader>
                <span>Exit Velocity</span>
                <Percent>{percent}</Percent>
              </CardItemHeader>
              <Line
                percent={percent}
                trailWidth={widthProgressBar}
                strokeWidth={widthProgressBar}
                strokeColor={colors.yellow}
              />
            </CardItem>
            <CardItem>
              <CardItemHeader>
                <span>Carry Distance</span>
                <Percent>{percent}</Percent>
              </CardItemHeader>
              <Line
                percent={percent}
                trailWidth={widthProgressBar}
                strokeWidth={widthProgressBar}
                strokeColor={colors.yellow}
              />
            </CardItem>
            <CardItem>
              <CardItemHeader>
                <span>Launch Angle</span>
                <Percent>{percent}</Percent>
              </CardItemHeader>
              <Line
                percent={percent}
                trailWidth={widthProgressBar}
                strokeWidth={widthProgressBar}
                strokeColor={colors.yellow}
              />
            </CardItem>
          </CardBody>
        </MainCard>
        <MainCard>
          <CardTitle>Recent Session Reports</CardTitle>
          <CardBody>No data currently linked to this profile</CardBody>
        </MainCard>
        <MainCard>
          <CardTitle>Recent Session Reports</CardTitle>
          <CardBody>No data currently linked to this profile</CardBody>
        </MainCard>
      </Main>
    </Root>
  );
}

export default Profile;

const Root = styled.div`
  display: flex;
  flex: 1;
`;
const Main = styled.main`
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  padding: 0 16px;
  background-color: ${colors.gray2};
  align-content: flex-start;
`;
const MainCard = styled.div`
  height: fit-content;
  width: 100%;
  margin: 16px 0;
  padding: 16px;
  border-radius: 8px;
  background-color: ${colors.white};
`;
const CardTitle = styled.h2`
  font-family: 'Lato-Black', sans-serif;
  margin: 0;
  line-height: 1.25;
  color: ${colors.gray3};
  font-size: 18px;
  font-weight: 700;
`;
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
