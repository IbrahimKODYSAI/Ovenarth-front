import React, { createContext, useEffect, useReducer, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

// initial state

const initialState = {};

export const UserContext = createContext();

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

export const UserProvider = (props) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const current = router.pathname;

  const becomeInstructor = async () => {
    try {
      setLoading;
      const { data } = await axios({
        method: "POST",
        url: "/api/become-instructor",
      });
      window.location.href = data;
    } catch (err) {
      console.log(err.response.status);
      toast("Stripe onboarding failed. Please ry gain.");
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        state,
        dispatch,
        loading,
        becomeInstructor,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

import "antd/dist/antd.css";
