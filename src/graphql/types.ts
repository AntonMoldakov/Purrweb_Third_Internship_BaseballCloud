interface ISchool {
  id: number;
  name: string;
}

interface ITeams {
  id: number;
  name: string;
}

interface IFacilities {
  id: number;
  email: string;
  u_name: string;
}

interface IRecentEvents {
  recent_events: {
    id: number;
    event_type: string;
    event_name: string;
    date: Array<string>;
    recent_avatars: {
      id: number;
      first_name: string;
      last_name: string;
      avatar: string;
    };
  };
}

export interface IProfile {
  id: number;
  first_name: string;
  last_name: string;
  position: string;
  position2: string;
  avatar: string;
  favorite?: boolean;
  throws_hand: string;
  bats_hand: string;
  biography: string;
  school_year: string;
  feet: number;
  inches: number;
  weight: number;
  age: number;
  school: ISchool;
  teams: Array<ITeams>;
  facilities: Array<IFacilities>;
}

export interface ICurrentProfile {
  current_profile: IProfile;
}

export interface IProfileById {
  profile: IProfile;
}

export interface IUpdateProfile {
  profile: IProfile;
}

export interface IUpdateFavoriteProfile {
  update_favorite_profile: { favorite: boolean };
}

export interface IUpdateFavoriteProfileProps {
  form: { profile_id: string; favorite: boolean };
}

export interface IUpdateProfileProps {
  form: {
    id: string;
    first_name: string;
    last_name: string;
    position: string;
    position2: string;
    avatar: string;
    throws_hand: string;
    bats_hand: string;
    biography: string;
    school_year: string;
    feet: number;
    inches: number;
    weight: number;
    age: number;
    recent_events?: IRecentEvents;
    school: ISchool | null;
    teams: Array<ITeams>;
    facilities: Array<IFacilities>;
  };
}

export interface ICurrentUser {
  current_profile: {
    first_name: string;
    last_name: string;
    avatar: string;
  };
}

export interface ISchoolsData {
  schools: {
    schools: Array<ISchool>;
  };
}

export interface ITeamsData {
  teams: {
    teams: Array<ITeams>;
  };
}

export interface IBattingRowsData {
  batting_graph: { graph_rows: Array<number> };
}

export interface IPitchingRowsData {
  pitching_graph: { graph_rows: Array<number> };
}

export interface IBatting {
  distance: number;
  exit_velocity: number;
  launch_angle: number;
  pitch_type: string;
  spin_rate: number;
  velocity: number;
}

export interface IBattingData {
  batting_summary: {
    average_values: Array<IBatting>;
    top_values: Array<IBatting>;
  };
}

export interface IPitching {
  velocity: number;
  spin_rate: number;
  pitch_type: string;
}

export interface IPitchingData {
  pitching_summary: {
    average_values: Array<IPitching>;
    top_values: Array<IPitching>;
  };
}

export interface IBattingLog {
  date: string;
  direction: number;
  distance: number;
  exit_velocity: number;
  hang_time: number;
  hit_spin_rate: number;
  launch_angle: number;
  pitch_call: string;
  pitch_type: string;
  pitcher_datraks_id: number;
  pitcher_handedness: string;
  pitcher_name: string;
}

export interface IPitchingLog {
  batter_datraks_id: number;
  batter_handedness: string;
  batter_name: string;
  extension: string;
  height_at_plate: number;
  horizontal_break: number;
  release_height: number;
  release_side: number;
  spin_axis: number;
  spin_rate: number;
  tilt: number;
  velocity: number;
  vertical_break: number;
}

export interface IBattingLogData {
  batting_log: {
    batting_log: Array<IBattingLog>;
    total_count: number;
  };
}

export interface IPitchingLogData {
  pitching_log: {
    pitching_log: Array<IPitchingLog>;
    total_count: number;
  };
}

export interface IFacilitiesData {
  facilities: {
    facilities: Array<IFacilities>;
  };
}

export interface IProfileNamesData {
  profile_names: {
    profile_names: Array<IProfile>;
  };
}

export interface IEvent {
  id: string;
  date: string;
  event_type: string;
  event_name: string;
}

export interface IProfileEventsData {
  profile_events: {
    events: Array<IEvent>;
    total_count: number;
  };
}
