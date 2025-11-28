export type LaunchRocketStage = Record<string, unknown>;

export type LaunchRocket = {
  __typename?: "LaunchRocket";
  fairings?: LaunchRocketStage | null;
  first_stage?: LaunchRocketStage | null;
  rocket: {
    __typename?: "Rocket";
    id: string;
    name: string;
    type: string;
  };
  rocket_name: string;
  rocket_type?: string | null;
  second_stage?: LaunchRocketStage | null;
};

export type LaunchLinks = {
  __typename?: "LaunchLinks";
  flickr_images: string[];
  mission_patch?: string | null;
};

export type LaunchSite = {
  __typename?: "LaunchSite";
  site_name?: string | null;
  site_name_long?: string | null;
};

export type Launch = {
  __typename?: "Launch";
  id: string;
  mission_name: string;
  details?: string | null;
  launch_date_utc: string;
  launch_success?: boolean | null;
  links: LaunchLinks;
  rocket: LaunchRocket;
  launch_site?: LaunchSite | null;
  upcoming?: boolean | null;
};
