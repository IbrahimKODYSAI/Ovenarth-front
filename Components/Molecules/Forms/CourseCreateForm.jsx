import React, { useContext, useEffect, useState } from "react";
import { SyncOutlined, SaveOutlined } from "@ant-design/icons";
import { Select, Avatar, Badge } from "antd";
import { useRouter } from "next/router";
import InstructorField from "../../Atoms/Field/InstructorField";
import { InstructorContext } from "../../../contexts/InstructorContext";
import { imageConfigDefault } from "next/dist/shared/lib/image-config";

const { Option } = Select;

const CourseCreateForm = (props) => {
  const {
    setInputValues,
    inputValues,
    handleChange,
    handleImage,
    handleSubmit,
    preview,
    uploadButtonText,
    handleimageRemove,
    handleimageUpdate,
    handleUpdateSubmit,
    image,
  } = useContext(InstructorContext);
  const { name, description, uploading, paid, loading, category, price } =
    inputValues;
  const children = [];

  for (let i = 9.99; i <= 100; i++) {
    children.push(<Option key={i.toFixed(2)}>$ {i.toFixed(2)}</Option>);
  }
  const freeOption = () => {
    if (paid) {
      setInputValues({
        ...inputValues,
        paid: false,
        price: 0,
      });
    }
    if (!paid) {
      setInputValues({ ...inputValues, paid: true, price: "9.99" });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <InstructorField
            name="name"
            placeholder="Name *"
            type="text"
            value={name}
            onChange={handleChange}
          />
          <InstructorField
            name="category"
            placeholder="Category *"
            type="text"
            value={category}
            onChange={handleChange}
          />
        </div>
        <div className="my-[1rem]">
          <textarea
            onChange={(event) => handleChange(event)}
            placeholder="Description"
            name="description"
            value={description}
            id=""
            rows="7"
            className="w-full p-2 rounded-md focus:outline-[#82d2dc]"
          ></textarea>
        </div>
        <div className="flex">
          <Select
            style={{ width: "100%" }}
            value={paid}
            size="large"
            onChange={(v) => freeOption()}
          >
            <Option value={true}>Paid</Option>
            <Option value={false}>Free</Option>
          </Select>
          {paid && (
            <div>
              <Select
                name="price"
                defaultValue={price}
                size="large"
                tokenSeparators={[,]}
                onChange={(v) => setInputValues({ ...inputValues, price: v })}
              >
                {children}
              </Select>
            </div>
          )}
        </div>
        <div className="my-[1rem]">
          <div className="relative">
            <button className="cursor-pointer bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-md text-sm text-center py-3 px-4 inline-flex items-center w-full text-white z-50">
              <svg
                fill="#FFF"
                height="18"
                viewBox="0 0 24 24"
                width="18"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" />
              </svg>
              <label className="ml-2 cursor-pointer overflow-hidden text-justify">
                {uploadButtonText.slice(0, 45)}...
              </label>
            </button>
            <input
              className="absolute block h-[37px] w-full top-0 right-0 opacity-0 cursor-pointer"
              type="file"
              name="uploading"
              accept="image/*"
              onChange={(e) => handleImage(e)}
            />
          </div>
        </div>
        {preview && (
          <div className="mb-3">
            <Badge
              count="X"
              onClick={() => handleimageUpdate(props.slug)}
              className=" cursor-pointer"
            >
              <Avatar width={200} src={preview} shape="square" size={64} />
            </Badge>
          </div>
        )}
        {image && image.length > 0 && props.editPage && !preview && (
          <div className="mb-3">
            <Badge
              count="X"
              onClick={handleimageRemove}
              className=" cursor-pointer"
            >
              <Avatar
                width={200}
                src={image && image.Location}
                shape="square"
                size={64}
              />
            </Badge>
          </div>
        )}

        {props.editPage ? (
          <button
            onClick={() => handleUpdateSubmit(props.slug)}
            disabled={loading || uploading}
            className={` w-[50%] cursor-pointer text-white  focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm h-12 text-center ${
              loading
                ? "bg-gray-500"
                : "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br"
            }`}
          >
            {loading ? (
              <div className="w-full">
                <SyncOutlined spin className=" align-middle mr-2" />
                Saving...
              </div>
            ) : (
              "Update and continue"
            )}
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={loading || uploading}
            className={` w-[50%] cursor-pointer text-white  focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm h-12 text-center ${
              loading
                ? "bg-gray-500"
                : "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br"
            }`}
          >
            {loading ? (
              <div className="w-full">
                <SyncOutlined spin className=" align-middle mr-2" />
                Saving...
              </div>
            ) : (
              "Save and contitue"
            )}
          </button>
        )}
      </form>
    </div>
  );
};

export default CourseCreateForm;
