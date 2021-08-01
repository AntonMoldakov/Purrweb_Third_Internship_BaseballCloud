import React, { useEffect, useState } from 'react';
import { Selector } from 'components/Selector';
import { columnsDataNetwork, leaderboardFavoriteData, leaderboardPositionData, NetworkUsersCountData } from 'consts';
import { IconButton, IconInput } from 'ui';
import { ArrowIcon, HeartRegularIcon, HeartSolidIcon, SearchIcon } from 'assets/icons/components';
import styled from 'styled-components';
import colors from 'styles/colors';
import useDebounce from 'hooks';
import { Paginator } from 'components/Paginator';
import { Table } from 'components/Table';
import { useLazyQuery, useMutation } from '@apollo/client';
import { INetworkUsersData, IUpdateFavoriteProfile, IUpdateFavoriteProfileProps } from 'graphql/types';
import { NETWORK_USERS_DATA, UPDATE_FAVORITE_PROFILE } from 'graphql/consts';
import { convertTableData } from 'utils/convertTableData';
import { toastr } from 'react-redux-toastr';
import { Cell } from 'react-table';
import { Link } from 'react-router-dom';

const Network = () => {
  const [favoriteSelector, setFavoriteSelector] = useState(leaderboardFavoriteData[0]);
  const [usersCountSelector, setUsersCountSelector] = useState(NetworkUsersCountData[0]);
  const [positionSelector, setPositionSelector] = useState(leaderboardPositionData[0]);
  const [userAge, setUserAge] = useState('');
  const [userTeam, setUserTeam] = useState('');
  const [userName, setUserName] = useState('');
  const [userSchool, setUserSchool] = useState('');
  const [page, setPage] = useState(1);
  const userAgeDebouncedValue = useDebounce<string>(userAge, 500);
  const userTeamDebouncedValue = useDebounce<string>(userTeam, 500);
  const userSchoolDebouncedValue = useDebounce<string>(userSchool, 500);
  const userNameDebouncedValue = useDebounce<string>(userName, 500);

  useEffect(() => networkQuery(), []);

  const [networkQuery, { loading, data }] = useLazyQuery<INetworkUsersData>(NETWORK_USERS_DATA, {
    variables: {
      input: {
        age: userAgeDebouncedValue ? +userAgeDebouncedValue : null,
        favorite: favoriteSelector.value ? +favoriteSelector.value : undefined,
        position: positionSelector.value,
        school: userSchoolDebouncedValue,
        team: userTeamDebouncedValue,
        profiles_count: +usersCountSelector.value,
        offset: page === 1 ? 0 : page,
        player_name: userNameDebouncedValue,
      },
    },
    fetchPolicy: 'network-only',
  });
  const [updateProfile, { loading: favoriteLoading }] = useMutation<
    IUpdateFavoriteProfile,
    IUpdateFavoriteProfileProps
  >(UPDATE_FAVORITE_PROFILE);

  const users = convertTableData(data?.profiles.profiles);
  const usersTotalCount = data?.profiles.total_count;

  const handleFavorite = (id: number, favorite: boolean) => {
    updateProfile({
      variables: {
        form: { profile_id: '' + id, favorite },
      },
    }).then(() => {
      networkQuery();
      toastr.success('Success', 'This profile added to favorite list successfully');
    });
  };
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
      case 'player_name': {
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
        <PageTitle>Network</PageTitle>
        <Filters>
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
          <FiltersItem>
            <Selector onReturnValue={setUsersCountSelector} options={NetworkUsersCountData} />
          </FiltersItem>
        </Filters>
      </PageHeader>
      <Main>
        <MainHeader>
          <MainTitle>Available Players ({data?.profiles.total_count || '-'})</MainTitle>
          <div>
            <IconInput
              $width={'160px'}
              placeholder={'Player name'}
              $right={false}
              value={userName}
              onChange={e => setUserName(e.target.value)}>
              <SearchIcon />
            </IconInput>
          </div>
        </MainHeader>
        <>
          <div>
            <Table
              renderCell={renderCell}
              loading={loading || favoriteLoading}
              columnsData={columnsDataNetwork}
              rowsData={users}
            />
          </div>
          <MainFooter>
            <Paginator
              onChangeCurrentPage={setPage}
              pageSize={+usersCountSelector.value}
              totalItemCount={usersTotalCount || 0}
            />
          </MainFooter>
        </>
      </Main>
    </Root>
  );
};

export default Network;

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

const Main = styled.main`
  padding: 16px;
`;

const MainHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
`;

const MainTitle = styled.h2`
  margin: 0;
  color: ${colors.gray3};
  font-weight: 400;
  font-size: 18px;
  font-weight: 1.25;
`;

const MainFooter = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
