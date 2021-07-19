import { LogoIcon } from 'assets/icons/components';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import colors from 'styles/colors';
import { NavItem } from 'ui';

const Header = () => {
  const user = {
    token: 'bebebeb',
    avatar: 'https://images4.alphacoders.com/273/273904.jpg',
  };
  const navItems = [
    {
      id: '1',
      title: 'Leaderboard',
      src: '#',
    },
    {
      id: '2',
      title: 'Network',
      src: '#',
    },
  ];
  return (
    <Root>
      <Link to={'/profile'}>
        <LogoIcon width="198" height="28" />
      </Link>
      {user.token && (
        <RightNav>
          <StyledNav>
            {navItems.map(item => (
              <NavItem to={item.src} title={item.title} key={item.id} />
            ))}
          </StyledNav>
          <Profile>
            <Link to={'/profile'}>
              <Avatar src={user.avatar} />
            </Link>
          </Profile>
        </RightNav>
      )}
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
  height: 52px;
  font-size: 14px;
  color: ${colors.darkGray};
  && a {
    padding: 0 8px;
  }
  && svg {
    display: flex;
  }
  && div {
    align-items: center;
  }
`;

const RightNav = styled.nav`
  display: flex;
`;

const StyledNav = styled.nav`
  display: flex;
`;

const Profile = styled.nav`
  display: flex;
  margin-left: 16px;
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  background-size: cover;
  background-position: 50% 50%;
  border-radius: 50%;
`;
