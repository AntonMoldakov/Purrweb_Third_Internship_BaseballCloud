import { LogoIcon } from 'assets/icons/components';
import React from 'react';
import styled from 'styled-components';
import colors from 'styles/colors';

const Header = () => {
  return (
    <Root>
      <div>
        <LogoIcon width="198" height="28" />
      </div>
      <div />
    </Root>
  );
};

export default Header;

const Root = styled.div`
  grid-area: hd;
  background: ${colors.white};
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
  height: 45px;
  font-size: 14px;
  color: ${colors.darkGray};
  && a {
    padding: 8px;
  }
  && div {
    align-items: center;
  }
`;
