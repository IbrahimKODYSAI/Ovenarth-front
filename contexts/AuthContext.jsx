import React, { createContext, useEffect, useState } from "react";
import PokemonApi from "./Api/api";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [inputValues, setInputValues] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    country: "",
    birthdate: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  return (
    <AuthContext.Provider value={{ inputValues, handleChange }}>
      {props.children}
    </AuthContext.Provider>
  );
};
