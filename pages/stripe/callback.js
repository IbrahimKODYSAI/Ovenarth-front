import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Button } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import { AuthContext } from "../../contexts/AuthContext";

const Callback = () => {
  const {
    state: { user },
    dispatch,
  } = useContext(AuthContext);

  useEffect(() => {
    if (user.username !== "") {
      axios
        .post("/api/get-account-status")
        .then((res) => {
          dispatch({
            type: "LOGIN",
            payload: res.data,
          });
          window.localStorage.setItem("user", JSON.stringify(res.data));
          window.location.href = "/instructor";
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }
  }, [user.username, dispatch]);

  return (
    <div>
      <div className=" h-32 border text-center bg-gradient-to-br from-sky-600 to-black">
        <h1 className="mx-auto mt-7 w-max  text-[2.5rem] font-bold text-white">
          Callback Course
        </h1>
      </div>
      <div className="m-auto text-center text-[12rem] ">
        <SyncOutlined className=" align-middle" spin />
      </div>
    </div>
  );
};

export default Callback;
