import { gql } from "@apollo/client";

export const GET_LAUNCHES = gql`
  query Launches($limit: Int, $offset: Int) {
    launches(limit: $limit, offset: $offset) {
      id
      mission_name
      details
      launch_date_utc
      launch_success
      links {
        flickr_images
        mission_patch
      }
      rocket {
        rocket_name
      }
    }
  }
`;
