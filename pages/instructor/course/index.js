import React, { useContext, useEffect, useState } from "react";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Select, Avatar } from "antd";
import Link from "next/link";

import { useRouter } from "next/router";
import InstructorRoute from "../../../Components/Routes/InstructorRoute";
import { InstructorContext } from "../../../contexts/InstructorContext";
import { toast } from "react-toastify";
import axios from "axios";

const { Option } = Select;

const Course = () => {
  const { loadCourses, courses, setCourse } = useContext(InstructorContext);

  useEffect(() => {
    loadCourses();
  }, []);

  const handlePublish = async (e, courseId) => {
    try {
      let answer = window.confirm(
        "Once you publish your course, it will not be available for user to enroll"
      );
      if (!answer) return;

      const { data } = await axios.put(`/api/course/publish/${courseId}`);

      setCourse(data);
      toast("congrats! your course is now live");
    } catch (err) {
      toast("Course publish failed, please try again");
    }
  };

  const handleUnPublish = async (e, courseId) => {
    try {
      let answer = window.confirm(
        "Once you publish your course, it will not be available for user to enroll"
      );
      if (!answer) return;

      const { data } = await axios.put(`/api/course/unpublish/${courseId}`);

      setCourse(data);
      toast("Your course is unpublished");
    } catch (err) {
      toast("Course unpublish failed, please try again");
    }
  };
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
                <div
                  key={index}
                  className="block md:flex  mt-4  align-middle border-b-2 border-white p-4 bg-white rounded-lg hover:bg-blue-400 font-bold"
                >
                  <Link href={`/instructor/course/view/${course.slug}`}>
                    <Avatar
                      // shape="square"
                      className=" cursor-pointer border-2 border-blue-500"
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
                      <p className="">{course.lesson.length} Lesson</p>
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
                        <div
                          className="flex space-x-4 font-bold bg-gray-300 py-4 px-2 rounded-lg cursor-pointer w-[180px]"
                          onClick={(e) => handleUnPublish(e, course._id)}
                        >
                          <p>Click to Unpublish</p>
                          <CloseCircleOutlined className=" text-2xl cursor-pointer text-red-500 flex items-center" />
                        </div>
                      ) : (
                        <div
                          className={`flex justify-between space-x-4 font-bold bg-green-400 py-4 px-2 rounded-lg text-black w-[180px] ${
                            course.lesson.length < 5
                              ? " cursor-not-allowed"
                              : "cursor-pointer"
                          }`}
                          onClick={(e) => handlePublish(e, course._id)}
                        >
                          <div>
                            {course.lesson.length < 5 ? (
                              <p>{5 - course.lesson.length} to publish</p>
                            ) : (
                              <p>Click to publish</p>
                            )}
                          </div>

                          <CheckCircleOutlined className=" text-2xl cursor-pointer text-black align-middle flex items-center" />
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
