import { gql } from '@apollo/client';

export const CURRENT_PROFILE = gql`
  query CurrentProfileQuery {
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
