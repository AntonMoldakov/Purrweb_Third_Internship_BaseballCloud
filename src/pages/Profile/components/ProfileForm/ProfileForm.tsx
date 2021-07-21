import React, { useState } from 'react';
import styled from 'styled-components';
import avatar from 'assets/img/avatar.png';
import { Field, Form } from 'react-final-form';
import { CustomField } from 'components/CustomField';
import { Button, CustomSelect, Loader, TextArea } from 'ui';
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
import { ToNormalizeOptions } from 'utils/Normalizers';

interface ProfileFormProps {
  setEditMode: (mode: boolean) => void;
}

interface handleSubmitProps {
  first_name: string;
  last_name: string;
  position: {
    value: string;
    label: string;
  };
  position2: {
    value: string;
    label: string;
  };
  avatar: string;
  throws_hand: {
    value: string;
    label: string;
  };
  bats_hand: {
    value: string;
    label: string;
  };
  biography: string;
  school_year: {
    value: string;
    label: string;
  };
  feet: string;
  inches: string;
  weight: string;
  age: string;
  school: {
    value: string;
    label: string;
  };
  teams: Array<{
    value: string;
    label: string;
  }>;
  facilities: Array<{
    value: string;
    label: string;
    data: string;
  }>;
}

function ProfileForm({ setEditMode }: ProfileFormProps) {
  const { data, loading } = useQuery<ICurrentProfile>(CURRENT_PROFILE);
  const user = data?.current_profile;

  const position = ToNormalizeOptions(user?.position);
  const position2 = ToNormalizeOptions(user?.position2);
  const teams = ToNormalizeOptions(user?.teams);
  const facilities = ToNormalizeOptions(user?.facilities);
  const school = ToNormalizeOptions(user?.school);
  const school_years = ToNormalizeOptions(user?.school_year);
  const throws_hand = ToNormalizeOptions(user?.throws_hand);
  const bats_hand = ToNormalizeOptions(user?.bats_hand);

  const defaultPicture = user?.avatar ? user.avatar : avatar;

  const [labelState, setLabelState] = useState<boolean>(true);
  const [pictureInfo, setPictureInfo] = useState<File>();

  const handData = [
    { value: 'l', label: 'L' },
    { value: 'r', label: 'R' },
  ];
  const positionData = [
    { value: 'catcher', label: 'Catcher' },
    { value: 'first_base', label: 'First Base' },
    { value: 'second_base', label: 'Second Base' },
    { value: 'third_base', label: 'Third Base' },
    { value: 'shortstop', label: 'Shortstop' },
    { value: 'outfield', label: 'Outfield' },
    { value: 'pitcher', label: 'Pitcher' },
  ];

  const schoolData = useQuery<ISchoolsData>(SCHOOLS_DATA, {
    variables: { search: '' },
  }).data?.schools.schools;

  const teamsData = useQuery<ITeamsData>(TEAMS_DATA, {
    variables: { search: '' },
  }).data?.teams.teams;

  const facilitiesData = useQuery<IFacilitiesData>(FACILITIES_DATA, {
    variables: { search: '' },
  }).data?.facilities.facilities;

  const schoolDataNorm = ToNormalizeOptions(schoolData);
  const teamsDataNorm = ToNormalizeOptions(teamsData);
  const facilitiesDataNorm = ToNormalizeOptions(facilitiesData);
  const schoolYearData = [
    { value: 'freshman', label: 'Freshman' },
    { value: 'sophomore', label: 'Sophomore' },
    { value: 'junior', label: 'Junior' },
    { value: 'senior', label: 'Senior' },
    { value: '', label: 'None' },
  ];

  const [updateProfile, { data: updatedProfileData, loading: updateLoading }] = useMutation<
    IUpdateProfile,
    IUpdateProfileProps
  >(UPDATE_PROFILE);
  const handleSubmit = ({
    bats_hand,
    throws_hand,
    facilities,
    position,
    position2,
    school,
    school_year,
    teams,
    age,
    feet,
    weight,
    inches,
    ...values
  }: handleSubmitProps) => {
    updateProfile({
      variables: {
        form: {
          ...values,
          avatar: pictureInfo ? URL.createObjectURL(pictureInfo) : user ? user.avatar : '',
          feet: +feet,
          weight: +weight,
          inches: +inches,
          age: +age,
          id: user ? '' + user.id : ' ',
          bats_hand: bats_hand.value,
          throws_hand: throws_hand.value,
          facilities: facilities
            ? facilities.map(item => {
                return { id: +item.value, u_name: item.label, email: item.data };
              })
            : [],
          teams: teams
            ? teams.map(item => {
                return { id: +item.value, name: item.label };
              })
            : [],
          school: { id: +school.value, name: school.label },
          position: position.value,
          position2: position2.value,
          school_year: school_year.value,
        },
      },
    }).then(() => setEditMode(false));
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
                            <PhotoLabel onClick={() => pictureInfo && setLabelState(true)}>Upload photo</PhotoLabel>
                            <PhotoLabel onClick={handleCancelPhoto}>Cancel</PhotoLabel>
                          </div>
                        </>
                      )}
                    </PhotoContainer>

                    <section>
                      <UserName>
                        <FormItem>
                          <Field
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
                          defaultValue={position}
                          name={'position'}
                          placeholder={'Position in Game *'}
                          options={positionData}
                          component={CustomSelect}
                        />
                      </FormItem>
                      <FormItem>
                        <Field
                          defaultValue={position2}
                          name={'position2'}
                          placeholder={'Secondary Position in Game'}
                          options={positionData}
                          component={CustomSelect}
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
                      <FormItem>
                        <Field
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
                            defaultValue={throws_hand}
                            name="throws_hand"
                            title="Throws"
                            type="throws"
                            placeholder="Throws *"
                            options={handData}
                            component={CustomSelect}
                          />
                        </InputItem>
                        <InputItem>
                          <Field
                            defaultValue={bats_hand}
                            name="bats_hand"
                            title="Bats"
                            type="bats"
                            placeholder="Bats *"
                            options={handData}
                            component={CustomSelect}
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
                          defaultValue={school}
                          name={'school'}
                          placeholder={'School'}
                          options={schoolDataNorm}
                          component={CustomSelect}
                        />
                      </FormItem>
                      <FormItem>
                        <Field
                          defaultValue={school_years}
                          name={'school_year'}
                          placeholder={'School Year'}
                          options={schoolYearData}
                          component={CustomSelect}
                        />
                      </FormItem>
                      <FormItem>
                        <Field
                          isMulti
                          defaultValue={teams}
                          name={'teams'}
                          placeholder={'Team'}
                          options={teamsDataNorm}
                          component={CustomSelect}
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
                          defaultValue={facilities}
                          name={'facilities'}
                          placeholder={'Facilities'}
                          options={facilitiesDataNorm}
                          component={CustomSelect}
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
                      onClick={() => setEditMode(false)}
                      disabled={submitting || pristine}
                      title={'Cancel'}
                    />
                    <Button type="submit" isLoading={updateLoading} disabled={submitting || pristine} title={'Save'} />
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
const FormItem = styled.div`
  margin-bottom: 11px;
  ${props => {
    // @ts-ignore
    return props.children && props.children.length === 2
      ? `
      display: flex;
      justify-content: space-between;
      && div {
        width: 48%;
      }`
      : ``;
  }}
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
