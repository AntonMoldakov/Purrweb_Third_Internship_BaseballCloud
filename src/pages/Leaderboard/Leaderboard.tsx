import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import colors from 'styles/colors';
import {
  columnsBattingDataLeaderboard,
  columnsPitchingDataLeaderboard,
  leaderboardPositionData,
  dateData,
  leaderboardTypeBattingData,
  leaderboardTypePitchingData,
  leaderboardFavoriteData,
} from 'consts';
import { Selector, Table } from 'components';
import { IconButton, IconInput } from 'ui';
import { ArrowIcon, HeartRegularIcon, HeartSolidIcon } from 'assets/icons/components';
import useDebounce from 'hooks';
import { Tab, TabList, TabPanel, TabProps, Tabs } from 'react-tabs';
import { LEADERBOARD_PITCHING_DATA, LEADERBOARD_BATTING_DATA, UPDATE_FAVORITE_PROFILE } from 'graphql/consts';
import {
  ILeaderboardBattingData,
  ILeaderboardPitchingData,
  IUpdateFavoriteProfile,
  IUpdateFavoriteProfileProps,
} from 'graphql/types';
import { useLazyQuery, useMutation } from '@apollo/client';
import { convertTableData } from 'utils/convertTableData';
import { toastr } from 'react-redux-toastr';
import { Cell } from 'react-table';
import { Link } from 'react-router-dom';

const Leaderboard = () => {
  const [typeBattingSelector, setTypeBattingSelector] = useState(leaderboardTypeBattingData[0]);
  const [typePitchingSelector, setTypePitchingSelector] = useState(leaderboardTypePitchingData[0]);
  const [favoriteSelector, setFavoriteSelector] = useState(leaderboardFavoriteData[0]);
  const [positionSelector, setPositionSelector] = useState(leaderboardPositionData[0]);
  const [dateSelector, setDateSelector] = useState(dateData[0]);
  const [userAge, setUserAge] = useState('');
  const [userTeam, setUserTeam] = useState('');
  const [userSchool, setUserSchool] = useState('');
  const userAgeDebouncedValue = useDebounce<string>(userAge, 500);
  const userTeamDebouncedValue = useDebounce<string>(userTeam, 500);
  const userSchoolDebouncedValue = useDebounce<string>(userSchool, 500);

  const [battingQuery, battingData] = useLazyQuery<ILeaderboardBattingData>(LEADERBOARD_BATTING_DATA, {
    variables: {
      input: {
        age: userAgeDebouncedValue ? +userAgeDebouncedValue : null,
        date: dateSelector.value,
        favorite: favoriteSelector.value ? +favoriteSelector.value : undefined,
        position: positionSelector.value,
        school: userSchoolDebouncedValue,
        team: userTeamDebouncedValue,
        type: typeBattingSelector.value,
      },
    },
    fetchPolicy: 'network-only',
  });

  const [pitchingQuery, pitchingData] = useLazyQuery<ILeaderboardPitchingData>(LEADERBOARD_PITCHING_DATA, {
    variables: {
      input: {
        age: userAgeDebouncedValue ? +userAgeDebouncedValue : null,
        date: dateSelector.value,
        favorite: +favoriteSelector,
        position: positionSelector.value,
        school: userSchoolDebouncedValue,
        team: userTeamDebouncedValue,
        type: typePitchingSelector.value,
      },
    },
    fetchPolicy: 'network-only',
  });

  const [updateProfile, { loading: favoriteLoading }] = useMutation<
    IUpdateFavoriteProfile,
    IUpdateFavoriteProfileProps
  >(UPDATE_FAVORITE_PROFILE);
  const handleFavorite = (id: number, favorite: boolean) => {
    updateProfile({
      variables: {
        form: { profile_id: '' + id, favorite },
      },
    }).then(() => {
      battingQuery();
      pitchingQuery();
      toastr.success('Success', 'This profile added to favorite list successfully');
    });
  };

  useEffect(() => {
    battingQuery();
    pitchingQuery();
  }, []);

  const usersBatting = convertTableData(battingData.data?.leaderboard_batting.leaderboard_batting);
  const usersPitching = convertTableData(pitchingData.data?.leaderboard_pitching.leaderboard_pitching);

  const handleSearchAge = (e: React.ChangeEvent<HTMLInputElement>) => setUserAge(e.target.value);
  const handleSearchTeam = (e: React.ChangeEvent<HTMLInputElement>) => setUserTeam(e.target.value);
  const handleSearchSchool = (e: React.ChangeEvent<HTMLInputElement>) => setUserSchool(e.target.value);

  const renderCell = React.useCallback(<T extends Record<string, any>>(cell: Cell<T>) => {
    const id = cell.row.original.batter_datraks_id | cell.row.original.pitcher_datraks_id | cell.row.original.id;
    switch (cell.column.id) {
      case 'favorite': {
        return (
          <IconButton onClick={() => handleFavorite(id, !cell.value as boolean)}>
            {cell.value ? <HeartSolidIcon /> : <HeartRegularIcon />}
          </IconButton>
        );
      }
      case 'rank': {
        return +cell.row.id + 1;
      }
      case 'batter_name':
      case 'pitcher_name': {
        return <Link to={`/profile/${id}`}>{cell.render('Cell')}</Link>;
      }
      default: {
        return !cell.value ? '-' : cell.render('Cell');
      }
    }
  }, []);

  return (
    <Root>
      <PageHeader>
        <PageTitle>Leaderboard</PageTitle>
        <Filters>
          <FiltersItem>
            <Selector defaultValue={'Date'} onReturnValue={setDateSelector} options={dateData} />
          </FiltersItem>
          <FiltersItem>
            <IconInput $width={'75px'} placeholder={'School'} value={userSchool} onChange={handleSearchSchool}>
              <ArrowIcon />
            </IconInput>
          </FiltersItem>
          <FiltersItem>
            <IconInput $width={'66px'} placeholder={'Team'} value={userTeam} onChange={handleSearchTeam}>
              <ArrowIcon />
            </IconInput>
          </FiltersItem>
          <FiltersItem>
            <Selector defaultValue={'Position'} onReturnValue={setPositionSelector} options={leaderboardPositionData} />
          </FiltersItem>
          <FiltersItem>
            <IconInput $width={'55px'} placeholder={'Age'} value={userAge} onChange={handleSearchAge}>
              <ArrowIcon />
            </IconInput>
          </FiltersItem>
          <FiltersItem>
            <Selector defaultValue={'All'} onReturnValue={setFavoriteSelector} options={leaderboardFavoriteData} />
          </FiltersItem>
        </Filters>
      </PageHeader>
      <Main>
        <Tabs>
          <StyledTabList>
            <TabsContainer>
              <StyledTab>Batting</StyledTab>
              <StyledTab>Pitching</StyledTab>
            </TabsContainer>
          </StyledTabList>
          <TabPanel>
            <TabContent>
              <SelectorContainer>
                <Selector onReturnValue={setTypeBattingSelector} options={leaderboardTypeBattingData} />
              </SelectorContainer>
              <Table
                loading={battingData.loading}
                columnsData={columnsBattingDataLeaderboard}
                rowsData={usersBatting}
                renderCell={renderCell}
              />
            </TabContent>
          </TabPanel>
          <TabPanel>
            <TabContent>
              <SelectorContainer>
                <Selector onReturnValue={setTypePitchingSelector} options={leaderboardTypePitchingData} />
              </SelectorContainer>
              <Table
                loading={pitchingData.loading || favoriteLoading}
                columnsData={columnsPitchingDataLeaderboard}
                rowsData={usersPitching}
                renderCell={renderCell}
              />
            </TabContent>
          </TabPanel>
        </Tabs>
      </Main>
    </Root>
  );
};

export default Leaderboard;

const Root = styled.div`
  width: 100%;
`;

const PageHeader = styled.div`
  display: flex;
  padding: 16px;
  justify-content: space-between;
  align-items: center;
`;

const Filters = styled.div`
  display: flex;
  align-items: center;
`;

const FiltersItem = styled.div`
  margin-right: 20px;
`;

const PageTitle = styled.div`
  font-size: 24px;
  line-height: 1.25;
  font-weight: 400;
  text-align: center;
  color: ${colors.gray};
`;

const StyledTabList = styled(TabList)`
  padding-right: 16px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const TabsContainer = styled.div`
  display: flex;
`;

const SelectorContainer = styled.div`
  position: absolute;
  right: 46px;
  top: 18px;
`;

const Main = styled.main`
  position: relative;
`;

const TabContent = styled.div`
  padding: 16px;
`;

const StyledTab = styled(Tab)<TabProps>`
  position: relative;
  padding: 8px;
  margin: 8px;
  border: 2px solid ${colors.gray2};
  color: ${colors.gray};
  border-radius: 40px;
  font-size: 14px;
  line-height: 17px;
  font-weight: 700;
  cursor: pointer;
  list-style-type: none;
  &:hover {
    color: ${colors.gray2};
    background-color: rgb(120 139 153 / 40%);
  }
  ${({ selected }) =>
    selected &&
    `
      color: ${colors.white};
      background-color: ${colors.gray2};
  `}
`;
