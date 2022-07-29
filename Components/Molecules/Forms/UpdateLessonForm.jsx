import React, { useContext, useEffect, useState } from "react";
import { SyncOutlined, CloseCircleFilled } from "@ant-design/icons";
import { Select, Avatar, Badge, Progress, Tooltip, Switch } from "antd";
import { useRouter } from "next/router";
import InstructorField from "../../Atoms/Field/InstructorField";
import ReactPlayer from "react-player";

const { Option } = Select;

const UpdateLessonForm = ({
  current,
  setCurrent,
  handleUpdateLesson,
  handleVideo2,
  uploadVideoBtnText,
  progress,
  uploading,
  loading,
  setLoading,
  visible,
}) => {
  const children = [];

  for (let i = 9.99; i <= 100; i++) {
    children.push(<Option key={i.toFixed(2)}>$ {i.toFixed(2)}</Option>);
  }
  return (
    <div>
      <form onSubmit={handleUpdateLesson}>
        <div>
          <InstructorField
            name="title"
            placeholder="Title *"
            type="text"
            value={current.title}
            borderColor="#2F4F4F"
            border={true}
            onChange={(e) => setCurrent({ ...current, title: e.target.value })}
          />
          <div className="my-[1rem]">
            <textarea
              onChange={(e) =>
                setCurrent({ ...current, content: e.target.value })
              }
              name="content"
              value={current.content}
              id=""
              rows="4"
              className="w-full p-2 rounded-md focus:outline-[#82d2dc] border  border-black"
            ></textarea>
          </div>
        </div>
        <div className="block md:flex py-[1rem]">
          <div className="w-full">
            <div className="relative">
              <button className="cursor-pointer bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-md text-sm text-center py-2 px-4 inline-flex items-center w-full text-white z-50">
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
                <label className="ml-2 cursor-pointer">
                  {uploadVideoBtnText}
                </label>
              </button>
              <input
                className="absolute block h-[37px] w-full top-0 right-0 opacity-0 cursor-pointer"
                type="file"
                name="uploading"
                accept="video/*"
                onChange={handleVideo2}
              />
            </div>
          </div>
        </div>
        {!uploading && current.video && current.video.data && (
          <div className="cursor-pointer pt-2 flex justify-center">
            <ReactPlayer
              url={current.video.data.Location}
              width="420px"
              height="240px"
              controls
            />
          </div>
        )}

        {progress > 0 && (
          <Progress
            className="flex justify-center "
            percent={progress}
            steps={10}
          />
        )}

        <div className=" flex justify-end space-x-4 align-middle">
          <span className="pt-[0.5rem]">Preview</span>
          <Switch
            className={`  mt-2 ${
              current.free_preview ? "bg-blue-400" : "bg-gray-500"
            }`}
            disabled={uploading}
            defaultChecked={current.free_preview}
            name="free_preview"
            onChange={(v) => setCurrent({ ...current, free_preview: v })}
          />
        </div>
        <button
          onClick={(e) => handleUpdateLesson(e)}
          disabled={loading || uploading}
          className={` ${
            loading ? "cursor-not-allowed" : "cursor-pointer"
          } w-[50%] cursor-pointer text-white  focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm h-12 text-center ${
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
            "Save & continue"
          )}
        </button>
      </form>
    </div>
  );
};

export default UpdateLessonForm;
