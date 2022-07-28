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
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState("");
  const [image, setImage] = useState({});
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState({});

  const [uploadButtonText, setUploadButtonText] = useState("Upload image");

  const [inputValues, setInputValues] = useState({
    name: "",
    category: "",
    description: "",
    price: "9.99",
    uploading: false,
    paid: true,
    loading: false,
  });

  // Fonctions

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
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

        console.log(err);
      }
    }, 1000);
  };

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
        loading,
        handleChange,
        setInputValues,
        inputValues,
        handleImage,
        handleSubmit,
        preview,
        uploadButtonText,
        handleimageRemove,
        image,
        loadCourses,
        courses,
        loadSinglecourse,
        course,
      }}
    >
      {props.children}
    </InstructorContext.Provider>
  );
};
