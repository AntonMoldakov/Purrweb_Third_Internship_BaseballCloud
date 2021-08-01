import React from 'react';
import styled from 'styled-components';
import { Sidebar, ProfileMain } from './components';
import { useQuery } from '@apollo/client';
import { ICurrentProfile, IProfile, IProfileById } from 'graphql/types';
import { CURRENT_PROFILE, PROFILE_DATA_BY_ID } from 'graphql/consts';
import { useParams } from 'react-router-dom';
import colors from 'styles/colors';
import { DesiredProfile } from 'types';
import { Arrow2Icon } from 'assets/icons/components';
import { Loader } from 'ui';

const loadingDesiredProfile = (requestId: string | undefined): DesiredProfile | undefined => {
  const currentProfile = useQuery<ICurrentProfile>(CURRENT_PROFILE);
  const profileById = useQuery<IProfileById>(PROFILE_DATA_BY_ID, { variables: { id: requestId } });

  const currentProfileId = currentProfile.data?.current_profile.id;
  let response;

  if (!requestId || +requestId === currentProfileId) {
    response = {
      currentProfile: true,
      profile: {
        loading: currentProfile.loading,
        data: currentProfile.data?.current_profile,
      },
    };
  } else {
    if (profileById.error) {
      return undefined;
    } else {
      response = {
        currentProfile: false,
        profile: {
          loading: profileById.loading,
          data: profileById.data?.profile,
        },
      };
    }
  }
  return response;
};

const checkNullProfile = (data: checkNullProfileProps): boolean => data?.first_name == null;

function Profile() {
  const { id } = useParams<RouteParams>();
  const profile = loadingDesiredProfile(id);

  return (
    <Root>
      {profile?.profile.loading ? (
        <Loader size={50} />
      ) : profile === undefined ? (
        <Message>Couldn't find Profile with 'id'={id}</Message>
      ) : checkNullProfile(profile.profile.data) ? (
        <>
          <Sidebar profile={profile} edit={false} />
          <Main>
            <MainMessage>
              <Arrow2Icon />
              <MessageTitle>Your Account</MessageTitle>
              <MessageText>
                Changing your profile options lets you control how others see you and your profile. These settings
                include things like your name, personal info and school.
              </MessageText>
            </MainMessage>
          </Main>
        </>
      ) : (
        <>
          <Sidebar profile={profile} />
          <ProfileMain profile={profile} />
        </>
      )}
    </Root>
  );
}

export default Profile;

type checkNullProfileProps = IProfile | undefined;

interface RouteParams {
  id: string;
}

const Root = styled.div`
  display: flex;
  flex: 1;
`;

const Message = styled.div`
  min-height: 420px;
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  color: ${colors.gray};
  font-size: 16px;
`;

const Main = styled.div`
  padding: 0 16px;
  background-color: ${colors.white};
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const MainMessage = styled.div`
  max-width: 420px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
`;

const MessageTitle = styled.h1`
  line-height: 1.25;
  color: ${colors.gray};
  font-size: 32px;
  font-weight: 700;
  margin: 16px 0;
`;

const MessageText = styled.p`
  font-size: 16px;
  color: #667784;
  text-align: center;
`;
