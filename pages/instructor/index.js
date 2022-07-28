import React, { useContext, useEffect, useState } from "react";
import { SyncOutlined, SaveOutlined } from "@ant-design/icons";
import { Select } from "antd";
import { useRouter } from "next/router";
import InstructorRoute from "../../Components/Routes/InstructorRoute";
import { InstructorContext } from "../../contexts/InstructorContext";

const { Option } = Select;

const Create = () => {
  const {
    setInputValues,
    inputValues,
    handleChange,
    handleImage,
    handleSubmit,
    image,
    loadCourses,
    courses,
  } = useContext(InstructorContext);

  const { name, description, price, uploading, paid, loading, inmagePreview } =
    inputValues;

  useEffect(() => {
    loadCourses();
  }, []);

  return (
    <InstructorRoute>
      <div>
        <div className="text-center">
          <h1 className="mx-auto w-max text-[2.5rem] mt-8 font-bold text-white">
            Instructor
          </h1>
        </div>
        <pre>{JSON.stringify(courses, null, 4)}</pre>
      </div>
    </InstructorRoute>
  );
};

export default Create;
