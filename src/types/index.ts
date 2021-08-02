import { IProfile } from '../graphql/types';

export interface IUser {
  email: string;
  password: string;
  role: string;
  clientToken: string;
  token: string;
  id: number | null;
}

export interface DesiredProfile {
  currentProfile: boolean;
  profile: {
    loading: boolean;
    data: IProfile | undefined;
  };
}

export interface handleSubmitProps {
  first_name: string;
  last_name: string;
  position: {
    value: string;
    label: string;
  };
  position2: {
    value: string;
    label: string;
  };
  avatar: string;
  throws_hand: {
    value: string;
    label: string;
  };
  bats_hand: {
    value: string;
    label: string;
  };
  biography: string;
  school_year: {
    value: string;
    label: string;
  };
  feet: string;
  inches: string;
  weight: string;
  age: string;
  school: {
    value: string;
    label: string;
  };
  teams: Array<{
    value: string;
    label: string;
  }>;
  facilities: Array<{
    value: string;
    label: string;
    data: string;
  }>;
}

export type IColumnsData = Array<{ Header: string; accessor: string }>;

export interface ISubmitLeaderboardProps {
  age: string;
  favorite: { value: string; label: string };
  date: { value: string; label: string };
  type: { value: string; label: string };
  position: { value: string; label: string };
  school: string;
  team: string;
}

export interface ISubmitNetworkProps {
  age: string;
  favorite: { value: string; label: string };
  usersCount:{ value: string; label: string };
  position: { value: string; label: string };
  school: string;
  team: string;
  name: string;
   
} 
