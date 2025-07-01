"use client";
import React from "react";
import Image from "next/image";
import menu from "@/app/utils/menu";
import { usePathname, useRouter } from "next/navigation";
import { arrowLeft, bars, logout } from "@/app/utils/Icons";
import { useClerk, UserButton, useUser } from "@clerk/nextjs";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { signOut } = useClerk();
  const { user } = useUser();
  const firstName = user?.firstName || "";
  const lastName = user?.lastName || "";
  const imageUrl = user?.imageUrl || "/default-profile.png";

  const handleClick = (link: string) => {
    router.push(link);
  };

  return (
    <div className=" drawer lg:drawer-open flex flex-col justify-between relative rounded-2xl border-2 w-[300px] h-screen">
      <div className="m-6 px-4 py-3 relative flex items-center">
        <div className=" absolute top-0 left-0 w-[100%]  h-[100%] border-2 opacity-5 backdrop-blur-xl rounded-2xl hover:opacity-5"></div>
        <div className="relative z-10 flex shrink-0 overflow-hidden rounded-full w-[70px] h-[70px]">
              <div className="absolute top-0 h-full w-full">
          <UserButton />
        </div>
        </div>
    
        <h1 className="relative z-10 flex flex-col ml-5 text-2xl font-bold text-gray-800 dark:text-gray-200">
          <span> {firstName}</span>
          <span> {lastName}</span>
        </h1>
      </div>

      <ul className="navbar relative mx-1.5 my-0 grid grid-cols-1 p-8 cursor-pointer">
        {menu.map((item) => {
          const link = item.link;
          return (
            <li
              key={item.id}
              className=" h-16 p-5 w-56 flex items-center justify-start text-xl font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 ease-in-out"
              onClick={() => handleClick(link)}
            >
              {item.icon}
              <span className="m-4">{item.title}</span>
            </li>
          );
        })}
      </ul>

      <div className="relative text-2xl">
        <button onClick={() => signOut(() => router.push("/signin"))} className="">
          {logout} signout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
