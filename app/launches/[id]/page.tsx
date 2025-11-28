import { client } from "@/lib/apolloClient";
import { GET_LAUNCH_BY_ID } from "@/lib/queries/launch";
import { Launch } from "@/lib/types";
import Image from "next/image";

interface LaunchPageProps {
  params: { id: string };
}

export default async function LaunchPage(props: LaunchPageProps) {
  const { id } = await props.params;

  let launch: Launch | null = null;

  try {
    const result = await client.query<{ launch: Launch }>({
      query: GET_LAUNCH_BY_ID,
      variables: { id },
    });
    launch = result.data?.launch ?? null;
  } catch (error) {
    console.error("Error fetching launch:", error);
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-lg">Failed to load launch.</div>
      </div>
    );
  }

  if (!launch) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-lg">Launch not found.</div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-black text-white p-6 md:p-12 flex flex-col gap-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-4xl md:text-5xl font-bold mb-4">
          {launch.mission_name}
        </div>
        <div className="text-gray-300 mb-3">
          {launch.details ?? "No details available"}
        </div>

        <div className="space-y-1 text-gray-200 mb-4">
          <div>
            <strong>Rocket:</strong> {launch.rocket.rocket_name} (
            {launch.rocket.rocket_type ?? "Unknown"})
          </div>
          {launch.launch_site?.site_name_long && (
            <div>
              <strong>Launch site:</strong> {launch.launch_site.site_name_long}
            </div>
          )}
          <div>
            <strong>Launch date:</strong>{" "}
            {new Date(launch.launch_date_utc).toLocaleDateString()}
          </div>
          {launch.launch_success !== undefined && (
            <div>
              <strong>Success:</strong> {launch.launch_success ? "✅" : "❌"}
            </div>
          )}
        </div>

        {launch.links.flickr_images.length > 0 && (
          <div className="mt-4">
            <div className="text-xl font-semibold mb-2">Images</div>
            <div className="flex gap-3 overflow-x-auto py-2">
              {launch.links.flickr_images.map((img, index) => (
                <div
                  key={index}
                  className="shrink-0 w-80 h-48 relative rounded-lg shadow-md overflow-hidden"
                >
                  <Image
                    fill
                    src={img}
                    alt={`${launch.mission_name} image`}
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
