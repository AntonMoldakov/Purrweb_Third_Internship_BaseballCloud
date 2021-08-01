import React, { useState } from 'react';
import styled from 'styled-components';
import avatar from 'assets/img/avatar.png';
import { Field, Form } from 'react-final-form';
import { CustomField } from 'components/CustomField';
import { FieldSelect } from 'components';
import { Button, Loader, TextArea } from 'ui';
import colors from 'styles/colors';
import validate from 'utils/validate';
import { useMutation, useQuery } from '@apollo/client';
import {
  ICurrentProfile,
  IFacilitiesData,
  ISchoolsData,
  ITeamsData,
  IUpdateProfile,
  IUpdateProfileProps,
} from 'graphql/types';
import { CURRENT_PROFILE, FACILITIES_DATA, SCHOOLS_DATA, TEAMS_DATA, UPDATE_PROFILE } from 'graphql/consts';
import { toNormalizeOptions } from 'utils/Normalizers';
import { profileAPI } from 'api';
import { handData, positionData, schoolYearData } from 'consts';
import { handleSubmitProps } from 'types';
import { ConvertFormData } from 'utils/ConvertFormData';
import { toastr } from 'react-redux-toastr';

function ProfileForm({ setEditMode }: ProfileFormProps) {
  const [labelState, setLabelState] = useState<boolean>(true);
  const [loadingPicture, setLoadingPicture] = useState<boolean>(false);
  const [pictureInfo, setPictureInfo] = useState<File>();
  const [pictureUrl, setPictureUrl] = useState<string>('');
  const { data, loading } = useQuery<ICurrentProfile>(CURRENT_PROFILE);
  const user = data?.current_profile;
  const userId = user ? '' + user.id : ' ';
  const defaultPicture = user?.avatar ? user.avatar : avatar;
  const requestPicture = pictureUrl ? pictureUrl : user ? user.avatar : '';

  const position = toNormalizeOptions(user?.position);
  const position2 = toNormalizeOptions(user?.position2);
  const teams = toNormalizeOptions(user?.teams);
  const facilities = toNormalizeOptions(user?.facilities);
  const school = toNormalizeOptions(user?.school);
  const school_years = toNormalizeOptions(user?.school_year);
  const throws_hand = toNormalizeOptions(user?.throws_hand);
  const bats_hand = toNormalizeOptions(user?.bats_hand);

  const schoolData = useQuery<ISchoolsData>(SCHOOLS_DATA, {
    variables: { search: '' },
  }).data?.schools.schools;

  const teamsData = useQuery<ITeamsData>(TEAMS_DATA, {
    variables: { search: '' },
  }).data?.teams.teams;

  const facilitiesData = useQuery<IFacilitiesData>(FACILITIES_DATA, {
    variables: { search: '' },
  }).data?.facilities.facilities;

  const schoolDataNorm = toNormalizeOptions(schoolData);
  const teamsDataNorm = toNormalizeOptions(teamsData);
  const facilitiesDataNorm = toNormalizeOptions(facilitiesData);

  const [updateProfile, { loading: updateLoading }] = useMutation<IUpdateProfile, IUpdateProfileProps>(UPDATE_PROFILE);
  const handleSubmit = (props: handleSubmitProps) => {
    updateProfile({
      variables: {
        form: {
          ...ConvertFormData(props),
          id: userId,
          avatar: requestPicture,
        },
      },
    }).then(() => {
      toastr.success('Success', 'Profile has been updated successfully.');
      setEditMode(false);
    });
  };
  const handleSubmitImage = () => {
    if (pictureInfo) {
      setLoadingPicture(true);
      profileAPI.uploadImage(pictureInfo).then((response: string) => {
        setPictureUrl(response);
        setLabelState(true);
        setLoadingPicture(false);
      });
    }
  };
  const handleCancelPhoto = () => {
    setPictureInfo(undefined);
    setLabelState(true);
  };
  return (
    <Root>
      {loading ? (
        <Loader size={50} />
      ) : (
        user && (
          <>
            <Form
              onSubmit={handleSubmit}
              render={({ handleSubmit, submitting, pristine, hasValidationErrors }) => (
                <form onSubmit={handleSubmit}>
                  <div>
                    <PhotoContainer>
                      <UserPhoto src={pictureInfo ? URL.createObjectURL(pictureInfo) : defaultPicture} />
                      <div>
                        <input
                          style={{ display: 'none' }}
                          id="my-file"
                          type="file"
                          onChange={e => {
                            e.target.files && setPictureInfo(e.target.files[0]);
                            setLabelState(false);
                          }}
                        />
                      </div>
                      <PhotoLabel htmlFor="my-file">{labelState && 'Choose Photo'}</PhotoLabel>

                      {!labelState && (
                        <>
                          <PhotoLabel>{pictureInfo && pictureInfo.name}</PhotoLabel>
                          <div>
                            <PhotoLabel onClick={handleSubmitImage}>Upload photo</PhotoLabel>
                            <PhotoLabel onClick={handleCancelPhoto}>Cancel</PhotoLabel>
                          </div>
                        </>
                      )}
                    </PhotoContainer>

                    <section>
                      <UserName>
                        <FormItem $twoItem>
                          <Field
                            disabled={updateLoading}
                            maxLength={30}
                            name="first_name"
                            title="First Name"
                            defaultValue={user.first_name}
                            validate={validate.required}
                            type="firstName"
                            placeholder="First Name *"
                            component={CustomField}
                          />
                          <Field
                            disabled={updateLoading}
                            maxLength={30}
                            name="last_name"
                            title="Last Name"
                            defaultValue={user.last_name}
                            validate={validate.required}
                            type="lastName"
                            placeholder="Last Name *"
                            component={CustomField}
                          />
                        </FormItem>
                      </UserName>
                      <FormItem>
                        <Field
                          disabled={updateLoading}
                          validate={validate.requiredSelect}
                          defaultValue={position}
                          name={'position'}
                          placeholder={'Position in Game *'}
                          options={positionData}
                          component={FieldSelect}
                        />
                      </FormItem>
                      <FormItem>
                        <Field
                          disabled={updateLoading}
                          defaultValue={position2}
                          name={'position2'}
                          placeholder={'Secondary Position in Game'}
                          options={positionData}
                          component={FieldSelect}
                        />
                      </FormItem>
                    </section>
                    <section>
                      <Title>
                        <h3>Personal Info</h3>
                        <div />
                      </Title>
                      <FormItem>
                        <Field
                          disabled={updateLoading}
                          defaultValue={user.age}
                          validate={validate.required}
                          maxLength={3}
                          name="age"
                          title="Age"
                          type="age"
                          placeholder="Age *"
                          component={CustomField}
                        />
                      </FormItem>
                      <FormItem $twoItem>
                        <Field
                          disabled={updateLoading}
                          defaultValue={user.feet}
                          validate={validate.required}
                          maxLength={2}
                          name="feet"
                          title="Feet"
                          type="feet"
                          placeholder="Feet *"
                          component={CustomField}
                        />
                        <Field
                          disabled={updateLoading}
                          defaultValue={user.inches}
                          validate={validate.required}
                          maxLength={2}
                          name="inches"
                          title="Inches"
                          type="inches"
                          placeholder="Inches *"
                          component={CustomField}
                        />
                      </FormItem>
                      <FormItem>
                        <Field
                          disabled={updateLoading}
                          defaultValue={user.weight}
                          validate={validate.required}
                          maxLength={3}
                          name="weight"
                          title="Weight"
                          type="weight"
                          placeholder="Weight *"
                          component={CustomField}
                        />
                      </FormItem>
                      <InputContainer>
                        <InputItem>
                          <Field
                            disabled={updateLoading}
                            validate={validate.requiredSelect}
                            defaultValue={throws_hand}
                            name="throws_hand"
                            title="Throws"
                            type="throws"
                            placeholder="Throws *"
                            options={handData}
                            component={FieldSelect}
                          />
                        </InputItem>
                        <InputItem>
                          <Field
                            disabled={updateLoading}
                            validate={validate.requiredSelect}
                            defaultValue={bats_hand}
                            name="bats_hand"
                            title="Bats"
                            type="bats"
                            placeholder="Bats *"
                            options={handData}
                            component={FieldSelect}
                          />
                        </InputItem>
                      </InputContainer>
                    </section>
                    <section>
                      <Title>
                        <h3>School</h3>
                        <div />
                      </Title>
                      <FormItem>
                        <Field
                          disabled={updateLoading}
                          defaultValue={school}
                          name={'school'}
                          placeholder={'School'}
                          options={schoolDataNorm}
                          component={FieldSelect}
                        />
                      </FormItem>
                      <FormItem>
                        <Field
                          disabled={updateLoading}
                          defaultValue={school_years}
                          name={'school_year'}
                          placeholder={'School Year'}
                          options={schoolYearData}
                          component={FieldSelect}
                        />
                      </FormItem>
                      <FormItem>
                        <Field
                          isMulti
                          disabled={updateLoading}
                          defaultValue={teams}
                          name={'teams'}
                          placeholder={'Team'}
                          options={teamsDataNorm}
                          component={FieldSelect}
                        />
                      </FormItem>
                    </section>
                    <section>
                      <Title>
                        <h3>Facilities</h3>
                        <div />
                      </Title>
                      <FormItem>
                        <Field
                          isMulti
                          disabled={updateLoading}
                          defaultValue={facilities}
                          name={'facilities'}
                          placeholder={'Facilities'}
                          options={facilitiesDataNorm}
                          component={FieldSelect}
                        />
                      </FormItem>
                    </section>
                    <section>
                      <Title>
                        <h3>About</h3>
                        <div />
                      </Title>
                      <FormItem>
                        <Field
                          disabled={updateLoading}
                          defaultValue={user.biography}
                          name={'biography'}
                          placeholder={'About'}
                          component={TextArea}
                        />
                      </FormItem>
                    </section>
                  </div>
                  {hasValidationErrors && <Error>* Fill out the required fields</Error>}
                  <ButtonsContainer>
                    <Button
                      $white
                      type="reset"
                      onClick={() => (user?.first_name ? setEditMode(false) : null)}
                      disabled={submitting || pristine || updateLoading || loadingPicture}
                      title={'Cancel'}
                    />
                    <Button
                      type="submit"
                      isLoading={updateLoading || loadingPicture}
                      disabled={submitting || pristine || updateLoading || loadingPicture}
                      title={'Save'}
                    />
                  </ButtonsContainer>
                </form>
              )}
            />
          </>
        )
      )}
    </Root>
  );
}

export default ProfileForm;

interface ProfileFormProps {
  setEditMode: (mode: boolean) => void;
}

interface FormItemProps {
  $twoItem?: boolean;
}

const Root = styled.aside`
  display: flex;
  justify-content: center;
  flex-flow: column;
  align-items: center;
`;

const PhotoContainer = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const UserPhoto = styled.img`
  width: 100px;
  height: 100px;
  background-size: cover;
  background-position: 50% 50%;
  border-radius: 50%;
`;

const PhotoLabel = styled.label`
  font-size: 14px;
  line-height: 1;
  font-weight: 400;
  color: ${colors.gray2};
  cursor: pointer;
  margin: 10px 10px 0px 0;
  :hover {
    color: ${colors.lightBlue};
    text-decoration: underline;
  }
`;

const UserName = styled.div`
  margin: 20px 0;
`;

const FormItem = styled.div<FormItemProps>`
  margin-bottom: 11px;
  ${({ $twoItem }) =>
    $twoItem &&
    `
      display: flex;
      justify-content: space-between;
      && div {
        width: 48%;
      }`}
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const InputItem = styled.div`
  width: 48%;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  && button {
    height: 40px;
    width: 48%;
  }
`;

const Title = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  color: ${colors.gray};
  margin-top: 20px;
  margin-bottom: 15px;
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

const Error = styled.section`
  margin-top: 8px;
  color: ${colors.red};
`;
