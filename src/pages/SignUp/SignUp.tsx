import { LockIcon, UserIcon, CheckIcon } from 'assets/icons/components';
import React, { useEffect, useState } from 'react';
import colors from 'styles/colors';
import { Field, Form } from 'react-final-form';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { FormContainer, Button } from 'ui';
import { Player, Scout } from './components';
import { Tab, Tabs, TabList, TabPanel, TabProps } from 'react-tabs';
import { AuthPages } from 'layouts';
import { signUp } from 'store/auth/operations';
import { useAppDispatch } from 'store';
import { useSelector } from 'react-redux';
import { selectUser } from 'store/auth/selectors';
import { FORM_ERROR } from 'final-form';
import validate from 'utils/validate';
import { TextField } from 'components/TextField';

function SignUp() {
  const [isLoading, setLoading] = useState(false);
  const [role, setRole] = useState('player');
  const dispatch = useAppDispatch();
  const history = useHistory();
  const user = useSelector(selectUser);

  useEffect(() => {
    user.token && history.push('/profile');
  }, [user]);

  const handleSubmit = async ({ email, password, password_confirmation }: HandleSubmitProps) => {
    let errors = {};
    setLoading(true);
    const response = await dispatch(signUp({ email, password, password_confirmation, role }));
    if (response.meta.requestStatus === 'fulfilled') {
      setLoading(false);
      history.push('/profile');
    } else {
      setLoading(false);
      errors = { [FORM_ERROR]: 'Invalid login credentials. Please try again.' };
    }
    return errors;
  };

  return (
    <AuthPages>
      <FormContainer>
        <Tabs>
          <StyledTabList>
            <StyledTab onClick={() => setRole('player')}>Sign Up as Player</StyledTab>
            <StyledTab onClick={() => setRole('player')}>Sign Up as Scout</StyledTab>
          </StyledTabList>

          <TabPanel>
            <Player />
          </TabPanel>
          <TabPanel>
            <Scout />
          </TabPanel>
        </Tabs>

        <Form
          onSubmit={handleSubmit}
          render={({ handleSubmit, submitting, pristine, submitError }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <FormItem>
                  <Field
                    disable={isLoading}
                    maxLength={30}
                    name="email"
                    title="Email"
                    type="email"
                    placeholder="Email"
                    Icon={<UserIcon color={colors.gray} />}
                    theme={'thirdary'}
                    component={TextField}
                    validate={validate.requiredEmail}
                  />
                </FormItem>
                <FormItem>
                  <Field
                    disable={isLoading}
                    minLength={6}
                    maxLength={30}
                    type="password"
                    name="password"
                    title="Password"
                    placeholder="Password"
                    Icon={<LockIcon color={colors.gray} />}
                    theme={'thirdary'}
                    validate={validate.required}
                    component={TextField}
                  />
                </FormItem>
                <FormItem>
                  <Field
                    disable={isLoading}
                    minLength={6}
                    maxLength={30}
                    type="password"
                    name="password_confirmation"
                    title="Confirm Password"
                    placeholder="Confirm Password"
                    Icon={<CheckIcon color={colors.gray} />}
                    theme={'thirdary'}
                    validate={validate.required}
                    component={TextField}
                  />
                </FormItem>
              </div>
              <Legal>
                By clicking Sign Up, you agree to our
                <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
              </Legal>
              {submitError && <Error>{submitError}</Error>}
              <FormItem>
                <Button type="submit" isLoading={isLoading} disabled={submitting || pristine} title={'Sign Up'} />
              </FormItem>
            </form>
          )}
        />
        <Footer>
          <Text>Already registered?</Text>
          <Link to={'/login'}>Sign In</Link>
        </Footer>
      </FormContainer>
    </AuthPages>
  );
}

export default SignUp;

interface HandleSubmitProps {
  email: string;
  password: string;
  password_confirmation: string;
}

const StyledTabList = styled(TabList)`
  display: flex;
  margin-bottom: 15px;
`;

const StyledTab = styled(Tab)<TabProps>`
  display: flex;
  width: 50%;
  height: 52px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: solid 1px ${colors.green};
  background-color: ${colors.white};
  color: ${colors.green};
  font-size: 16px;
  font-weight: 700;
  line-height: 1.13;
  margin-bottom: 15px;
  &:first-child {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
  &:last-child {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  ${({ selected }) =>
    selected &&
    `
      color: ${colors.white};
      background-color: ${colors.green};
  `}
`;

const Text = styled.span`
  font-size: 24px;
  line-height: 1.25;
  font-weight: 400;
  color: ${colors.gray};
  font-size: 16px;
`;

const FormItem = styled.div`
  margin-bottom: 15px;
`;

const Legal = styled.div`
  text-align: start;
  margin-bottom: 8px;
  margin-top: 8px;
  padding-left: 10px;
  padding-right: 10px;
  line-height: 1.42857143;
`;

const Footer = styled.div`
  && a {
    font-size: 16px;
    line-height: 1.13;
    text-decoration: underline;
    padding-left: 3px;
    color: ${colors.lightBlue};
  }
`;

const Error = styled.section`
  width: 100%;
  text-align: start;
  margin-top: 8px;
  color: ${colors.red};
`;
