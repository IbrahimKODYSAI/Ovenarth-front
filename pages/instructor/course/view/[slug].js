import React, { useContext, useEffect, useState } from "react";
import { CheckOutlined, EditOutlined, UploadOutlined } from "@ant-design/icons";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/router";

import { Select, Avatar, Tooltip, Button, Modal, List, Menu } from "antd";
import Link from "next/link";
import { InstructorContext } from "../../../../contexts/InstructorContext";
import InstructorRoute from "../../../../Components/Routes/InstructorRoute";
import AddLessonForm from "../../../../Components/Molecules/Forms/AddLessonForm";

const CourseView = () => {
  const { loadSinglecourse, course, visible, setVisible } =
    useContext(InstructorContext);

  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    loadSinglecourse(slug);
  }, [slug]);

  const { Item } = List;

  return (
    <InstructorRoute>
      <div>
        {course && (
          <div>
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
                    {course.lesson && course.lesson.length} Lessons
                  </p>
                  {course.lesson && course.lesson.length < 5 ? (
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

                <div className="mt-3 text-center flex space-x-4">
                  <Tooltip title="Edit">
                    <EditOutlined
                      className=" text-2xl cursor-pointer text-red-500"
                      onClick={() =>
                        router.push(`/instructor/course/edit/${slug}`)
                      }
                    />
                  </Tooltip>
                  <Tooltip title="Publish">
                    <CheckOutlined className=" text-2xl cursor-pointer text-green-500" />
                  </Tooltip>
                </div>
              </div>
            </div>
            <div className="my-8">
              <ReactMarkdown>{course.description}</ReactMarkdown>
            </div>
            <div>
              <Button
                onClick={() => setVisible(true)}
                className="h-10 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br rounded-md"
                type="primary"
                size="large"
              >
                <div className="flex space-x-2">
                  <UploadOutlined className=" flex items-center" />
                  <span> Add lesson</span>
                </div>
              </Button>
            </div>
            <Modal
              title=" + Add lesson"
              centered
              visible={visible}
              footer={null}
              onCancel={() => setVisible(false)}
            >
              <AddLessonForm slug={slug} />
            </Modal>
            <div className="my-8  lg:w-[70%] md:w-[80%]">
              <h1 className="text-3xl font-bold">
                {course && course.lesson && course.lesson.length} Lessons
              </h1>
              <div className="font-bold">
                <List
                  itemLayout="horizontal"
                  dataSource={course && course.lesson}
                  renderItem={(item, index) => (
                    <div className="">
                      <Item className="my-4 bg-white rounded-lg px-4">
                        <Avatar size={60} className="bg-blue-400">
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
        )}
      </div>
    </InstructorRoute>
  );
};

export default CourseView;
