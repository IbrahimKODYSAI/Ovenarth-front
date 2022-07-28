import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Resizer from "react-image-file-resizer";

// initial state

const initialState = {};

export const InstructorContext = createContext();

// root reducer

const rootReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state };

    case "LOGOUT":
      return {
        ...state,
      };

    default:
      return state;
  }
};

export const InstructorProvider = (props) => {
  const router = useRouter();
  const current = router.pathname;

  // state management

  const [state, dispatch] = useReducer(rootReducer, initialState);
  const [preview, setPreview] = useState("");
  const [image, setImage] = useState({});
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState({});
  const [video, setVideo] = useState({});
  const [visible, setVisible] = useState(false);

  const [uploadButtonText, setUploadButtonText] = useState("Upload image");
  const [uploadVideoText, setUploadVideoText] = useState("Upload video");

  const [inputValues, setInputValues] = useState({
    name: "",
    category: "",
    description: "",
    price: "9.99",
    paid: true,
    uploading: false,
    loading: false,
  });
  const [inputLessonValues, setInputLessonValue] = useState({
    title: "",
    content: "",
    uploading: false,
    loading: false,
    videoProgress: 0,
  });

  // Fonctions

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleChangeLesson = (event) => {
    const { name, value } = event.target;
    setInputLessonValue({ ...inputLessonValues, [name]: value });
  };

  const handleImage = (e) => {
    setInputValues({ ...inputValues, loading: true });
    let file = e.target.files[0];

    setTimeout(() => {
      setPreview(window.URL.createObjectURL(file));
      setUploadButtonText(file.name);
      setInputValues({ ...inputValues, loading: true });

      Resizer.imageFileResizer(file, 720, 500, "JPEG", 100, 0, async (uri) => {
        try {
          let { data } = await axios.post("/api/course/upload-image", {
            image: uri,
          });
          setImage(data);
          setInputValues({ ...inputValues, loading: false });
        } catch (err) {
          console.log(err);
          setInputValues({ ...inputValues, loading: false });
          toast("Image upload failded, please try later.");
        }
      });
    }, 1000);
  };

  const handleVideo = async (e) => {
    setInputLessonValue({ ...inputLessonValues, uploading: true });
    let file = e.target.files[0];

    setTimeout(async () => {
      try {
        setUploadVideoText(file.name);

        const videoData = new FormData();
        videoData.append("video", file);

        const { data } = await axios.post(
          `/api/course/video-upload/${course.instructor._id}`,
          videoData,
          {
            onUploadProgress: (e) => {
              setInputLessonValue({
                ...inputLessonValues,
                videoProgress: Math.round((100 * e.loaded) / e.total),
              });
            },
          }
        );
        setVideo(data);
        setInputLessonValue({ ...inputLessonValues, uploading: false });
      } catch (err) {
        console.log(err);
        setInputLessonValue({ ...inputLessonValues, uploading: false });
        toast("Video upload failed.");
      }
    }, 1000);
  };

  const handleimageRemove = async () => {
    setInputValues({ ...inputValues, loading: true });
    setTimeout(async () => {
      try {
        const res = await axios({
          method: "POST",
          url: "/api/course/remove-image",
          data: {
            image,
          },
        });
        setImage({});
        setPreview("");
        setUploadButtonText("Upload image");
        setInputValues({ ...inputValues, loading: false });
      } catch (err) {
        setInputValues({ ...inputValues, loading: false });
        toast("Image removed.");
        console.log(err);
      }
    }, 1000);
  };

  const handleimageUpdate = async (slug) => {
    setInputValues({ ...inputValues, loading: true });
    setTimeout(async () => {
      try {
        const res = await axios({
          method: "POST",
          url: `/api/course/edit-image/${slug}`,
          data: {
            image,
          },
        });
        setImage({});
        setPreview("");
        setUploadButtonText("Upload image");
        setInputValues({ ...inputValues, loading: false });
      } catch (err) {
        setInputValues({ ...inputValues, loading: false });
        toast("Image edit failed.");
        console.log(err);
      }
    }, 1000);
  };
  const handleVideoRemove = async () => {
    try {
      await axios({
        method: "POST",
        url: `/api/course/remove-video/${course.instructor._id}`,
        data: { video },
      });
      setVideo({});
      setUploadVideoText("Upload Video");
    } catch (err) {
      toast("Video removed failed");
      console.log(err);
    }
  };
  // handleSubmit functions

  const handleSubmit = async (e) => {
    e.preventDefault();

    setInputValues({ ...inputValues, loading: true });
    setTimeout(async () => {
      try {
        const { data } = await axios({
          method: "POST",
          url: "/api/course/create",
          data: {
            ...inputValues,
            image,
          },
        });
        toast("Greate! Now you can start adding course lessons to your course");
        setInputValues({
          name: "",
          category: "",
          description: "",
          price: "",
          uploading: false,
          paid: true,
          loading: false,
        });
        router.push("/instructor");
      } catch (err) {
        setInputValues({ ...inputValues, loading: false });
        console.log(err);
      }
    }, 1000);
  };

  const handleSubmitLesson = async (slug) => {
    setInputLessonValue({ ...inputLessonValues, loading: true });
    setTimeout(async () => {
      try {
        const { data } = await axios({
          method: "POST",
          url: `/api/course/lesson/${slug}/${course.instructor._id}`,
          data: {
            ...inputLessonValues,
            video,
          },
        });
        setInputLessonValue({ ...inputLessonValues, title: "", content: "" });
        setVideo({});
        setVisible(false);
        setUploadVideoText("Upload video");
        setCourse(data);
        toast("Lesson added");
      } catch (err) {
        setInputLessonValue({ ...inputLessonValues, loading: false });
        console.log(err);
      }
    }, 1000);
  };

  const handleUpdateSubmit = async (slug) => {
    setInputValues({ ...inputValues, loading: true });
    setTimeout(async () => {
      try {
        const { data } = await axios({
          method: "PUT",
          url: `/api/course/edit/${slug}`,
          data: {
            ...inputValues,
            image,
          },
        });
        toast("Course updated");
        setInputValues({
          name: "",
          category: "",
          description: "",
          price: "",
          uploading: false,
          paid: true,
          loading: false,
        });
        router.push("/instructor");
      } catch (err) {
        setInputValues({ ...inputValues, loading: false });
        console.log(err);
      }
    }, 1000);
  };

  // loading functions

  const loadCourses = async () => {
    const { data } = await axios.get("/api//instructor-courses");
    setCourses(data);
  };

  const loadSinglecourse = async (slug) => {
    try {
      const { data } = await axios({
        method: "GET",
        url: `/api/course/${slug}`,
      });
      setCourse(data);
      setInputValues({
        ...inputValues,
        name: data.name,
        category: data.category,
        description: data.description,
        price: data.price,
        uploading: data.uploading,
        paid: data.paid,
        loading: data.loading,
      });
      setImage(data.image);
    } catch (err) {
      console.log(err);
    }
  };

  // render

  return (
    <InstructorContext.Provider
      value={{
        state,
        dispatch,
        handleChange,
        setInputValues,
        inputValues,
        handleImage,
        handleSubmit,
        preview,
        uploadButtonText,
        uploadVideoText,
        handleimageRemove,
        image,
        video,
        loadCourses,
        courses,
        loadSinglecourse,
        course,
        handleChangeLesson,
        inputLessonValues,
        handleSubmitLesson,
        handleVideo,
        handleVideoRemove,
        handleUpdateSubmit,
        visible,
        setVisible,
        handleimageUpdate,
      }}
    >
      {props.children}
    </InstructorContext.Provider>
  );
};
