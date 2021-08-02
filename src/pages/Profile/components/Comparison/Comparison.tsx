import React, { useState } from "react";
import {
  IBattingData,
  IPitchingData,
  IProfile,
  IProfileById,
  IProfileNamesData,
} from "graphql/types";
import avatar from "assets/img/avatar.png";
import styled from "styled-components";
import { DropdownMenu, IconInput, Loader, TableRow } from "ui";
import { SearchIcon } from "assets/icons/components";
import useDebounce from "hooks";
import { useLazyQuery, useQuery } from "@apollo/client";
import {
  BATTING_DATA,
  FILTER_PROFILE_NAMES,
  PROFILE_DATA_BY_ID,
} from "graphql/consts";
import { Selector } from "components/Selector";
import { topBattingValues, topPitchingValues } from "consts";

const Comparison = ({ profile, batting, pitching }: ComparisonCardTabProps) => {
  const [typeSelectorLog, setTypeSelectorLog] = useState({
    value: "distance",
    label: "Distance",
  });
  const [searchUser, setSearchUser] = useState("");
  const [isOpenResults, setOpenResults] = useState(false);
  const pitcherNameDebouncedValue = useDebounce<string>(searchUser, 500);
  const searchUserData = useQuery<IProfileNamesData>(FILTER_PROFILE_NAMES, {
    variables: {
      input: {
        player_name: pitcherNameDebouncedValue,
        position: profile?.position,
      },
    },
  });
  const [profileByIdData, { loading, data }] =
    useLazyQuery<IProfileById>(PROFILE_DATA_BY_ID);
  const topBattValues = batting.data?.batting_summary.top_values || [];
  const topPitchValues =
    profile?.position === "pitcher" &&
    pitching?.data?.pitching_summary.top_values
      ? pitching?.data?.pitching_summary.top_values
      : [];

  const topValues = [...topBattValues, ...topPitchValues];
  const profileById = data && data.profile;
  const searchUsers =
    searchUserData && searchUserData.data?.profile_names.profile_names;

  const topValuesOptions =
    profile?.position === "pitcher" ? topPitchingValues : topBattingValues;

  const [profileByIdBatting, { loading: battingLoading, data: battingData }] =
    useLazyQuery<IBattingData>(BATTING_DATA);

  const topValuesSearchUser = battingData?.batting_summary.top_values;

  const fastballValues = topValues?.filter(
    (item) => item.pitch_type === "Fastball"
  )[0];
  const curveballValues = topValues?.filter(
    (item) => item.pitch_type === "Curveball"
  )[0];
  const changeupValues = topValues?.filter(
    (item) => item.pitch_type === "Changeup"
  )[0];
  const sliderValues = topValues?.filter(
    (item) => item.pitch_type === "Slider"
  )[0];

  const fastballValuesSearchUser = topValuesSearchUser?.filter(
    (item) => item.pitch_type === "Fastball"
  )[0];
  const curveballValuesSearchUser = topValuesSearchUser?.filter(
    (item) => item.pitch_type === "Curveball"
  )[0];
  const changeupValuesSearchUser = topValuesSearchUser?.filter(
    (item) => item.pitch_type === "Changeup"
  )[0];
  const sliderValuesSearchUser = topValuesSearchUser?.filter(
    (item) => item.pitch_type === "Slider"
  )[0];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchUser(e.target.value);
  const handleSearchId = (props: handleSearchIdProps) => {
    setOpenResults(false);
    setSearchUser(props.name);
    profileByIdData({ variables: { id: props.id + "" } });
    profileByIdBatting({ variables: { id: props.id + "" } });
  };
  return (
    <Root>
      <User>
        <UserInfoItem>
          <UserPhoto src={!profile?.avatar ? avatar : `${profile.avatar}`} />
          {profile?.first_name
            ? profile.first_name + " " + profile.last_name
            : " -"}
        </UserInfoItem>
        <UserInfoItem>
          Age: {profile?.age ? " " + profile.age : " -"}
        </UserInfoItem>
        <UserInfoItem>
          Height:{" "}
          {profile?.feet
            ? " " +
              profile.feet +
              " ft " +
              (profile.inches ? profile.inches : 0) +
              " in"
            : " -"}
        </UserInfoItem>
        <UserInfoItem>
          Weight: {profile?.weight ? " " + profile.weight + " lbs" : " -"}
        </UserInfoItem>
      </User>
      <User>
        <UserInfoItem>
          <UserPhoto
            src={!profileById?.avatar ? avatar : `${profileById.avatar}`}
          />
          {(loading || battingLoading || searchUserData.loading) && (
            <LoadingContainer>
              <Loader size={20} />
            </LoadingContainer>
          )}
          <Search>
            <IconInput
              staticWidth
              onFocus={() => setOpenResults(true)}
              placeholder={"Enter player name"}
              value={searchUser}
              onChange={handleSearch}
            >
              <SearchIcon />
            </IconInput>
            {searchUsers && searchUsers.length > 0 && (
              <DropdownMenu setOpen={setOpenResults} isOpen={isOpenResults}>
                {searchUsers.map((item) => (
                  <button
                    key={item.id}
                    onClick={() =>
                      handleSearchId({
                        id: item.id + "",
                        name: item.first_name + " " + item.last_name,
                      })
                    }
                  >
                    {item.first_name + " " + item.last_name}
                  </button>
                ))}
              </DropdownMenu>
            )}
          </Search>
        </UserInfoItem>
        <UserInfoItem>
          Age: {profileById?.age ? " " + profileById.age : " -"}
        </UserInfoItem>
        <UserInfoItem>
          Height:{" "}
          {profileById?.feet
            ? " " +
              profileById.feet +
              " ft " +
              (profileById.inches ? profileById.inches : 0) +
              " in"
            : " -"}
        </UserInfoItem>
        <UserInfoItem>
          Weight:{" "}
          {profileById?.weight ? " " + profileById.weight + " lbs" : " -"}
        </UserInfoItem>
      </User>
      <div>
        <Selector
          title={"Top Batting Values - "}
          onReturnValue={setTypeSelectorLog}
          options={topValuesOptions}
        />
      </div>

      <TableRow>
        <TableElement>Fastball</TableElement>

        {typeSelectorLog.value === "distance" ? (
          <>
            <TableElement>{fastballValues?.distance || "-"}</TableElement>
            <TableElement>
              {fastballValuesSearchUser?.distance || "-"}
            </TableElement>
          </>
        ) : typeSelectorLog.value === "exit_velocity" ? (
          <>
            <TableElement>{fastballValues?.exit_velocity || "-"}</TableElement>
            <TableElement>
              {fastballValuesSearchUser?.exit_velocity || "-"}
            </TableElement>
          </>
        ) : typeSelectorLog.value === "launch_angle" ? (
          <>
            <TableElement>{fastballValues?.launch_angle || "-"}</TableElement>
            <TableElement>
              {fastballValuesSearchUser?.launch_angle || "-"}
            </TableElement>
          </>
        ) : typeSelectorLog.value === "velocity" ? (
          <>
            <TableElement>{fastballValues?.velocity || "-"}</TableElement>
            <TableElement>
              {fastballValuesSearchUser?.velocity || "-"}
            </TableElement>
          </>
        ) : typeSelectorLog.value === "spin_rate" ? (
          <>
            <TableElement>{fastballValues?.spin_rate || "-"}</TableElement>
            <TableElement>
              {fastballValuesSearchUser?.spin_rate || "-"}
            </TableElement>
          </>
        ) : (
          <></>
        )}
      </TableRow>
      <TableRow>
        <TableElement>Curveball</TableElement>
        {typeSelectorLog.value === "distance" ? (
          <>
            <TableElement>{curveballValues?.distance || "-"}</TableElement>
            <TableElement>
              {curveballValuesSearchUser?.distance || "-"}
            </TableElement>
          </>
        ) : typeSelectorLog.value === "exit_velocity" ? (
          <>
            <TableElement>{curveballValues?.exit_velocity || "-"}</TableElement>
            <TableElement>
              {curveballValuesSearchUser?.exit_velocity || "-"}
            </TableElement>
          </>
        ) : typeSelectorLog.value === "launch_angle" ? (
          <>
            <TableElement>{curveballValues?.launch_angle || "-"}</TableElement>
            <TableElement>
              {curveballValuesSearchUser?.launch_angle || "-"}
            </TableElement>
          </>
        ) : typeSelectorLog.value === "velocity" ? (
          <>
            <TableElement>{curveballValues?.velocity || "-"}</TableElement>
            <TableElement>
              {curveballValuesSearchUser?.velocity || "-"}
            </TableElement>
          </>
        ) : typeSelectorLog.value === "spin_rate" ? (
          <>
            <TableElement>{curveballValues?.spin_rate || "-"}</TableElement>
            <TableElement>
              {curveballValuesSearchUser?.spin_rate || "-"}
            </TableElement>
          </>
        ) : (
          <></>
        )}
      </TableRow>
      <TableRow>
        <TableElement>Changeup</TableElement>
        {typeSelectorLog.value === "distance" ? (
          <>
            <TableElement>{changeupValues?.distance || "-"}</TableElement>
            <TableElement>
              {changeupValuesSearchUser?.distance || "-"}
            </TableElement>
          </>
        ) : typeSelectorLog.value === "exit_velocity" ? (
          <>
            <TableElement>{changeupValues?.exit_velocity || "-"}</TableElement>
            <TableElement>
              {changeupValuesSearchUser?.exit_velocity || "-"}
            </TableElement>
          </>
        ) : typeSelectorLog.value === "launch_angle" ? (
          <>
            <TableElement>{changeupValues?.launch_angle || "-"}</TableElement>
            <TableElement>
              {changeupValuesSearchUser?.launch_angle || "-"}
            </TableElement>
          </>
        ) : typeSelectorLog.value === "velocity" ? (
          <>
            <TableElement>{changeupValues?.velocity || "-"}</TableElement>
            <TableElement>
              {changeupValuesSearchUser?.velocity || "-"}
            </TableElement>
          </>
        ) : typeSelectorLog.value === "spin_rate" ? (
          <>
            <TableElement>{changeupValues?.spin_rate || "-"}</TableElement>
            <TableElement>
              {changeupValuesSearchUser?.spin_rate || "-"}
            </TableElement>
          </>
        ) : (
          <></>
        )}
      </TableRow>
      <TableRow>
        <TableElement>Slider</TableElement>
        {typeSelectorLog.value === "distance" ? (
          <>
            <TableElement>{sliderValues?.distance || "-"}</TableElement>
            <TableElement>
              {sliderValuesSearchUser?.distance || "-"}
            </TableElement>
          </>
        ) : typeSelectorLog.value === "exit_velocity" ? (
          <>
            <TableElement>{sliderValues?.exit_velocity || "-"}</TableElement>
            <TableElement>
              {sliderValuesSearchUser?.exit_velocity || "-"}
            </TableElement>
          </>
        ) : typeSelectorLog.value === "launch_angle" ? (
          <>
            <TableElement>{sliderValues?.launch_angle || "-"}</TableElement>
            <TableElement>
              {sliderValuesSearchUser?.launch_angle || "-"}
            </TableElement>
          </>
        ) : typeSelectorLog.value === "velocity" ? (
          <>
            <TableElement>{sliderValues?.velocity || "-"}</TableElement>
            <TableElement>
              {sliderValuesSearchUser?.velocity || "-"}
            </TableElement>
          </>
        ) : typeSelectorLog.value === "spin_rate" ? (
          <>
            <TableElement>{sliderValues?.spin_rate || "-"}</TableElement>
            <TableElement>
              {sliderValuesSearchUser?.spin_rate || "-"}
            </TableElement>
          </>
        ) : (
          <></>
        )}
      </TableRow>
    </Root>
  );
};

export default Comparison;

interface ComparisonCardTabProps {
  batting: { data: IBattingData | undefined; loading: boolean };
  pitching: { data: IPitchingData | undefined; loading: boolean } | undefined;
  profile: IProfile | undefined;
}

interface handleSearchIdProps {
  id: string;
  name: string;
}

const Root = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const User = styled.div`
  width: 50%;
  display: flex;
  flex-flow: column;
`;

const UserInfoItem = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  min-height: 44px;
  margin-bottom: 6px;
`;

const LoadingContainer = styled.div`
  position: absolute;
  left: -25px;
  bottom: 25px;
`;

const Search = styled.div`
  position: relative;
`;

const UserPhoto = styled.img`
  background-size: cover;
  background-position: 50% 50%;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin-right: 8px;
  margin-bottom: 15px;
`;

const TableElement = styled.div`
  width: 30%;
`;
