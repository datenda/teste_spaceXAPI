"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Launch } from "@/lib/types";
import { GET_LAUNCHES } from "@/lib/queries/launches";
import { client as ApolloClient } from "@/lib/apolloClient";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";

import { Skeleton } from "@/components/ui/skeleton";

const PAGE_SIZE = 25;

export default function LaunchesTable() {
  const router = useRouter();

  const [launches, setLaunches] = useState<Launch[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [recentLaunches, setRecentLaunches] = useState<Launch[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);
  const initialFetchDone = useRef(false);
  const fetchInProgress = useRef(false);

  useEffect(() => {
    const stored = localStorage.getItem("recentLaunches");
    if (stored) {
      setRecentLaunches(JSON.parse(stored));
    }
  }, []);

  const fetchLaunches = async () => {
    if (loading || !hasMore || fetchInProgress.current) return;

    fetchInProgress.current = true;
    setLoading(true);

    try {
      const response = await ApolloClient.query<{ launches: Launch[] }>({
        query: GET_LAUNCHES,
        variables: { limit: PAGE_SIZE, offset },
        fetchPolicy: "network-only",
      });

      const newLaunches = response.data?.launches ?? [];
      if (newLaunches.length < PAGE_SIZE) setHasMore(false);

      setLaunches((prev) => [...prev, ...newLaunches]);
      setOffset((prev) => prev + PAGE_SIZE);
    } catch (err) {
      console.error("Error fetching launches:", err);
      setHasMore(false);
    } finally {
      setLoading(false);
      fetchInProgress.current = false;
    }
  };

  useEffect(() => {
    if (initialFetchDone.current) return;
    initialFetchDone.current = true;
    fetchLaunches();
  });

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 200) {
        fetchLaunches();
      }
    };

    const el = containerRef.current;
    el?.addEventListener("scroll", handleScroll);
    return () => el?.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  const handleRowClick = (launch: Launch) => {
    router.push(`/launches/${launch.id}`);

    const updated = [
      launch,
      ...recentLaunches.filter((l) => l.id !== launch.id),
    ].slice(0, 5);
    setRecentLaunches(updated);
    localStorage.setItem("recentLaunches", JSON.stringify(updated));
  };

  const cellClasses = "whitespace-normal text-white";

  return (
    <div
      ref={containerRef}
      className="max-h-[800px] overflow-y-auto bg-black p-4 rounded-lg"
    >
      {recentLaunches.length > 0 && (
        <div className="mb-4">
          <h3 className="text-white font-bold mb-2">Recently Visited</h3>
          <div className="flex gap-2 overflow-x-auto">
            {recentLaunches.map((l) => (
              <div
                key={l.id}
                className="p-2 bg-gray-800 rounded cursor-pointer hover:bg-gray-700 transition"
                onClick={() => router.push(`/launches/${l.id}`)}
              >
                {l.mission_name}
              </div>
            ))}
          </div>
        </div>
      )}

      <Table className="w-full table-auto">
        <TableHeader>
          <TableRow>
            <TableHead className={cellClasses}>Mission</TableHead>
            <TableHead className={cellClasses}>Rocket</TableHead>
            <TableHead className={cellClasses}>Details</TableHead>
            <TableHead className={cellClasses}>Date</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {launches.map((launch) => (
            <TableRow
              key={launch.id}
              className="cursor-pointer hover:bg-gray-900 transition"
              onClick={() => handleRowClick(launch)}
            >
              <TableCell className={cellClasses}>
                {launch.mission_name}
              </TableCell>
              <TableCell className={cellClasses}>
                {launch.rocket.rocket_name}
              </TableCell>
              <TableCell className={cellClasses}>
                {launch.details ?? "N/A"}
              </TableCell>
              <TableCell className={cellClasses}>
                {new Date(launch.launch_date_utc).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}

          {loading &&
            Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={`skeleton-${i}`}>
                <TableCell className={cellClasses}>
                  <Skeleton className="h-4 w-40 bg-gray-700" />
                </TableCell>
                <TableCell className={cellClasses}>
                  <Skeleton className="h-4 w-32 bg-gray-700" />
                </TableCell>
                <TableCell className={cellClasses}>
                  <Skeleton className="h-4 w-64 bg-gray-700" />
                </TableCell>
                <TableCell className={cellClasses}>
                  <Skeleton className="h-4 w-24 bg-gray-700" />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      {!hasMore && !loading && (
        <div className="text-center text-gray-500 py-4">No more launches</div>
      )}
    </div>
  );
}
