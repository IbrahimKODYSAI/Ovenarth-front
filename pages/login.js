import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Field from "../Components/Atoms/Field";
import { SyncOutlined } from "@ant-design/icons";

import { AuthContext } from "../contexts/AuthContext";

const Login = () => {
  const router = useRouter();
  const { inputValues, userLogin, loading, state, setSuccess } =
    useContext(AuthContext);

  const { email, password } = inputValues;
  const { username } = state.user;
  useEffect(() => {
    setSuccess(false);
    if (username !== "") router.push("/");
  }, [username, router, setSuccess]);

  return (
    <div className="w-[360px] my-[3em] mx-auto">
      <h1 className=" text-5xl font-bold mb-[2rem]">Log In</h1>
      <p className=" text-lg leading-6 my-[0.25em]">
        Fill all the fields to create a new account
      </p>
      <form className="form">
        <Field name="email" placeholder="Email *" type="email" value={email} />

        <Field
          name="password"
          placeholder="Password *"
          type="password"
          value={password}
        />
      </form>
      <button
        className=" text-lg uppercase h-14 w-full font-bold bg-[#1B1C1D] text-white"
        type="submit"
        onClick={() => userLogin()}
        disabled={!email || !password || loading}
      >
        {loading ? <SyncOutlined spin /> : "Log In"}
      </button>
      <p className="text-lg my-[1rem] text-center">
        Not Registered yet ?
        <Link href="/register">
          <a className=" text-[#0080FF]"> Register</a>
        </Link>
      </p>
      <p className="text-lg my-[1rem] text-center">
        <Link href="/forgot-password">
          <a className=" text-[#ff2600]"> Forgot password</a>
        </Link>
      </p>
    </div>
  );
};

export default Login;
