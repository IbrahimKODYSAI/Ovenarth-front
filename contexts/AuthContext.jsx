import React, { createContext, useEffect, useReducer, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

// initial state

const initialState = {
  user: {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
    avatar: "",
    role: ["admin"],
  },
};

export const AuthContext = createContext();

// root reducer

const rootReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };

    case "LOGOUT":
      return {
        ...state,
        user: {
          firstname: "",
          lastname: "",
          username: "",
          email: "",
          password: "",
          passwordConfirm: "",
          avatar: "",
          role: [""],
        },
      };

    default:
      return state;
  }
};

export const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  const router = useRouter();
  const current = router.pathname;

  const [loading, setLoading] = useState(false);
  const [hidden, setHidden] = useState(false);

  const [success, setSuccess] = useState(false);

  const [firstNameErrMsg, setFirstNameErrMsg] = useState("");
  const [lastNameErrMsg, setLastNameErrMsg] = useState("");

  const [inputValues, setInputValues] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    code: "",
    newPassword: "",
    newPasswordConfirm: "",
  });

  const handleErrorMsg = () => {
    const { firstName, lastName, userName, email, password, passwordConfirm } =
      inputValues;
    if (firstName && firstName.length <= 1) {
      setFirstNameErrMsg("firstname should have a minimum length of 3");
    } else {
      setFirstNameErrMsg("");
    }

    if (lastName && lastName.length > 0 && lastName.length < 6) {
      setLastNameErrMsg("Lastname should have a minimum length of 6");
    } else {
      setLastNameErrMsg("");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const createUser = async () => {
    setLoading(true);
    setTimeout(async () => {
      try {
        await axios({
          method: "POST",
          url: "/api/user/register",
          data: {
            firstname: inputValues.firstName,
            lastname: inputValues.lastName,
            username: inputValues.userName,
            email: inputValues.email,
            password: inputValues.password,
            passwordConfirm: inputValues.passwordConfirm,
          },
        });
        setInputValues({
          firstName: "",
          lastName: "",
          userName: "",
          email: "",
          password: "",
          passwordConfirm: "",
        });
        toast.success("Registration successfull. Please login");
        router.push("/login");
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error(error.response.data.error);
      }
    }, 1000);
  };

  const userLogin = async () => {
    setLoading(true);
    setTimeout(async () => {
      try {
        const response = await axios({
          method: "POST",
          url: "/api/user/login",
          data: {
            email: inputValues.email,
            password: inputValues.password,
          },
        });
        setInputValues({
          email: "",
          password: "",
        });
        getUserInfo();
        toast.success("Logged in successfully");
        router.push("/");
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error(error.response.data.error);
      }
    }, 1000);
  };

  const getUserInfo = async () => {
    try {
      const { data } = await axios({
        method: "GET",
        url: "/api/user/profile",
      });
      dispatch({
        type: "LOGIN",
        payload: data.user,
      });
      setHidden(false);
    } catch (err) {
      console.log("error");
    }
  };

  const logOut = async () => {
    dispatch({
      type: "LOGOUT",
    });
    const { data } = await axios({
      method: "GET",
      url: "api/user/logout",
    });
    setHidden(true);
    toast(data.message);
    router.push("/login");
  };

  const SendResetCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(async () => {
      try {
        const { data } = await axios({
          method: "POST",
          url: "/api/user/send-code",
          data: {
            email: inputValues.email,
          },
        });
        setLoading(false);
        setSuccess(true);
        toast.success("Please check your emails, we send you a reset code.");
      } catch (err) {
        setSuccess(false);
        setLoading(false);
        console.log(err);
        toast.error(err.response.data);
      }
    }, 1000);
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(async () => {
      try {
        const { data } = await axios({
          method: "POST",
          url: "/api/user/password-reset",
          data: {
            code: inputValues.code,
            email: inputValues.email,
            password: inputValues.newPassword,
            passwordConfirm: inputValues.newPasswordConfirm,
          },
        });
        setLoading(false);
        setInputValues({ email: "", code: "", newPassword: "" });
        toast.success("Password reset successfuly");
        router.push("/login");
      } catch (err) {
        setLoading(false);
        console.log(err);
        toast.error(err.response.data);
      }
    }, 1000);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  axios.interceptors.response.use(
    function (response) {
      //any status code that lie within the range of 2XX cause this function to trigger
      //to trigger
      return response;
    },
    function (error) {
      // any status code thats falls outside of the range of 2XX cause the function to trigger
      let res = error.response;
      if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
        return new Promise((resolve, reject) => {
          axios
            .get({
              method: "GET",
              url: "/api/user/logout",
            })
            .then((data) => {
              console.log("401 error > logout");
              dispatch({
                type: "LOGOUT",
              });
              router.push("/login");
            })
            .catch(async (err) => {
              console.log("AXIOS INTERCEPTORS ERROR", err);
            });
        });
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    const getCsrfToken = async () => {
      const { data } = await axios({
        method: "GET",
        url: "/api/csrf-token",
      });
      axios.defaults.headers["X-CSRF-Token"] = data.csrfToken;
    };
    getCsrfToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        inputValues,
        handleChange,
        createUser,
        userLogin,
        loading,
        current,
        firstNameErrMsg,
        handleErrorMsg,
        lastNameErrMsg,
        state,
        dispatch,
        getUserInfo,
        logOut,
        hidden,
        SendResetCode,
        resetPassword,
        setSuccess,
        success,
        setHidden,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

import "antd/dist/antd.css";
