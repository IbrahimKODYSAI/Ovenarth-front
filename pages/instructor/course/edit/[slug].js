import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { DeleteFilled } from "@ant-design/icons";
import { Avatar, List, Modal, Select } from "antd";
import { useRouter } from "next/router";
import InstructorRoute from "../../../../Components/Routes/InstructorRoute";
import { InstructorContext } from "../../../../contexts/InstructorContext";
import CourseCreateForm from "../../../../Components/Molecules/Forms/CourseCreateForm";
import Item from "antd/lib/list/Item";
import { toast } from "react-toastify";
import UpdateLessonForm from "../../../../Components/Molecules/Forms/UpdateLessonForm";

const { Option } = Select;

const CourseEdit = () => {
  const {
    inputValues,
    image,
    loadSinglecourse,
    courses,
    course,
    setCourse,
    setInputValues,
  } = useContext(InstructorContext);

  // state for update

  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState({});
  const [uploadVideoBtnText, setUploadVideoBtnText] = useState("Upload video");
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log(current);

  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    loadSinglecourse(slug);
  }, [slug]);

  const handleDrage = (e, index) => {
    // console.log("on drag", index);
    e.dataTransfer.setData("itemIndex", index);
  };
  const handleDrop = async (e, index) => {
    // console.log("on drop", index);

    const movingItemIndex = e.dataTransfer.getData("itemIndex");
    const targetItemIndex = index;
    let allLessons = course.lesson;

    let movingITem = allLessons[movingItemIndex];
    allLessons.splice(movingItemIndex, 1); // remove
    allLessons.splice(targetItemIndex, 0, movingITem); // remove
    setCourse({ ...course, lesson: [...allLessons] });

    const { data } = await axios({
      method: "PUT",
      url: `/api/course/edit/${slug}`,
      data: {
        ...inputValues,
        image,
        course,
      },
    });
  };

  const handleDelete = async (index) => {
    const answer = window.confirm(
      "Are you sure you want to delete this lesson ?"
    );
    if (!answer) return;
    let allLessons = course.lesson;
    const removed = allLessons.splice(index, 1);
    setCourse({ ...course, lesson: allLessons });
    const { data } = await axios.put(`/api/course/${slug}/${removed[0]._id}`);
    console.log(data);
  };

  const handleVideo2 = async (e) => {
    if (current.video && current.video.Location) {
      const res = await axios.post(
        `/api/course/remove-video/${course.instructor._id}`,
        current
      );
    }

    const file = e.target.files[0];

    setUploadVideoBtnText(file.name);
    setUploading(true);

    const videoData = new FormData();
    videoData.append("video", file);

    const data = await axios.post(
      `/api/course/video-upload/${course.instructor._id}`,
      videoData,
      {
        onUploadProgress: (e) => {
          setProgress(Math.round((100 * e.loaded) / e.total));
        },
      }
    );
    console.log(data);
    setCurrent({ ...current, video: data.video });
    setUploading(false);
  };

  const handleUpdateLesson = async (e) => {
    e.preventDefault();
    const { data } = await axios.put(
      `/api/course/lesson/${slug}/${current._id}`,
      current
    );
    setUploadVideoBtnText("Upload video");
    setVisible(false);

    if (data.ok) {
      let arr = course.lesson;
      const index = arr.findIndex((el) => el._id === current._id);
      arr[index] = current;
      setInputValues({ ...inputValues, lessons: arr });
      toast("Lesson updated");
    }
  };
  return (
    <InstructorRoute>
      <div>
        <div className="text-center">
          <h1 className="mx-auto w-max text-[2.5rem] mt-8 font-bold text-white">
            Update course
          </h1>
        </div>
        <div className="w-[80%] md:w-[550px] mx-auto">
          <CourseCreateForm editPage={true} slug={slug} />
        </div>
        <hr className="my-8" />
        <div className="my-8  lg:w-[70%] md:w-[80%] mx-auto">
          <h1 className="text-3xl font-bold">
            {course && course.lesson && course.lesson.length} Lessons
          </h1>
          <hr />
          <div className="font-bold ">
            <List
              onDragOver={(e) => e.preventDefault()}
              itemLayout="horizontal"
              dataSource={course ? course.lesson : ["empty"]}
              renderItem={(item, index) => (
                <div className="">
                  <Item
                    className="my-4 bg-white rounded-lg px-4 hover:bg-blue-400 group cursor-pointer"
                    draggable
                    onDragStart={(e) => handleDrage(e, index)}
                    onDrop={(e) => handleDrop(e, index)}
                  >
                    <Avatar
                      size={60}
                      className="bg-blue-400 group-hover:bg-white group-hover:text-black"
                    >
                      {index + 1}
                    </Avatar>
                    <Item.Meta
                      onClick={() => {
                        setVisible(true);
                        setCurrent(item);
                      }}
                      className="ml-4"
                      title={item.title}
                      description={item.content}
                    ></Item.Meta>
                    <DeleteFilled
                      onClick={() => handleDelete(index, item)}
                      className="text-red-400 text-xl "
                    />
                  </Item>
                </div>
              )}
            ></List>
          </div>
        </div>
        <Modal
          title="Update lesson"
          centered
          visible={visible}
          onCancel={() => setVisible(false)}
          footer={false}
        >
          <UpdateLessonForm
            current={current}
            setCurrent={setCurrent}
            handleVideo2={handleVideo2}
            uploadVideoBtnText={uploadVideoBtnText}
            handleUpdateLesson={handleUpdateLesson}
            loading={loading}
            setLoading={setLoading}
            progress={progress}
            uploading={uploading}
            visible={visible}
          />
        </Modal>
      </div>
    </InstructorRoute>
  );
};

export default CourseEdit;
