import LaunchesTable from "@/app/components/launchList/LaunchesList";

export default async function LaunchesPage() {
  return (
    <div className="w-full bg-linear-to-b from-black via-gray-900 to-black text-white">
      <div className="py-2 text-center border-b border-gray-700">
        <h1 className="text-4xl font-bold tracking-wide">SpaceX Launches</h1>
        <p className="mt-2 text-gray-400">
          Browse all launches with details and rockets
        </p>
      </div>

      <main className="p-6 max-w-7xl mx-auto">
        <div className="rounded-lg shadow-lg overflow-hidden border border-gray-700">
          <LaunchesTable />
        </div>
      </main>
    </div>
  );
}
