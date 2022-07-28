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
import { AuthContext } from "./AuthContext";

// initial state

const initialState = {};

export const UserContext = createContext();

// root reducer

const rootReducer = (state2, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state2 };

    case "LOGOUT":
      return {
        ...state2,
      };

    default:
      return state2;
  }
};

export const UserProvider = (props) => {
  const [state2, dispatch] = useReducer(rootReducer, initialState);

  const [loading, setLoading] = useState(false);

  const { state } = useContext(AuthContext);

  const router = useRouter();
  const current = router.pathname;

  const becomeInstructor = async () => {
    if (state.user.username !== "") {
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
    } else {
      router.push("/login");
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
