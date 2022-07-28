import React, { useContext, useEffect, useState } from "react";
import { SyncOutlined, SaveOutlined } from "@ant-design/icons";
import { Select } from "antd";
import { useRouter } from "next/router";
import InstructorRoute from "../../../../Components/Routes/InstructorRoute";
import { InstructorContext } from "../../../../contexts/InstructorContext";
import AddLessonForm from "../../../../Components/Molecules/Forms/AddLessonForm";
import CourseCreateForm from "../../../../Components/Molecules/Forms/CourseCreateForm";

const { Option } = Select;

const Create = () => {
  const { inputValues, image, loadSinglecourse, courses } =
    useContext(InstructorContext);

  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    loadSinglecourse(slug);
  }, [slug]);

  return (
    <InstructorRoute>
      <div>
        <div className="text-center">
          <h1 className="mx-auto w-max text-[2.5rem] mt-8 font-bold text-white">
            Update course
          </h1>
        </div>
        <div className="w-[80%] md:w-[450px] mx-auto">
          <CourseCreateForm editPage={true} slug={slug} />
        </div>
      </div>
    </InstructorRoute>
  );
};

export default Create;
