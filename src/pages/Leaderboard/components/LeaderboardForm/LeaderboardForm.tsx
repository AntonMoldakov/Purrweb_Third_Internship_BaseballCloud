import React from "react";
import { Field, Form } from "react-final-form";
import { ArrowIcon } from "assets/icons/components";
import {
  dateData,
  leaderboardFavoriteData,
  leaderboardPositionData,
} from "consts";
import styled from "styled-components";
import { FieldSelect } from "components/FieldSelect";
import { InputField } from "components";
import { ISubmitLeaderboardProps } from "types";

const LeaderboardForm = ({ onSubmit }: ILeaderboardFormProps) => {
  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, submitSucceeded }) => (
        <StyledForm onSubmit={handleSubmit}>
          <ItemContainer>
            <FormItem>
              <Field
                lite
                name="date"
                title="Date"
                type="date"
                placeholder="Date"
                options={dateData}
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
          </ItemContainer>
          {!submitSucceeded && handleSubmit()}
        </StyledForm>
      )}
    />
  );
};

export default LeaderboardForm;

interface ILeaderboardFormProps {
  onSubmit: (values: ISubmitLeaderboardProps) => void;
}

const StyledForm = styled.form`
  flex-flow: column;
  justify-content: space-between;
  display: flex;
  align-items: flex-end;
`;

const FormItem = styled.div`
  margin-right: 20px;
`;

const ItemContainer = styled.div`
  display: flex;
`;
