import React from "react";
import { Field, Form } from "react-final-form";
import { ArrowIcon, SearchIcon } from "assets/icons/components";
import {
  leaderboardFavoriteData,
  leaderboardPositionData,
  leaderboardTypeBattingData,
  leaderboardTypePitchingData,
  NetworkUsersCountData,
} from "consts";
import styled from "styled-components";
import { FieldSelect } from "components/FieldSelect";
import { InputField } from "components";
import { ISubmitNetworkProps } from "types";

const NetworkForm = ({ onSubmit, pitching }: INetworkFormProps) => {
  const typeData = !pitching
    ? leaderboardTypeBattingData
    : leaderboardTypePitchingData;
  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, submitSucceeded }) => (
        <StyledForm onSubmit={handleSubmit}>
          <ItemContainer>
            <FormItem>
              <Field
                lite
                name="school"
                title="School"
                type="school"
                placeholder="School"
              >
                {(props) => {
                  return (
                    <InputField
                      {...props}
                      onChange={(e: InputEvent) => {
                        props.input.onChange(e);
                        handleSubmit();
                        if (props.onChange) {
                          props.onChange(e);
                        }
                      }}
                    >
                      <ArrowIcon />
                    </InputField>
                  );
                }}
              </Field>
            </FormItem>
            <FormItem>
              <Field
                lite
                name="team"
                title="Team"
                type="team"
                placeholder="Team"
              >
                {(props) => {
                  return (
                    <InputField
                      {...props}
                      onChange={(e: InputEvent) => {
                        props.input.onChange(e);
                        handleSubmit();
                        if (props.onChange) {
                          props.onChange(e);
                        }
                      }}
                    >
                      <ArrowIcon />
                    </InputField>
                  );
                }}
              </Field>
            </FormItem>
            <FormItem>
              <Field
                lite
                name="position"
                title="Position"
                type="position"
                placeholder="Position"
                options={leaderboardPositionData}
              >
                {(props) => {
                  return (
                    <FieldSelect
                      {...props}
                      onChange={(e: InputEvent) => {
                        props.input.onChange(e);
                        handleSubmit();
                        if (props.onChange) {
                          props.onChange(e);
                        }
                      }}
                    />
                  );
                }}
              </Field>
            </FormItem>
            <FormItem>
              <Field lite name="age" title="Age" type="age" placeholder="Age">
                {(props) => {
                  return (
                    <InputField
                      {...props}
                      onChange={(e: InputEvent) => {
                        props.input.onChange(e);
                        handleSubmit();
                        if (props.onChange) {
                          props.onChange(e);
                        }
                      }}
                    >
                      <ArrowIcon />
                    </InputField>
                  );
                }}
              </Field>
            </FormItem>
            <FormItem>
              <Field
                lite
                name="favorite"
                title="Favorite"
                type="favorite"
                placeholder="All"
                options={leaderboardFavoriteData}
              >
                {(props) => {
                  return (
                    <FieldSelect
                      {...props}
                      onChange={(e: InputEvent) => {
                        props.input.onChange(e);
                        handleSubmit();
                        if (props.onChange) {
                          props.onChange(e);
                        }
                      }}
                    />
                  );
                }}
              </Field>
            </FormItem>
            <FormItem>
              <Field
                lite
                name="usersCount"
                title="Users Count"
                type="usersCount"
                placeholder="10"
                options={NetworkUsersCountData}
              >
                {(props) => {
                  return (
                    <FieldSelect
                      {...props}
                      onChange={(e: InputEvent) => {
                        props.input.onChange(e);
                        handleSubmit();
                        if (props.onChange) {
                          props.onChange(e);
                        }
                      }}
                    />
                  );
                }}
              </Field>
            </FormItem>
          </ItemContainer>
          <FormItem>
            <Field
              staticWidth
              name="name"
              title="Name"
              type="name"
              placeholder="Player name"
            >
              {(props) => {
                return (
                  <InputField
                    {...props}
                    right={false}
                    onChange={(e: InputEvent) => {
                      props.input.onChange(e);
                      handleSubmit();
                      if (props.onChange) {
                        props.onChange(e);
                      }
                    }}
                  >
                    <SearchIcon />
                  </InputField>
                );
              }}
            </Field>
          </FormItem>

          {!submitSucceeded && handleSubmit()}
        </StyledForm>
      )}
    />
  );
};

export default NetworkForm;

interface INetworkFormProps {
  onSubmit: (values: ISubmitNetworkProps) => void;
  pitching?: boolean;
}

const StyledForm = styled.form`
  flex-flow: column;
  justify-content: space-between;
  display: flex;
  align-items: flex-end;
`;

const FormItem = styled.div`
  margin-right: 20px;
  max-width: 180px;
`;

const ItemContainer = styled.div`
  display: flex;
`;
