import React, { useContext } from "react";
import Link from "next/link";
import Field from "../Components/Atoms/Field";
import { AuthContext } from "../contexts/AuthContext";

const Login = () => {
  const { inputValues, userLogin } = useContext(AuthContext);

  return (
    <div className="w-[360px] my-[3em] mx-auto">
      <h1 className=" text-5xl font-bold mb-[2rem]">Log In</h1>
      <p className=" text-lg leading-6 my-[0.25em]">
        Fill all the fields to create a new account
      </p>
      <form className="form">
        <Field
          name="email"
          placeholder="Email *"
          type="email"
          value={inputValues.email}
        />
        <Field
          name="password"
          placeholder="Password *"
          type="password"
          value={inputValues.password}
        />
      </form>
      <button
        className=" text-lg uppercase h-14 w-full font-bold bg-[#1B1C1D] text-white"
        type="submit"
        onClick={() => userLogin()}
      >
        Log In
      </button>
      <Link href="/register">
        <p className=" text-[#aaa8a6] cursor-pointer text-lg my-[1rem] text-center underline underline-offset-2">
          No account yet ?
        </p>
      </Link>
    </div>
  );
};

export default Login;
