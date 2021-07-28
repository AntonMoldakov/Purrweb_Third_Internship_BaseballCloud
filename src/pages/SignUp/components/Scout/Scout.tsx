import React from 'react';
import colors from 'styles/colors';
import styled from 'styled-components';

function Scout() {
  return (
    <Root>
      <Title>Scout</Title>
      <div>
        <p>Coaches and scouts can view players in the system but do not have their own profile.</p>
      </div>
    </Root>
  );
}

export default Scout;

const Root = styled.div`
  background: ${colors.lightBlue};
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
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
