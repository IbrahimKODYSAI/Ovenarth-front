import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";

import Link from "next/link";
import Field from "../Components/Atoms/Field";
import { AuthContext } from "../contexts/AuthContext";

import { SyncOutlined } from "@ant-design/icons";

const Register = () => {
  const router = useRouter();
  const {
    inputValues,
    createUser,
    loading,
    firstNameErrMsg,
    lastNameErrMsg,
    state,
  } = useContext(AuthContext);
  const { username } = state.user;

  const { firstName, lastName, userName, email, password, passwordConfirm } =
    inputValues;

  useEffect(() => {
    if (username !== "") router.push("/");
  }, [username, router]);
  return (
    <div className="w-[360px] my-[3em] mx-auto">
      <h1 className=" text-5xl font-bold mb-[2rem]">sign Up</h1>
      <p className=" text-lg leading-6 my-[0.25em]">
        Fill all the fields to create a new account
      </p>
      <form className="form">
        <Field
          name="firstName"
          placeholder="Firstname *"
          type="text"
          value={firstName}
          errorMsg={firstNameErrMsg}
        />
        <Field
          name="lastName"
          placeholder="Lastname *"
          type="text"
          value={lastName}
          textTransform="uppercase"
          errorMsg={lastNameErrMsg}
        />
        <Field
          name="userName"
          placeholder="Username *"
          type="text"
          value={userName}
        />
        <Field name="email" placeholder="Email *" type="email" value={email} />
        <Field
          name="password"
          placeholder="Password *"
          type="password"
          value={password}
        />
        <Field
          name="passwordConfirm"
          placeholder="Confirm password *"
          type="password"
          value={passwordConfirm}
        />
      </form>
      <button
        className={`text-lg uppercase h-14 w-full font-bold bg-[#1B1C1D] text-white ${
          loading ? "cursor-not-allowed" : ""
        }`}
        type="submit"
        onClick={() => createUser()}
        disabled={
          !firstName ||
          !lastName ||
          !userName ||
          !email ||
          !password ||
          !passwordConfirm ||
          loading
        }
      >
        {loading ? <SyncOutlined spin /> : "Register"}
      </button>

      <p className="text-lg my-[1rem] text-center">
        Allready Registered ?
        <Link href="/login">
          <a className=" text-[#0080FF]"> Login</a>
        </Link>
      </p>
    </div>
  );
};

export default Register;
