import React, { useState, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { AuthContext } from "../../../contexts/AuthContext";
import img1 from "../../../public/img/carou1.jpg";

import { LogoutOutlined, UserOutlined } from "@ant-design/icons";

const LoggedAccount = () => {
  const { logOut, state } = useContext(AuthContext);
  const [show, setShow] = useState(false);

  const { username, email } = state.user;

  return (
    <div className=" p-2 flex items-center justify-center my-auto mx-[0.1rem] h-full">
      <div className=" group flex items-center text-black justify-center ">
        <div className=" p-2 flex flex-col text-left">
          <p>Hello, {username}</p>
          <p className="text-sm">{email}</p>
        </div>
        <div className="relative flex items-center justify-center  rounded-full border-2 border-[#4b6cb7] overflow-hidden w-10 h-10 cursor-pointer">
          <Image
            src={img1}
            alt="Woman on computer"
            objectFit="cover"
            layout="fill"
            placeholder="blur"
          />
        </div>

        <div className="origin-top-right hidden group-hover:block delay-300 bg-white text-black absolute top-16 right-20 z-50 text-justify border rounded-md p-2">
          <ul className="cursor-pointer">
            <Link href="/profile">
              <a className=" p-2 hover:bg-[#171717] hover:text-white  font-semibold rounded">
                <UserOutlined className=" align-middle" /> Account
              </a>
            </Link>
            <div onClick={() => logOut()}>
              <li className="   p-2 hover:bg-[#171717] hover:text-white font-semibold rounded ">
                <LogoutOutlined className="align-middle" /> Logout
              </li>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LoggedAccount;
