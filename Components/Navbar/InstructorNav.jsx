import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const menuItems = [
  { title: "Instructor home", location: "/instructor" },
  { title: "Create", location: "/instructor/course/create" },
  { title: "Courses", location: "/instructor/course" },
  { title: "Manage courses", location: "/instructor/course/manage" },
];

const InstructorNav = () => {
  const router = useRouter();
  const [showContent, setShowContent] = useState(router.pathname);
  const [singleImage, setSingleImage] = useState([]);

  const handleImageChange = (event) => {
    setSingleImage(event.target.files[0]);
  };

  const handleUpdateAvatar = async (e) => {
    e.preventDefault();

    console.log("trigger update");
  };

  useEffect(() => {
    setShowContent(router.pathname);
  }, [router.pathname]);

  return (
    <div className="mx-auto w-[300px] md:w-1/5 flex flex-col rounded-lg bg-white h-max">
      {menuItems.map((item, index) => (
        <button
          key={index}
          onClick={(e) => {
            e.preventDefault();
            setShowContent(item.title);
          }}
          className={`w-full h-14 rounded-md duration-700 ${
            showContent === item.location ? "bg-[#62b3b4]" : " bg-neutral-200"
          } ${item.title === "Instructor home" ? "mt-0" : "mt-1"} `}
        >
          <Link href={item.location}>
            <div className="h-full flex flex-col">
              <p className="m-auto">{item.title}</p>
            </div>
          </Link>
        </button>
      ))}
    </div>
  );
};

export default InstructorNav;
