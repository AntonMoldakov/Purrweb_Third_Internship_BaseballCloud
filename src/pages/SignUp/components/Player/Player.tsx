import React from 'react';
import colors from 'styles/colors';
import styled from 'styled-components';

function Player() {
  return (
    <Root>
      <Title>Players</Title>
      <div>
        <p>Players have their own profile within the system and plan on having data collected.</p>
      </div>
    </Root>
  );
}

export default Player;

const Root = styled.div`
  background: ${colors.lightBlue};
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 15px;
  color: ${colors.white};
  && p {
    line-height: 1.44;
  }
`;
const Title = styled.div`
  font-size: 36px;
  font-weight: 700;
  line-height: 0.78;
  margin-bottom: 21px;
`;
