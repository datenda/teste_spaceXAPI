import { gql } from "@apollo/client";

export const GET_LAUNCH_BY_ID = gql`
  query GetLaunchById($id: ID!) {
    launch(id: $id) {
      id
      mission_name
      details
      launch_date_utc
      launch_success
      rocket {
        rocket_name
        rocket_type
        rocket {
          id
          name
          type
        }
      }
      links {
        mission_patch
        flickr_images
      }
      launch_site {
        site_name_long
        site_name
      }
    }
  }
`;
