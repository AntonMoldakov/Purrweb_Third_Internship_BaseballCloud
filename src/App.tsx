import { LockIcon, UserIcon } from 'assets/icons/components';
import React, { useState } from 'react';
import colors from 'styles/colors';
import Button from 'ui/Button';
import InputIcon from 'ui/InputIcon';
import { Footer, Header } from 'components';
import styled from 'styled-components';

function App() {
  const [isLoading, setLoading] = useState(true);
  setTimeout(() => setLoading(false), 5000);
  return (
    <Main>
      <Header />
      <Content>
        <div style={{ width: '50%', backgroundColor: 'gray', padding: 20 }}>
          <InputIcon type="email" name="email" title="Email" placeholder="Email">
            <UserIcon color={colors.gray} />
          </InputIcon>
          <div style={{ margin: 15 }} />
          <InputIcon type="password" name="password" title="Password" placeholder="Password">
            <LockIcon color={colors.gray} />
          </InputIcon>
          <div style={{ margin: 15 }} />
          <Button isLoading={isLoading} title={'Sign In'} />
        </div>
      </Content>
      <Footer />
    </Main>
  );
}

export default App;

const Main = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    'hd hd'
    'content content'
    'ft ft';
`;

const Content = styled.div`
  grid-area: content;
  background: #fff;
  display: flex;
`;
