import React, { useContext, useEffect, useState } from "react";
import { Menu } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";

import {
  CarryOutOutlined,
  TeamOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import {
  ShoppingCartIcon,
  SearchIcon,
  GlobeAltIcon,
  MenuIcon,
} from "@heroicons/react/outline";
import { AuthContext } from "../../contexts/AuthContext";
import LoggedAccount from "../Atoms/LoggedAcount";

const { Item, ItemGroup } = Menu;

const Navbar = () => {
  const router = useRouter();
  const { current, state, logOut } = useContext(AuthContext);
  const { role } = state.user;
  const [currentB, setCurrentB] = useState("");

  useEffect(() => {
    setCurrentB(router.pathname);
  }, [router.pathname]);

  return (
    <div>
      <div className="flex space-x-4 bg-white h-[74px] shadow-lg text-center justify-between items-center px-4">
        <MenuIcon className="h-6 w-6 md:hidden" />
        <Link href="/">
          <div className="flex">
            <h2 className="text-3xl font-bold cursor-pointer">OvenArth</h2>
          </div>
        </Link>
        <form className="hidden bg-[#f8fafb] md:flex border border-black rounded-3xl flex-1 h-12 items-center">
          <SearchIcon className="h-5 w-5 mx-4 text-gray" />
          <input
            type="text"
            placeholder="Search for anything"
            className="bg-transparent text-sm outline-none"
          />
        </form>
        <div className=" w-[280px]">
          <Menu mode="horizontal" selectedKeys={[currentB]}>
            <Menu.Item
              key="/instructor/course/app"
              onClick={(e) => setCurrentB(e.key)}
              icon={<AppstoreOutlined className=" align-middle" />}
            >
              <Link href="/instructor/course/app">
                <a>App</a>
              </Link>
            </Menu.Item>
            {role && role.includes("Instructor") ? (
              <Item
                label="Create Course"
                key="/instructor"
                onClick={(e) => setCurrentB(e.key)}
                icon={<CarryOutOutlined className=" align-middle" />}
              >
                <Link href="/instructor">
                  <a>Create courses</a>
                </Link>
              </Item>
            ) : (
              <Item
                key="/user/become-instructor"
                onClick={(e) => setCurrentB(e.key)}
                icon={<TeamOutlined className=" align-middle" />}
              >
                <Link href="/user/become-instructor">
                  <a>Teach on OvenArth</a>
                </Link>
              </Item>
            )}
          </Menu>
        </div>

        <div className="flex">
          <SearchIcon className="h-6 w-6 text-gray-400 md:hidden" />
          <ShoppingCartIcon className="h-6 w-6 " />
        </div>
        {state.user.username === "" ? (
          <div className="hidden md:flex space-x-4 justify-end">
            <Link href="/login">
              <div className="flex">
                <div
                  className={`h-10 w-2 bg-blue-500 ${
                    current === "/login" ? "show" : "hidden"
                  }`}
                />
                <button className="border border-black h-10 text-sm font-bold w-20 hover:bg-[#F5F5F5]">
                  Log In
                </button>
              </div>
            </Link>
            <Link href="/register">
              <div className="flex">
                <div
                  className={`h-10 w-2 bg-blue-500 ${
                    current === "/register" ? "show" : "hidden"
                  }`}
                />
                <button className="border bg-black text-white border-black h-10 text-sm font-bold w-20 hover:bg-[#F5F5F5] hover:text-black">
                  Sign Up
                </button>
              </div>
            </Link>
          </div>
        ) : (
          <div className="hidden md:block">
            <LoggedAccount />
          </div>
        )}

        <button className="duration-500 hidden md:flex border border-black w-10 h-10 items-center  justify-center hover:bg-black hover:text-white ">
          <GlobeAltIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
