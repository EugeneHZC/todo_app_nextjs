"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";

const Profile = () => {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col items-center sm:items-start sm:flex md:flex-row justify-between w-full mt-16">
      <Image
        src={session?.user?.image ?? "/user.png"}
        alt="profile picture"
        width={200}
        height={200}
        className="rounded-full sm:w-[25%] w--[50%]"
      />

      <div className="flex flex-col w-[75%] sm:items-center sm:ml-16 m-0">
        <div>
          <h1 className="text-5xl font-extrabold leading-[1.15] text-black sm:text-4xl mb-5">
            Welcome to your personalized profile page
          </h1>

          <div className="mt-16">
            <p className="text-xl desc grid grid-cols-2">
              <span className="font-satoshi text-gray-500">Username: </span>
              <span className="font-semibold">{session?.user?.name}</span>
            </p>
            <p className="text-xl desc grid grid-cols-2">
              <span className="text-gray-500">Email: </span>
              <span className="font-semibold">{session?.user?.email}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
