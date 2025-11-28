import { gql } from "@apollo/client";

export const GET_ROCKETS = gql`
  query Rockets {
    rockets {
      id
      name
      description
      country
      company
      first_flight
      stages
      boosters
      success_rate_pct
      cost_per_launch
      height {
        meters
        feet
      }
      mass {
        kg
        lb
      }
      diameter {
        meters
        feet
      }
      engines {
        number
        type
        version
      }
    }
  }
`;
