import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

import img1 from "../../public/img/carou1.jpg";
import UserInfo from "../../Components/UserInfo/UserInfo";
import UserRoute from "../../Components/Routes/UserRoute";
import { AuthContext } from "../../contexts/AuthContext";

const Profile = () => {
  const { state, getUserInfo } = useContext(AuthContext);

  const { role } = state.user;

  const menuItems = [
    { component: <UserInfo />, title: "Informations" },
    { component: <div>User History</div>, title: "Vos commandes" },
    { component: <div>UserFavoris</div>, title: "Liste d'envie" },
  ];

  const [showContent, setShowContent] = useState(menuItems[0].title);
  const [menuItemIndex, setMenuItemIndex] = useState(0);
  const [singleImage, setSingleImage] = useState([]);

  const handleImageChange = (event) => {
    setSingleImage(event.target.files[0]);
  };

  const handleUpdateAvatar = async (e) => {
    e.preventDefault();

    console.log("trigger update");
  };

  return (
    <UserRoute>
      <div>
        <div>
          <div className="m-auto ">
            <div className="relative h-32">
              <div className=" overflow-hidden w-[100px] h-[100px] z-50 flex absolute justify-center items-center border-2 border-[#4b6cb7] rounded-full top-3 left-8">
                <div className="relative overflow-hidden w-[100px] h-[100px] bottom-0 bg-black rounded-full">
                  <Image
                    src={img1}
                    alt="Woman on computer"
                    layout="fill"
                    placeholder="blur"
                  />
                  <input
                    className="h-full w-full opacity-0 cursor-pointer"
                    type="file"
                    id="file"
                    name="file"
                    onChange={handleImageChange}
                  />
                </div>
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
            <div className="mx-auto w-[300px] md:w-1/5 flex flex-col rounded-lg bg-white h-max">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    setShowContent(item.title);
                    setMenuItemIndex(index);
                  }}
                  className={`w-full h-14 rounded-md duration-700 ${
                    showContent === item.title
                      ? "bg-[#62b3b4]"
                      : " bg-neutral-200"
                  } ${item.title === "Informations" ? "mt-0" : "mt-1"}`}
                >
                  {item.title}
                </button>
              ))}

              <Link href="/user-admin-panel">
                <button
                  className={`mt-1 w-full h-14 rounded-md duration-700  bg-neutral-200 ${
                    role && role.includes("Admin") ? "show" : "hidden"
                  } `}
                >
                  Admin Panel
                </button>
              </Link>
            </div>
            <div className=" md:w-3/4 m-auto mt-4 md:mt-0 min-w-[300px]">
              {menuItems[menuItemIndex].component}
            </div>
          </div>
        </div>
      </div>
    </UserRoute>
  );
};

export default Profile;
