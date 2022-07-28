import React, { useContext, useEffect, useState } from "react";
import { CheckOutlined, EditOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

import { Select, Avatar, Tooltip } from "antd";
import Link from "next/link";
import { InstructorContext } from "../../../../contexts/InstructorContext";
import InstructorRoute from "../../../../Components/Routes/InstructorRoute";

const CourseView = () => {
  const { loadSinglecourse, course } = useContext(InstructorContext);

  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    loadSinglecourse(slug);
  }, [slug]);

  return (
    <InstructorRoute>
      <div>
        {course && (
          <div className="block md:flex  mt-4  align-middle">
            <Avatar
              // shape="square"
              size={80}
              src={course.image ? course.image.Location : "/course.png"}
            />

            <div className="md:mx-5 flex justify-between md:mt-0 w-full  pt-2">
              <div className=" flex-col justify-between h-max">
                <h5 className="text-lg text-blue-600">{course.name}</h5>

                <p className="mt-[-8px]">
                  {course.lessons && course.lessons.length} Lessons
                </p>
                {course.lessons && course.lessons.length < 5 ? (
                  <p className="mt-[-5px] text-red-500">
                    At least 5 lessons are required to publis a course
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

              <div className="mt-3 text-center flex space-x-4">
                <Tooltip title="Edit">
                  <EditOutlined className=" text-2xl cursor-pointer text-red-500" />
                </Tooltip>
                <Tooltip title="Publish">
                  <CheckOutlined className=" text-2xl cursor-pointer text-green-500" />
                </Tooltip>
              </div>
            </div>
          </div>
        )}
      </div>
    </InstructorRoute>
  );
};

export default CourseView;
