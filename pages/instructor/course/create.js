import React, { useContext, useEffect, useState } from "react";
import { SyncOutlined, SaveOutlined } from "@ant-design/icons";
import { Select } from "antd";
import { useRouter } from "next/router";
import InstructorRoute from "../../../Components/Routes/InstructorRoute";
import { InstructorContext } from "../../../contexts/InstructorContext";
import InstructorField from "../../../Components/Atoms/Field/InstructorField";
import CourseCreateForm from "../../../Components/Molecules/Forms/CourseCreateForm";

const { Option } = Select;

const Create = () => {
  const {
    setInputValues,
    inputValues,
    handleChange,
    handleImage,
    handleSubmit,
    image,
  } = useContext(InstructorContext);

  const { name, description, price, uploading, paid, loading, inmagePreview } =
    inputValues;

  return (
    <InstructorRoute>
      <div>
        <div className="text-center">
          <h1 className="mx-auto w-max text-[2.5rem] mt-8 font-bold text-white">
            Create Course
          </h1>
        </div>
        <div className="w-[80%] md:w-[450px] mx-auto">
          <CourseCreateForm />
        </div>
        <pre>{JSON.stringify(inputValues, null, 4)}</pre>
        <pre>{JSON.stringify(image, null, 4)}</pre>
      </div>
    </InstructorRoute>
  );
};

export default Create;
