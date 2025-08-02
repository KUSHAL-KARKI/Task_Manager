"use client";
import React from "react";
import { useGlobalState } from "@/app/Context/GlobalProvider";
import Image from "next/image";
import menu from "@/app/utils/menu";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { UserButton, useClerk, useUser } from "@clerk/nextjs";
import { IoIosLogOut } from "react-icons/io";
import { FaBars } from "react-icons/fa6";
import { LuArrowLeftToLine } from "react-icons/lu";
function Sidebar() {
  const { collapsed, collapseMenu } = useGlobalState();
  const { signOut } = useClerk();

  const { user } = useUser();

  const firstName = user?.firstName || "";
  const lastName = user?.lastName || "";
  const imageUrl = user?.imageUrl || "/default-profile.svg";

  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (link: string) => {
    router.push(link);
  };

  return (
    <nav
      className={`
        w-[270px] m-8 bg-black border-2 border-white 
        rounded-xl flex flex-col justify-between text-white
        transition-transform duration-300 ease-in-out h-[calc(100vh-4rem)]

        ${collapsed ? "-translate-x-[113%]" : "translate-x-0"}
        fixed left-0 top-0 z-50 m-4 h-[calc(100vh-2rem)]
        md:fixed md:left-0 md:top-0 md:h-screen md:z-50 md:m-4
        lg:relative lg:m-8 lg:h-[calc(100vh-4rem)] lg:z-auto lg:translate-x-0
        `}
    >
      {/* Toggle button for mobile */}
      <button
        className={`
          lg:hidden block absolute -right-[46px] top-8 p-3 
          bg-black border-r-2 border-t-2 border-b-2
          border-white rounded-tr-2xl rounded-br-2xl z-50
        `}
        onClick={collapseMenu}
      >
        {collapsed ? (
          <FaBars className="h-5 w-5 stroke-[3]"  />
        ) : (
          <LuArrowLeftToLine className="h-5 w-5 stroke-[3]" />
        )}
      </button>



      {/* Profile section */}
      <div className="m-6 p-4 relative rounded-2xl cursor-pointer flex items-center group">
        <div className="absolute inset-0 backdrop-blur-sm bg-gradient-to-r from-gray-200 to-gray-600/20 rounded-2xl border-2 border-gray-600 opacity-20 group-hover:opacity-100 transition-all duration-500 group-hover:shadow-lg"></div>

        <div className="relative z-10 flex-shrink-0 inline-block overflow-hidden rounded-full w-[70px] h-[70px] transition-all duration-500 group-hover:scale-110">
          <Image
            width={70}
            height={70}
            src={imageUrl}
            alt="profile"
            className="rounded-full transition-all duration-500"
          />
        </div>

        <div className="absolute z-20 top-0 w-full h-full [&_.cl-rootBox]:w-full [&_.cl-rootBox]:h-full [&_.cl-userButtonBox]:w-full [&_.cl-userButtonBox]:h-full [&_.cl-userButtonTrigger]:w-full [&_.cl-userButtonTrigger]:h-full [&_.cl-userButtonTrigger]:opacity-0">
          <UserButton />
        </div>

        <h1 className="relative flex flex-col z-10 ml-6 text-2xl font-bold capitalize leading-tight">
          <span>{firstName}</span>
          <span>{lastName}</span>
        </h1>
      </div>

      {/* Navigation items */}
      <ul className="nav-items flex flex-col gap-3">
        {menu.map((item) => {
          const link = item.link;
          const isActive = pathname === link;
          return (
            <li
              key={item.id}
              className={`
                relative px-4 py-3 mx-0 my-1 grid grid-cols-[40px_1fr] text-xl cursor-pointer items-center
                transition-all duration-300 ease-in-out group
                ${
                  isActive
                    ? "bg-green-900"
                    : "hover:bg-gray-700"
                }
              `}
              onClick={() => {
                handleClick(link);
              }}
            >
              {/* Left border indicator for active item */}
              <div
                className={`
                  absolute right-0 top-0 h-full bg-green-400
                  rounded-bl-md rounded-tl-md transition-all duration-300
                  ${isActive ? "w-1" : "w-0"}
                `}
              ></div>

              {/* Hover effect background */}
              <div className="absolute left-0 top-0 h-full bg-gray-700 w-0 group-hover:w-full transition-all duration-300 ease-in-out z-0"></div>

              <i className="flex items-center text-white z-10 relative">
                {item.icon}
              </i>
              <Link
                href={link}
                className="font-medium transition-all duration-300 z-10 relative leading-none"
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Sign out button */}
      <div className="relative mx-6 mb-6 text-lg">
        <button
          onClick={() => signOut(() => router.push("/signin"))}
          className="flex items-center gap-1 w-full p-3 rounded-xl hover:bg-red-900/20 transition-all duration-300 group"
        >
          <span className="text-red-400 group-hover:scale-110 transition-transform duration-300 ">
            <IoIosLogOut className="size-7" />
          </span>
          <span className="capitalize font-medium text-red-400">
            sign out
          </span>
        </button>
      </div>
    </nav>
  );
}

export default Sidebar;
