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
export interface IUpdateProfile {
  profile: IProfile;
}
export interface IUpdateProfileProps {
  form: {
    id: string;
    first_name: string;
    last_name: string;
    position: string;
    position2: string;
    avatar?: string;
    throws_hand: string;
    bats_hand: string;
    biography: string;
    school_year: string;
    feet: number;
    inches: number;
    weight: number;
    age: number;
    recent_events?: IRecentEvents;
    school: ISchool;
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
export interface IFacilitiesData {
  facilities: {
    facilities: Array<IFacilities>;
  };
}
