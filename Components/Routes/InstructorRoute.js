import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import { SyncOutlined } from "@ant-design/icons";
import Image from "next/image";
import img1 from "../../public/img/carou1.jpg";

import { useRouter } from "next/router";
import InstructorNav from "../Navbar/InstructorNav.jsx";

const InstructorRoute = ({ children }) => {
  const [ok, setOk] = useState(false);

  const router = useRouter();

  useEffect(() => {
    fetchInstructor();
  }, []);

  const { state } = useContext(AuthContext);

  const { user } = state;

  const fetchInstructor = async () => {
    try {
      const { data } = await axios.get("/api/current-instructor");
      if (data.ok) setOk(true);
    } catch (err) {
      router.push("/");
      console.log(err);
      setOk(false);
    }
  };

  return (
    <div>
      {ok && (
        <div>
          <div className="m-auto ">
            <div className="relative h-32">
              <div className="absolute z-50 ">
                <h1 className="mx-auto mt-7 w-max   font-bold text-black ml-8 text-[2rem]">
                  Welcome in you dasboard
                  <p className="text-2xl">{user.username}</p>
                </h1>
              </div>
              <button onClick={(e) => handleUpdateAvatar(e)}>ajouter</button>
              <div className="h-full w-full">
                <Image
                  src={img1}
                  alt="Woman on computer"
                  objectFit="cover"
                  layout="fill"
                  placeholder="blur"
                />
              </div>
            </div>
          </div>
          <div className="md:flex md:flex-wrap my-12 mx-auto w-full justify-between">
            <InstructorNav />

            <div className="md:w-3/4 m-auto mt-4 md:mt-0 min-w-[300px] bg-gradient-to-br from-[#B9D9EB] to-[#b4e0d5] rounded-lg p-4 ">
              {children}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstructorRoute;
