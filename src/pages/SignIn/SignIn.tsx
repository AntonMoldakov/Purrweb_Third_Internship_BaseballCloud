import { LockIcon, UserIcon } from 'assets/icons/components';
import React, { useEffect, useState } from 'react';
import colors from 'styles/colors';
import { CustomField } from 'components';
import { Field, Form } from 'react-final-form';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { FormContainer, Button } from 'ui';
import { AuthPages } from 'layouts';
import { signIn } from 'store/auth/operations';
import { useAppDispatch } from 'store';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/auth/selectors';

interface HandleSubmitProps {
  email: string;
  password: string;
}

function SignIn() {
  const [isLoading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const user = useSelector(selectUser);

  useEffect(() => {
    user.token && history.push('/profile');
  }, [user]);

  const handleSubmit = ({ email, password }: HandleSubmitProps) => {
    setLoading(true);
    dispatch(signIn({ email, password })).then(response => {
      setLoading(false);
      if (response.meta.requestStatus === 'fulfilled') {
        history.push('/profile');
      }
    });
  };
  return (
    <AuthPages>
      <FormContainer>
        <Header>
          <Title>Welcome to BaseballCloud!</Title>
          <Text>Sign into your account here:</Text>
        </Header>

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
                    maxLength={30}
                    type="password"
                    name="password"
                    title="Password"
                    placeholder="Password"
                    children={<LockIcon color={colors.gray} />}
                    component={CustomField}
                  />
                </FormItem>
              </div>
              <FormItem>
                <Button type="submit" isLoading={isLoading} disabled={submitting || pristine} title={'Sign In'} />
              </FormItem>
            </form>
          )}
        />
        <Help>
          <Link to={'#'}>Forgotten password?</Link>
        </Help>
        <Footer>
          <Text>Don’t have an account?</Text>
          <Link to={'/registration'}>Sign Up</Link>
        </Footer>
      </FormContainer>
    </AuthPages>
  );
}

export default SignIn;

const Header = styled.div`
  margin-bottom: 48px;
`;
const Title = styled.h2`
  margin: 0 0 8px 0;
  font-size: 24px;
  line-height: 1.25;
  font-weight: 400;
  color: ${colors.gray};
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

const Help = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 15px;
  font-size: 16px;
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
