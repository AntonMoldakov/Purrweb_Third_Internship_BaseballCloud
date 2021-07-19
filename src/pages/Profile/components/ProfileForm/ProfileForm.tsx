import React, { useState } from 'react';
import styled from 'styled-components';
import avatar from 'assets/img/avatar.png';
import { Field, Form } from 'react-final-form';
import { CustomField } from 'components/CustomField';
import { Button, CustomSelect, TextArea } from 'ui';
import colors from 'styles/colors';
import validate from 'utils/validate';

interface ProfileFormProps {
  setEditMode: (mode: boolean) => void;
}

function ProfileForm({ setEditMode }: ProfileFormProps) {
  const user = {
    first_name: 'Anton',
    last_name: 'Moldakov',
    age: 20,
    avatar: '',
    position: { value: 'catcher', label: 'Catcher' },
    position2: { value: 'secondBase', label: 'Second Base' },
    feet: 10,
    inches: 20,
    weight: 70,
    school: { value: 'sec', label: 'SEC' },
    school_year: { value: 'junior', label: 'Junior' },
    throws_hand: { value: 'r', label: 'R' },
    bats_hand: { value: 'r', label: 'R' },
    biography: 'moremore',
    teams: [
      { value: 'cats', label: 'Cats' },
      { value: 'sharks', label: 'Sharks' },
    ],
  };
  const [isLoading, setLoading] = useState(false);
  const defaultPicture = user.avatar ? user.avatar : avatar;

  const [labelState, setLabelState] = useState<boolean>(true);
  const [pictureInfo, setPictureInfo] = useState<File>();

  const handData = [
    { value: 'l', label: 'L' },
    { value: 'r', label: 'R' },
  ];
  const positionData = [
    { value: 'catcher', label: 'Catcher' },
    { value: 'firstBase', label: 'First Base' },
    { value: 'secondBase', label: 'Second Base' },
    { value: 'shortstop', label: 'Shortstop' },
    { value: 'outfield', label: 'Outfield' },
    { value: 'pitcher', label: 'Pitcher' },
  ];
  const schoolData = [
    { value: 'ght', label: 'GHT' },
    { value: 'ats', label: 'ATS' },
    { value: 'sec', label: 'SEC' },
  ];
  const schoolYearData = [
    { value: 'none', label: 'None' },
    { value: 'junior', label: 'Junior' },
    { value: 'senior', label: 'Senior' },
  ];
  const teamData = [
    { value: 'bulls', label: 'Bulls' },
    { value: 'cats', label: 'Cats' },
    { value: 'sharks', label: 'Sharks' },
  ];

  const handleSubmit = (values: any) => {
    setLoading(true);
    console.log(values);
    setLoading(false);
    setEditMode(false);
  };
  const handleCancelPhoto = () => {
    setPictureInfo(undefined);
    setLabelState(true);
  };
  return (
    <Root>
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
                      name="firstName"
                      title="First Name"
                      defaultValue={user.first_name}
                      validate={validate.required}
                      type="firstName"
                      placeholder="First Name *"
                      component={CustomField}
                    />
                    <Field
                      maxLength={30}
                      name="lastName"
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
                    name={'firstPosition'}
                    placeholder={'Position in Game *'}
                    options={positionData}
                    defaultValue={[user.position]}
                    component={CustomSelect}
                  />
                </FormItem>
                <FormItem>
                  <Field
                    name={'secondPosition'}
                    defaultValue={[user.position2]}
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
                      defaultValue={user.throws_hand}
                      name="throws"
                      title="Throws"
                      type="throws"
                      placeholder="Throws *"
                      options={handData}
                      component={CustomSelect}
                    />
                  </InputItem>
                  <InputItem>
                    <Field
                      defaultValue={user.bats_hand}
                      name="bats"
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
                    name={'school'}
                    placeholder={'School'}
                    options={schoolData}
                    defaultValue={user.school}
                    component={CustomSelect}
                  />
                </FormItem>
                <FormItem>
                  <Field
                    defaultValue={user.school_year}
                    name={'schoolYear'}
                    placeholder={'School Year'}
                    options={schoolYearData}
                    component={CustomSelect}
                  />
                </FormItem>
                <FormItem>
                  <Field
                    defaultValue={user.teams}
                    isMulti
                    name={'team'}
                    placeholder={'Team'}
                    options={teamData}
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
                    name={'about'}
                    placeholder={'About'}
                    options={teamData}
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
                isLoading={isLoading}
                disabled={submitting || pristine}
                title={'Cancel'}
              />
              <Button type="submit" isLoading={isLoading} disabled={submitting || pristine} title={'Save'} />
            </ButtonsContainer>
          </form>
        )}
      />
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
