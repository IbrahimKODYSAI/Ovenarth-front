import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import img1 from "../../public/img/carou1.jpg";
import CourseCard from "../cards/CourseCard";

const Main = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchcourses = async () => {
      const { data } = await axios.get("/api/courses");
      setCourses(data);
    };
    fetchcourses();
  }, []);
  return (
    <div>
      <div className="w-full h-[300px] bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br relative overflow-hidden">
        <div className="absolute bg-white top-20 left-8 p-8 flex flex-col items-satrt justify-center shadow-lg h-max w-max">
          <h2 className="text-3xl font-bold mb-2">
            Hello everyone welcome to OvenArth
          </h2>
          <h3 className="text-xl">
            Start learning greats courses in this placefoorm
          </h3>
          <h3 className="text-xl">take a look at the market place</h3>
        </div>
        <div className="float-right mr-32 font-bold">
          <p className=" text-[10rem]">OvernArth</p>
          <h1 className=" text-[2rem] mt-[-32px]">Learn with passion</h1>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex space-x-8 justify-center">
          {courses.map((item, index) => {
            return (
              <div key={index} className="w-[400px]">
                <CourseCard course={item} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Main;
