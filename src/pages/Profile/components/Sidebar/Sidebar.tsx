import React, { useState } from 'react';
import styled from 'styled-components';
import { IconButton, Loader } from 'ui';
import {
  AgeIcon,
  BallIcon,
  BatIcon,
  EditIcon,
  FollowIcon,
  HeightIcon,
  UnFollowIcon,
  WeightIcon,
} from 'assets/icons/components';
import colors from 'styles/colors';
import avatar from 'assets/img/avatar.png';
import { ProfileForm } from '../ProfileForm';
import { toNormalState } from 'utils/normalizers';
import { DesiredProfile } from 'types';
import { useMutation } from '@apollo/client';
import { UPDATE_FAVORITE_PROFILE } from 'graphql/consts';
import { IUpdateFavoriteProfile, IUpdateFavoriteProfileProps } from 'graphql/types';
import { toastr } from 'react-redux-toastr';

function Sidebar({ profile, edit = false }: SidebarProps) {
  const { data, loading } = profile.profile;
  const user = data;
  const [editMode, setEditMode] = useState(edit);

  const [updateProfile, { data: updatedProfileData }] = useMutation<
    IUpdateFavoriteProfile,
    IUpdateFavoriteProfileProps
  >(UPDATE_FAVORITE_PROFILE);
  const updateFavorite = updatedProfileData?.update_favorite_profile.favorite;
  const handleFavorite = () => {
    updateProfile({
      variables: {
        form: { profile_id: '' + data?.id, favorite: updateFavorite !== undefined ? !updateFavorite : !data?.favorite },
      },
    }).then(response => {
      response.data?.update_favorite_profile.favorite
        ? toastr.success('Success', 'This profile added to favorite list successfully')
        : toastr.success('Success', 'This profile removed from favorite list successfully.');
    });
  };
  const handleCheckFavorite = (): boolean | undefined =>
    updateFavorite !== undefined ? updateFavorite : data?.favorite;

  return (
    <Root>
      {loading ? (
        <Loader size={50} />
      ) : (
        <>
          {editMode ? (
            <ProfileForm setEditMode={setEditMode} />
          ) : (
            user && (
              <>
                <UserInfo>
                  <EditButton>
                    {profile.currentProfile ? (
                      <IconButton onClick={() => setEditMode(!editMode)}>
                        <EditIcon />
                      </IconButton>
                    ) : (
                      <IconButton onClick={() => handleFavorite()}>
                        {handleCheckFavorite() ? <UnFollowIcon /> : <FollowIcon />}
                      </IconButton>
                    )}
                  </EditButton>
                  <UserPhoto src={!user.avatar ? avatar : `${user.avatar}`} />
                  <UserName>{user.first_name + ' ' + user.last_name}</UserName>
                  <UserPosition>
                    <p>{user.position ? toNormalState(user.position) : ''}</p>
                    {user.position2 && <p> {toNormalState(user.position2)} </p>}
                  </UserPosition>
                </UserInfo>
                <PersonalInfo>
                  <PersonalInfoItem>
                    <div>
                      <Icon>
                        <AgeIcon fontSize={20} />
                      </Icon>
                      <div>Age</div>
                    </div>
                    <div>{user.age}</div>
                  </PersonalInfoItem>
                  <PersonalInfoItem>
                    <div>
                      <Icon>
                        <HeightIcon />
                      </Icon>
                      <div>Height</div>
                    </div>
                    <div>
                      {user.feet} ft {user.inches} in
                    </div>
                  </PersonalInfoItem>
                  <PersonalInfoItem>
                    <div>
                      <Icon>
                        <WeightIcon />
                      </Icon>
                      <div>Weight</div>
                    </div>
                    <div>{user.weight} lbs</div>
                  </PersonalInfoItem>
                  <PersonalInfoItem>
                    <div>
                      <Icon>
                        <BallIcon fontSize={18} />
                      </Icon>
                      <div>Throws</div>
                    </div>
                    <div>{user.throws_hand && toNormalState(user.throws_hand)}</div>
                  </PersonalInfoItem>
                  <PersonalInfoItem>
                    <div>
                      <Icon>
                        <BatIcon fontSize={20} />
                      </Icon>
                      <div>Bats</div>
                    </div>
                    <div>{user.bats_hand && toNormalState(user.bats_hand)}</div>
                  </PersonalInfoItem>
                </PersonalInfo>
                <SchoolInfo>
                  {user.school && (
                    <SchoolInfoItem>
                      <h3>School</h3>
                      <p>{user.school.name}</p>
                    </SchoolInfoItem>
                  )}
                  {user.school_year && (
                    <SchoolInfoItem>
                      <h3>School Year</h3>
                      <p>{user.school_year}</p>
                    </SchoolInfoItem>
                  )}
                  {user.teams.length > 0 && (
                    <SchoolInfoItem>
                      <h3>Team</h3>
                      <p>{user.teams.map(team => team.name + ' ')}</p>
                    </SchoolInfoItem>
                  )}
                  {user.facilities.length > 0 && (
                    <SchoolInfoItem>
                      <h3>Facilities</h3>
                      <p>{user.facilities.map(item => item.u_name)}</p>
                    </SchoolInfoItem>
                  )}
                  {user.biography && (
                    <>
                      <AboutTitle>
                        <h3>About</h3>
                        <div />
                      </AboutTitle>
                      <AboutText>{user.biography}</AboutText>
                    </>
                  )}
                </SchoolInfo>
              </>
            )
          )}
        </>
      )}
    </Root>
  );
}

export default Sidebar;

interface SidebarProps {
  profile: DesiredProfile;
  edit?: boolean;
}

const Root = styled.aside`
  overflow: auto;
  display: flex;
  align-items: center;
  padding: 16px;
  width: 300px;
  flex-direction: column;
`;

const PersonalInfoItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 16px 0;
  & div {
    display: flex;
    align-items: center;
  }
`;

const UserInfo = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-flow: column;
  justify-content: center;
  text-align: center;
  align-items: center;
`;

const PersonalInfo = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
`;

const EditButton = styled.div`
  position: absolute;
  top: 12px;
  right: 15px;
`;

const UserPhoto = styled.img`
  width: 100px;
  height: 100px;
  background-size: cover;
  background-position: 50% 50%;
  border-radius: 50%;
`;

const UserName = styled.h3`
  margin-top: 5px;
  font-size: 20px;
  line-height: 24px;
  color: ${colors.gray3};
  font-weight: 300;
`;

const UserPosition = styled.div`
  display: flex;
  flex-flow: column;
  font-size: 16px;
  line-height: 19px;
  color: ${colors.gray2};
  align-items: center;
  && p {
    width: fit-content;
    &:nth-child(2n) {
      border-top: 1px solid ${colors.gray4};
    }
  }
`;

const Icon = styled.div`
  justify-content: center;
  width: 24px;
  height: 24px;
  margin-right: 16px;
`;

const SchoolInfo = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
`;

const SchoolInfoItem = styled.div`
  margin-bottom: 11px;
  width: 100%;
  display: flex;
  flex-flow: column;
  color: ${colors.gray};
  && h3 {
    font-family: 'Lato', sans-serif;
    font-size: 14px;
    line-height: 17px;
    font-weight: 300;
    margin-bottom: 3px;
  }
  && p {
    font-size: 16px;
    word-wrap: break-word;
  }
`;

const AboutTitle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  color: ${colors.gray};
  && h3 {
    margin: 0;
    line-height: 1.25;
    font-size: 18px;
    font-weight: 900;
    color: ${colors.gray3};
    padding-right: 12px;
  }
  && div {
    flex: 1;
    height: 1px;
    background-color: ${colors.opacityWhite};
  }
`;

const AboutText = styled.p`
  font-size: 16px;
  color: ${colors.gray2};
  word-wrap: break-word;
`;
