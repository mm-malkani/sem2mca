import React from "react";
import { useSession } from "next-auth/react";
import { trpc } from "@/utils/trpc";
import Loader from "@/motions/loader";
import { Button } from "@/styles/ui";
import Link from "next/link";

const Dashboard = () => {
  const { data: session } = useSession();
  const { data, error, isLoading } = trpc.useQuery(["links.links"]);

  return (
    <>
      <div className="border-b border-zinc-700">
        <div className="container mx-auto pb-3 flex items-center justify-between">
          <h1 className="text-2xl">Dashboard</h1>
          <Link href="/dash/create">
            <div className="p-2 cursor-pointer -translate-y-1 duration-200 hover flex items-center justify-center rounded-md bg-midnightLight">
              Create new link
            </div>
          </Link>
        </div>
      </div>
      <div className="container mx-auto">
        {isLoading && (
          <>
            <div className="flex justify-center items-center mt-8">
              <Loader width={40} height={40}/>
            </div>
          </>
        )}
        {error && <p>{JSON.stringify(error)}</p>}
        {data?.map((link) => (
          <div key={link.id} className="mt-8">
            <p className="text-2xl">{link.url}</p>
            <p className="text-gray-400">{link.slug}</p>
            <p className="text-gray-400">{link.description}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Dashboard;
