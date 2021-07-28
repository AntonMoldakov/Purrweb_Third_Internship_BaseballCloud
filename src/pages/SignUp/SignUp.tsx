import { LockIcon, UserIcon, CheckIcon } from 'assets/icons/components';
import React, { useEffect, useState } from 'react';
import colors from 'styles/colors';
import { CustomField } from 'components';
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

function SignUp() {
  const [isLoading, setLoading] = useState(false);
  const [role, setRole] = useState('player');
  const dispatch = useAppDispatch();
  const history = useHistory();
  const user = useSelector(selectUser);

  useEffect(() => {
    user.token && history.push('/profile');
  }, [user]);

  const handleSubmit = ({ email, password, password_confirmation }: HandleSubmitProps) => {
    setLoading(true);
    dispatch(signUp({ email, password, password_confirmation, role })).then(response => {
      setLoading(false);
      if (response.meta.requestStatus === 'fulfilled') {
        history.push('/profile');
      }
    });
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
          render={({ handleSubmit, submitting, pristine }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <FormItem>
                  <Field
                    maxLength={30}
                    name="email"
                    title="Email"
                    type="email"
                    placeholder="Email"
                    children={<UserIcon color={colors.gray} />}
                    component={CustomField}
                  />
                </FormItem>
                <FormItem>
                  <Field
                    minLength={6}
                    maxLength={30}
                    type="password"
                    name="password"
                    title="Password"
                    placeholder="Password"
                    children={<LockIcon color={colors.gray} />}
                    component={CustomField}
                  />
                </FormItem>
                <FormItem>
                  <Field
                    maxLength={30}
                    type="password"
                    name="password_confirmation"
                    title="Confirm Password"
                    placeholder="Confirm Password"
                    children={<CheckIcon color={colors.gray} />}
                    component={CustomField}
                  />
                </FormItem>
              </div>
              <Legal>
                By clicking Sign Up, you agree to our<a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
                .
              </Legal>
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
  &: first-child {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
  &: last-child {
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
  ont-size: 24px;
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
}
`;
