import { LogoIcon, TriangleIcon } from 'assets/icons/components';
import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { signOut } from 'store/auth/operations';
import styled from 'styled-components';
import colors from 'styles/colors';
import { useAppDispatch } from 'store';
import { useSelector } from 'react-redux';
import { selectUser } from 'store/auth/selectors';
import avatar from 'assets/img/avatar.png';
import DropdownMenu from 'ui/DropdownMenu';
import { useQuery } from '@apollo/client';
import { ICurrentUser } from 'graphql/types';
import { CURRENT_USER } from 'graphql/consts';
import { Loader } from 'ui';

const navItems = [
  {
    id: '1',
    title: 'Leaderboard',
    src: '/leaderboard',
  },
  {
    id: '2',
    title: 'Network',
    src: '/network',
  },
];

const Header = () => {
  const [isOpenMenu, setOpenMenu] = useState(false);
  const dispatch = useAppDispatch();
  const { token } = useSelector(selectUser);
  const { data, loading } = useQuery<ICurrentUser>(CURRENT_USER);
  const user = data?.current_profile;
  return (
    <Root>
      <Link to={'/profile'}>
        <LogoIcon width="198" height="28" />
      </Link>
      {token && user && (
        <StyledNav>
          <StyledNav>
            {navItems.map(item => (
              <NavItem to={item.src} key={item.id}>
                {item.title}
              </NavItem>
            ))}
          </StyledNav>
          {loading ? (
            <Loader size={20} />
          ) : (
            <Profile>
              <AvatarLink to={'/profile'}>
                <Avatar src={user.avatar ? user.avatar : avatar} />
              </AvatarLink>
              <MenuWrapper>
                <Button onClick={() => setOpenMenu(!isOpenMenu)}>
                  {user.first_name ? user.first_name + ' ' + user.last_name : 'Profile Name'}
                  <TriangleIcon />
                </Button>
              </MenuWrapper>
              <DropdownMenu setOpen={setOpenMenu} isOpen={isOpenMenu}>
                <Link onClick={() => setOpenMenu(false)} to={'/profile'}>
                  My Profile
                </Link>
                <a onClick={() => dispatch(signOut()).then(() => setOpenMenu(false))}>Log Out</a>
              </DropdownMenu>
            </Profile>
          )}
        </StyledNav>
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
  && svg {
    display: flex;
  }
  && div {
    align-items: center;
  }
`;

const StyledNav = styled.nav`
  display: flex;
`;

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  position: relative;
  font-size: 16px;
  padding: 0 8px;
  color: ${colors.gray2};
  &:hover,
  &:focus {
    color: ${colors.gray2};
    text-decoration: none;
  }
  &:hover:after,
  &:focus:after {
    content: '';
    display: block;
    left: 0;
    right: 0;
    position: absolute;
    bottom: -9px;
    border-bottom: 4px solid rgba(120, 139, 153, 0.4);
  }
  &.active:after {
    content: '';
    display: block;
    left: 0;
    right: 0;
    position: absolute;
    bottom: -9px;
    border-bottom: 4px solid ${colors.gray2};
  }
`;

const MenuWrapper = styled.div`
  position: relative;
  display: flex;
`;

const Profile = styled.nav`
  position: relative;
  align-items: center;
  display: flex;
  margin-left: 16px;
`;
const AvatarLink = styled(Link)`
  line-height: 0;
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  background-size: cover;
  background-position: 50% 50%;
  border-radius: 50%;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 18px;
  border-radius: 4px;
  box-shadow: none;
  font-size: 16px;
  line-height: 19px;
  font-weight: 400;
  background: none;
  outline: none;
  border: 0;
  cursor: pointer;
  color: ${colors.gray2};
  &&:focus,
  &&:active {
    outline: none;
    border: 0;
  }
  &:hover {
    background: ${colors.opacityWhite2};
  }
`;
