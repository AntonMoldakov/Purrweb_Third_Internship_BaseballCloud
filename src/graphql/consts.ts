import { gql } from '@apollo/client';

export const CURRENT_PROFILE = gql`
  {
    current_profile {
      id
      first_name
      last_name
      position
      position2
      avatar
      throws_hand
      bats_hand
      biography
      school_year
      feet
      inches
      weight
      age
      school {
        id
        name
      }
      teams {
        id
        name
      }
      facilities {
        id
        email
        u_name
      }
    }
  }
`;

export const CURRENT_USER = gql`
  query CurrentProfileQuery {
    current_profile {
      first_name
      last_name
      avatar
    }
  }
`;

export const SCHOOLS_DATA = gql`
  query Schools($search: String!) {
    schools(search: $search) {
      schools {
        id
        name
      }
    }
  }
`;

export const TEAMS_DATA = gql`
  query Teams($search: String!) {
    teams(search: $search) {
      teams {
        id
        name
      }
    }
  }
`;

export const FACILITIES_DATA = gql`
  query Facilities($search: String!) {
    facilities(search: $search) {
      facilities {
        id
        email
        u_name
      }
    }
  }
`;

export const BATTING_DATA = gql`
  query BattingSummary($id: ID!) {
    batting_summary(id: $id) {
      top_values {
        distance
        pitch_type
        launch_angle
        exit_velocity
      }
      average_values {
        distance
        pitch_type
        launch_angle
        exit_velocity
      }
    }
  }
`;

export const PITCHING_DATA = gql`
  query PitchingSummary($id: ID!) {
    pitching_summary(id: $id) {
      top_values {
        velocity
        spin_rate
        pitch_type
      }
      average_values {
        velocity
        spin_rate
        pitch_type
      }
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile($form: UpdateProfileInput!) {
    update_profile(input: $form) {
      profile {
        id
        first_name
        last_name
        position
        position2
        avatar
        throws_hand
        bats_hand
        biography
        school_year
        feet
        inches
        weight
        age
        recent_events {
          id
          event_type
          event_name
          date
          recent_avatars {
            id
            first_name
            last_name
            avatar
          }
        }
        school {
          id
          name
        }
        teams {
          id
          name
        }
        facilities {
          id
          email
          u_name
        }
      }
    }
  }
`;

export const BATTING_GRAPH_DATA = gql`
  query BattingGraph($input: FilterGraphInput!) {
    batting_graph(input: $input) {
      graph_rows
    }
  }
`;

export const PITCHING_GRAPH_DATA = gql`
  query PitchingGraph($input: FilterGraphInput!) {
    pitching_graph(input: $input) {
      graph_rows
    }
  }
`;

export const PROFILE_DATA_BY_ID = gql`
  query Profile($id: String!) {
    profile(id: $id) {
      id
      first_name
      last_name
      position
      position2
      avatar
      throws_hand
      bats_hand
      biography
      school_year
      feet
      inches
      favorite
      weight
      age
      school {
        id
        name
      }
      teams {
        id
        name
      }
      facilities {
        id
        email
        u_name
      }
    }
  }
`;

export const BATTING_LOG_DATA = gql`
  query BattingLog($input: FilterBattingLogInput!) {
    batting_log(input: $input) {
      batting_log {
        date
        pitcher_name
        pitcher_handedness
        pitch_type
        pitch_call
        exit_velocity
        launch_angle
        direction
        distance
        hit_spin_rate
        hang_time
        pitcher_datraks_id
      }
      total_count
    }
  }
`;

export const PITCHING_LOG_DATA = gql`
  query PitchingLog($input: FilterPitchingLogInput!) {
    pitching_log(input: $input) {
      pitching_log {
        date
        pitch_type
        pitch_call
        velocity
        spin_rate
        spin_axis
        tilt
        release_height
        release_side
        extension
        vertical_break
        horizontal_break
        height_at_plate
        batter_name
        batter_datraks_id
        batter_handedness
      }
      total_count
    }
  }
`;

export const UPDATE_FAVORITE_PROFILE = gql`
  mutation UpdateFavoriteProfile($form: UpdateFavoriteProfileInput!) {
    update_favorite_profile(input: $form) {
      favorite
    }
  }
`;

export const FILTER_PROFILE_NAMES = gql`
  query ProfileNames($input: FilterProfileNamesInput!) {
    profile_names(input: $input) {
      profile_names {
        id
        position
        first_name
        last_name
        inches
        feet
        weight
        age
      }
    }
  }
`;

export const PROFILE_EVENTS_DATA = gql`
  query ProfileEvents($input: FilterProfileEventsInput!) {
    profile_events(input: $input) {
      events {
        id
        date
        event_type
        event_name
      }
      total_count
    }
  }
`;

export const LEADERBOARD_BATTING_DATA = gql`
  query LeaderboardBatting($input: FilterLeaderboardInput!) {
    leaderboard_batting(input: $input) {
      leaderboard_batting {
        batter_name
        exit_velocity
        launch_angle
        distance
        batter_datraks_id
        age
        school {
          id
          name
        }
        teams {
          id
          name
        }
        favorite
      }
    }
  }
`;

export const LEADERBOARD_PITCHING_DATA = gql`
  query LeaderboardPitching($input: FilterLeaderboardInput!) {
    leaderboard_pitching(input: $input) {
      leaderboard_pitching {
        pitcher_name
        pitch_type
        velocity
        spin_rate
        vertical_break
        horizontal_break
        pitcher_datraks_id
        age
        school {
          id
          name
        }
        teams {
          id
          name
        }
        favorite
      }
    }
  }
`;

export const NETWORK_USERS_DATA = gql`
  query Profiles($input: FilterProfilesInput!) {
    profiles(input: $input) {
      profiles {
        id
        first_name
        last_name
        position
        position2
        school_year
        feet
        inches
        weight  
        age
        events {
          id
        }
        school {
          id
          name
        }
        teams {
          id
          name
        }
        favorite
      }
      total_count
    }
  }
`;
