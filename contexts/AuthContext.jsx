import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import ApiURI from "./Api/api";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const router = useRouter();
  const current = router.pathname;
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [inputValues, setInputValues] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const createUser = async () => {
    try {
      setLoading(true);
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
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data);
      setLoading(false);
    }
  };

  const userLogin = async () => {
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
      toast.success("Logged in successfully");
      setToken(response.data.token);
      sessionStorage.setItem("token", JSON.stringify(token));
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        inputValues,
        handleChange,
        createUser,
        userLogin,
        loading,
        current,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
