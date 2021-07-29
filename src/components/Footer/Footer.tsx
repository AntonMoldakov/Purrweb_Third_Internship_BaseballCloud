import React from 'react';
import styled from 'styled-components';
import colors from 'styles/colors';

const Footer = () => {
  return (
    <Root>
      <div>
        <span>© 2018 BaseballCloud</span>
        <a href="#">Terms of Service</a>
        <a href="#">Privacy Policy</a>
      </div>
      <div>
        <a href="https://baseballcloud.blog">Blog</a>
        <a href="http://twitter.com/baseballcloudus">Twitter</a>
        <a href="http://www.instagram.com/baseballcloudus/">Instagram</a>
        <a href="http://www.facebook.com/BaseballCloudUS/">Facebook</a>
      </div>
    </Root>
  );
};

export default Footer;

const Root = styled.div`
  grid-area: ft;
  background: ${colors.white};
  border-top: 1px solid rgb(0 0 0 / 10%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  height: 40px;
  font-size: 14px;
  color: ${colors.darkGray};
  && a {
    padding: 8px;
  }
  && div {
    align-items: center;
  }
  && span {
    margin-right: 10px;
  }
`;
