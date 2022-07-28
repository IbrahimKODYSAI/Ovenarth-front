import React, { useContext, useEffect, useState } from "react";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Select, Avatar } from "antd";
import Link from "next/link";

import { useRouter } from "next/router";
import InstructorRoute from "../../../Components/Routes/InstructorRoute";
import { InstructorContext } from "../../../contexts/InstructorContext";

const { Option } = Select;

const Course = () => {
  const { loadCourses, courses } = useContext(InstructorContext);

  useEffect(() => {
    loadCourses();
  }, []);
  return (
    <InstructorRoute>
      <div className="">
        <div className="text-center">
          <h1 className="mx-auto w-max text-[2.5rem] mt-8 font-bold text-white">
            Courses
          </h1>
        </div>
        <div className="">
          {courses &&
            courses.map((course, index) => {
              return (
                <div key={index} className="block md:flex  mt-4  align-middle">
                  <Link href={`/instructor/course/view/${course.slug}`}>
                    <Avatar
                      // shape="square"
                      className=" cursor-pointer"
                      size={80}
                      src={course.image ? course.image.Location : "/course.png"}
                    />
                  </Link>

                  <div className="md:mx-5 flex justify-between md:mt-0 w-full  pt-2">
                    <div className=" flex-col justify-between h-max">
                      <Link href={`/instructor/course/view/${course.slug}`}>
                        <a>
                          <div className="flex">
                            <h5 className="text-lg text-blue-600">
                              {course.name}
                            </h5>
                            <h5 className="text-lg text-black ml-4 font-bold">
                              {course && course.price === 0
                                ? "FREE"
                                : `${course.price} €`}
                            </h5>
                          </div>
                        </a>
                      </Link>
                      <p className="mt-[-8px]">{course.lesson.length} Lesson</p>
                      {course.lesson.length < 5 ? (
                        <p className="mt-[-5px] text-red-500">
                          At least 5 lessons are required to publish a course
                        </p>
                      ) : course.published ? (
                        <p className="mt-[-5px] text-green-500">
                          Your course is live in the market place
                        </p>
                      ) : (
                        <p className="mt-[-5px] text-green-500">
                          Your courses is ready to be published
                        </p>
                      )}
                    </div>

                    <div className="mt-3 text-center">
                      {course.published ? (
                        <div>
                          <CheckCircleOutlined className=" text-2xl cursor-pointer text-green-500" />
                        </div>
                      ) : (
                        <div>
                          <CloseCircleOutlined className=" text-2xl cursor-pointer text-red-500" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </InstructorRoute>
  );
};

export default Course;
