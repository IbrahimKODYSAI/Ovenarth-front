import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

import { DeleteFilled } from "@ant-design/icons";
import { Avatar, Badge, List, Modal, Select } from "antd";
import Item from "antd/lib/list/Item";
import { toast } from "react-toastify";
import { InstructorContext } from "../../contexts/InstructorContext";
import ReactPlayer from "react-player";

const Course = ({}) => {
  const { loadSinglecourse, course } = useContext(InstructorContext);
  const router = useRouter();
  const { slug } = router.query;

  const {
    name,
    description,
    instructor,
    updatedAt,
    lesson,
    image,
    price,
    paid,
    category,
  } = course;

  useEffect(() => {
    loadSinglecourse(slug);
  }, [slug]);

  return (
    <div>
      <div className="h-[400px] bg-gradient-to-r from-blue-500 via-blue-800 to-black  p-8 md:flex justify-between">
        <div className="my-auto p-4 rounded-lg">
          <h1 className=" font-bold text-white text-5xl mt-8">
            {name && name.slice(0, 1) + name.slice(1).toLowerCase()}
          </h1>
          <p className="mt-8 text-2xl md:w-[1000px] w-[80%] text-white">
            {description && description.slice(6, 149).toLowerCase()}...
          </p>
          <Badge count={category} className="mt-4" />
          <p className="mt-2 text-white">
            Last update {new Date(updatedAt).toLocaleDateString()}
          </p>
          <h2 className="text-5xl mt-7 font-bold text-white">
            {price === 0 ? "FREE" : `${price} €"`}
          </h2>
        </div>
        <div className="text-white mr-24 mt-8">
          {lesson &&
          lesson[0].free_preview &&
          lesson[0].video &&
          lesson[0].video.Location ? (
            <div className=" rounded-md border-2 border-white p-1">
              <ReactPlayer
                url={lesson[0].video.Location}
                width="100%"
                height="225px"
                controls
              />
            </div>
          ) : (
            <div className="border-2 bordder-white rounded-md">
              <img
                src={image && image.Location}
                alt=""
                style={{ width: "100%", height: "225px" }}
                className=" rounded-md"
              />
            </div>
          )}
        </div>
      </div>
      <div className="my-8  lg:w-[70%] md:w-[80%] mx-auto">
        <h1 className="text-3xl font-bold">
          {course && course.lesson && course.lesson.length} Lessons
        </h1>
        <div className="font-bold">
          <List
            itemLayout="horizontal"
            dataSource={course && course.lesson}
            renderItem={(item, index) => (
              <div className="">
                <Item className="my-4  rounded-lg px-4 bg-blue-400 ">
                  <Avatar size={60} className="bg-white text-black">
                    {index + 1}
                  </Avatar>
                  <Item.Meta
                    className="ml-4"
                    title={item.title}
                    description={item.content}
                  ></Item.Meta>
                </Item>
              </div>
            )}
          ></List>
        </div>
      </div>
    </div>
  );
};

export default Course;
