import React, { useEffect, useState } from 'react';
import { columnsDataNetwork, NetworkUsersCountData } from 'consts';
import { IconButton } from 'ui';
import { HeartRegularIcon, HeartSolidIcon } from 'assets/icons/components';
import styled from 'styled-components';
import colors from 'styles/colors';
import { Paginator } from 'components/Paginator';
import { Table } from 'components/Table';
import { useLazyQuery, useMutation } from '@apollo/client';
import { INetworkUsersData, IUpdateFavoriteProfile, IUpdateFavoriteProfileProps } from 'graphql/types';
import { NETWORK_USERS_DATA, UPDATE_FAVORITE_PROFILE } from 'graphql/consts';
import { convertTableData } from 'utils/convertTableData';
import { toastr } from 'react-redux-toastr';
import { Cell } from 'react-table';
import { Link } from 'react-router-dom';
import { ISubmitNetworkProps } from 'types';
import { NetworkForm } from './components';

const Network = () => {
  const limitUsers = '10';
  const [usersCountSelector, setUsersCountSelector] = useState(limitUsers);
  const [page, setPage] = useState(0);
  const [requestData, setRequestData] = useState<IRequestData>({
    age: null,
    favorite: null,
    position: '',
    school: '',
    team: '',
    profiles_count: 10,
    player_name: '',
    offset: page,
  });

  const [networkQuery, { loading, data }] = useLazyQuery<INetworkUsersData>(NETWORK_USERS_DATA, {
    variables: {
      input: {
        ...requestData,
      },
    },
    fetchPolicy: 'network-only',
  });

  const [updateProfile, { loading: favoriteLoading }] = useMutation<
    IUpdateFavoriteProfile,
    IUpdateFavoriteProfileProps
  >(UPDATE_FAVORITE_PROFILE);
  let dataUsers = data?.profiles.profiles;
  const users = convertTableData(dataUsers);
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

  const onSubmitFilters = (values: ISubmitNetworkProps) => {
    setUsersCountSelector(values.usersCount ? values.usersCount.value : limitUsers);
    setRequestData({
      age: values.age ? +values.age : null,
      favorite: values.favorite ? +values.favorite.value : null,
      position: values.position ? values.position.value : '',
      school: values.school ? values.school : '',
      team: values.team ? values.team : '',
      profiles_count: +values.usersCount ? +values.usersCount.value : 10,
      player_name: values.name ? values.name : '',
      offset: page === 1 ? 0 : page,
    });
    networkQuery();
  };

  const onSetPage = (v: number) => {
    setPage(v - 1);
    setRequestData({ ...requestData, offset: v - 1 });
    networkQuery();
  };

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
        <div>
          <PageTitle>Network</PageTitle>
          <MainTitle>Available Players ({data?.profiles.total_count || '-'})</MainTitle>
        </div>
        <NetworkForm onSubmit={onSubmitFilters} />
      </PageHeader>
      <Main>
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
              onChangeCurrentPage={onSetPage}
              pageSize={+usersCountSelector}
              totalItemCount={usersTotalCount || 0}
            />
          </MainFooter>
        </>
      </Main>
    </Root>
  );
};

export default Network;

interface IRequestData {
  age: null | number;
  favorite: null | number;
  position: string;
  school: string;
  team: string;
  profiles_count: number;
  player_name: string;
  offset: number;
}

const Root = styled.div`
  width: 100%;
`;

const PageHeader = styled.div`
  display: flex;
  padding: 16px;
  justify-content: space-between;
  align-items: center;
`;

const PageTitle = styled.div`
  margin-bottom: 36px;
  font-size: 24px;
  line-height: 1.25;
  font-weight: 400;
  color: ${colors.gray};
`;

const Main = styled.main`
  padding: 16px;
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
