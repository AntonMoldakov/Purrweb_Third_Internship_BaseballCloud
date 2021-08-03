import React from 'react';
import styled from 'styled-components';
import colors from 'styles/colors';
import { useQuery } from '@apollo/client';
import { IBattingData, IPitchingData, IProfileEventsData } from 'graphql/types';
import { BATTING_DATA, PITCHING_DATA, PROFILE_EVENTS_DATA } from 'graphql/consts';
import { Info, TopValues } from '../';
import { DesiredProfile } from 'types';
import { Loader } from 'ui';
import { Table } from 'components';
import { eventsColumnsData } from 'consts';

function ProfileMain({ profile }: ProfileMainProps) {
  const id = profile.profile.data?.id || 0;
  const eventsPageSize = 10;
  const { data, loading } = useQuery<IProfileEventsData>(PROFILE_EVENTS_DATA, {
    variables: {
      input: {
        profile_id: id,
        count: eventsPageSize,
        offset: 0,
      },
    },
  });

  const batting = useQuery<IBattingData>(BATTING_DATA, {
    variables: { id },
  });

  const pitching = useQuery<IPitchingData>(PITCHING_DATA, {
    variables: { id },
  });

  let topValues = batting.data?.batting_summary.top_values;
  topValues = topValues && topValues.length > 0 ? topValues : undefined;

  let topValuesPitching = pitching.data?.pitching_summary.top_values;
  topValuesPitching = topValuesPitching && topValuesPitching.length > 0 ? topValuesPitching : undefined;

  const exitVelocity =
    topValues && topValues.reduce((acc, curr) => (acc.exit_velocity > curr.exit_velocity ? acc : curr)).exit_velocity;
  const carryDistance =
    topValues && topValues.reduce((acc, curr) => (acc.distance > curr.distance ? acc : curr)).distance;
  const launchAngle =
    topValues && topValues.reduce((acc, curr) => (acc.launch_angle > curr.launch_angle ? acc : curr)).launch_angle;

  const velocityPitching =
    topValuesPitching && topValuesPitching.reduce((acc, curr) => (acc.velocity > curr.velocity ? acc : curr)).velocity;
  const carryDistancePitching =
    topValuesPitching &&
    topValuesPitching.reduce((acc, curr) => (acc.spin_rate > curr.spin_rate ? acc : curr)).spin_rate;

  const battingValues = [
    {
      title: 'Exit Velocity',
      value: exitVelocity,
    },
    {
      title: 'Carry Distance',
      value: carryDistance,
    },
    {
      title: 'Launch Angle',
      value: launchAngle,
    },
  ];

  const pitchingValues = [
    {
      title: 'Fastball Velocity',
      value: velocityPitching,
    },
    {
      title: 'Spin Rate',
      value: carryDistancePitching,
    },
    {
      title: 'Pitch Movement',
      value: undefined,
    },
  ];

  return (
    <Root>
      {topValuesPitching && (
        <MainCard>
          <CardTitle>Top Pitching Values</CardTitle>
          <TopValues values={pitchingValues} />
        </MainCard>
      )}

      <MainCard>
        <CardTitle>Top Batting Values</CardTitle>
        <TopValues values={battingValues} />
      </MainCard>

      {profile.currentProfile && (
        <MainCard>
          <CardTitle>Recent Session Reports</CardTitle>
          {loading ? (
            <Loader size={50} />
          ) : data?.profile_events.events && data?.profile_events.events.length > 0 ? (
            <Table columnsData={eventsColumnsData} rowsData={data?.profile_events.events || []} />
          ) : (
            <CardBody>No data currently linked to this profile</CardBody>
          )}
        </MainCard>
      )}

      <MainCard>
        <Info
          profile={profile}
          batting={{ data: batting.data, loading: batting.loading }}
          pitching={{ data: pitching.data, loading: pitching.loading }}
        />
      </MainCard>
    </Root>
  );
}

export default ProfileMain;

interface ProfileMainProps {
  profile: DesiredProfile;
}

const Root = styled.main`
  overflow: auto;
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
