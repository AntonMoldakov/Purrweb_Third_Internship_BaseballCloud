import React from 'react';
import Routes from './routes/Routes';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import styled from 'styled-components';

function App() {
  return (
    <Main>
      <Header />
      <Content>
        <Routes />
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
