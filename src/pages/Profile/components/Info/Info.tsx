import React, { useState } from 'react';
import { DropdownMenu } from 'ui';
import { Tab, TabList, TabPanel, TabProps, Tabs } from 'react-tabs';
import { Comparison, SessionReports, Batting, Pitching } from '../';
import styled from 'styled-components';
import colors from 'styles/colors';
import { DesiredProfile } from 'interface';
import { IBattingData, IPitchingData } from 'graphql/types';

const Info = ({ profile, batting, pitching }: InfoCardProps) => {
  const [tabPageButting, setTabPageButting] = useState('summary');
  const [tabPagePitching, setTabPagePitching] = useState('summary');
  const [isOpenMenuButting, setOpenMenuButting] = useState(false);
  const [isOpenMenuPitching, setOpenMenuPitching] = useState(false);

  const userName = profile.profile.data?.first_name + ' ' + profile.profile.data?.last_name;
  const id = profile.profile.data?.id || 0;
  const userPosition = profile.profile.data?.position;

  const handleCloseButtingMenu = (value: handleCloseMenuProps) => {
    setOpenMenuButting(false);
    setTabPageButting(value);
  };

  const handleClosePitchingMenu = (value: handleCloseMenuProps) => {
    setOpenMenuPitching(false);
    setTabPagePitching(value);
  };

  return (
    <Tabs>
      <StyledTabList>
        {userPosition === 'pitcher' && (
          <StyledTab onMouseLeave={() => setOpenMenuPitching(false)} onMouseOver={() => setOpenMenuPitching(true)}>
            Pitching
            <DropdownMenu isOpen={isOpenMenuPitching}>
              <button
                onClick={() => {
                  handleClosePitchingMenu('summary');
                }}>
                Summary
              </button>
              <button
                onClick={() => {
                  handleClosePitchingMenu('charts');
                }}>
                Charts
              </button>
              <button
                onClick={() => {
                  handleClosePitchingMenu('log');
                }}>
                Log
              </button>
            </DropdownMenu>
          </StyledTab>
        )}
        <StyledTab onMouseLeave={() => setOpenMenuButting(false)} onMouseOver={() => setOpenMenuButting(true)}>
          Batting
          <DropdownMenu isOpen={isOpenMenuButting}>
            <button
              onClick={() => {
                handleCloseButtingMenu('summary');
              }}>
              Summary
            </button>
            <button
              onClick={() => {
                handleCloseButtingMenu('charts');
              }}>
              Charts
            </button>
            <button
              onClick={() => {
                handleCloseButtingMenu('log');
              }}>
              Log
            </button>
          </DropdownMenu>
        </StyledTab>
        {profile.currentProfile && <StyledTab>Session Reports</StyledTab>}
        <StyledTab>Comparison</StyledTab>
      </StyledTabList>
      {userPosition === 'pitcher' && pitching && (
        <TabPanel>
          <TabContent>
            <Pitching
              userName={userName}
              userId={id}
              pitching={{ data: pitching.data, loading: pitching.loading }}
              tabPage={tabPagePitching}
            />
          </TabContent>
        </TabPanel>
      )}
      <TabPanel>
        <TabContent>
          <Batting
            userName={userName}
            userId={id}
            batting={{ data: batting.data, loading: batting.loading }}
            tabPage={tabPageButting}
          />
        </TabContent>
      </TabPanel>
      {profile.currentProfile && (
        <TabPanel>
          <TabContent>
            <SessionReports userId={id + ''} />
          </TabContent>
        </TabPanel>
      )}
      <TabPanel>
        <TabContent>
          <Comparison profile={profile.profile.data} batting={{ data: batting.data, loading: batting.loading }} />
        </TabContent>
      </TabPanel>
    </Tabs>
  );
};

export default Info;

interface InfoCardProps {
  profile: DesiredProfile;
  batting: { data: IBattingData | undefined; loading: boolean };
  pitching: { data: IPitchingData | undefined; loading: boolean } | undefined;
}

type handleCloseMenuProps = 'log' | 'charts' | 'summary';

const StyledTabList = styled(TabList)`
  display: flex;
  margin-bottom: 15px;
`;

const TabContent = styled.div`
  min-height: 420px;
  height: 100%;
  display: grid;
`;

const StyledTab = styled(Tab)<TabProps>`
  position: relative;
  padding: 8px;
  margin: 8px;
  border: 2px solid ${colors.gray2};
  color: ${colors.gray};
  border-radius: 40px;
  font-size: 14px;
  line-height: 17px;
  font-weight: 700;
  cursor: pointer;
  list-style-type: none;
  &:hover {
    color: ${colors.gray2};
    background-color: rgb(120 139 153 / 40%);
  }
  ${({ selected }) =>
    selected &&
    `
      color: ${colors.white};
      background-color: ${colors.gray2};
  `}
`;
