import React, { useContext } from "react";
import Link from "next/link";
import Field from "../Components/Atoms/Field";
import { AuthContext } from "../contexts/AuthContext";

const Register = () => {
  const { inputValues } = useContext(AuthContext);

  const lastName = inputValues.lastName.toUpperCase();

  console.log(inputValues.firstName);
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
          value={inputValues.firstName}
        />
        <Field
          name="lastName"
          placeholder="lastname *"
          type="text"
          value={lastName}
          textTransform="uppercase"
        />
        <Field
          name="birthdate"
          placeholder="birthdate *"
          type="date"
          value={inputValues.birthdate}
        />
        <Field
          name="userName"
          placeholder="username *"
          type="text"
          value={inputValues.userName}
        />
        <Field
          name="email"
          placeholder="email *"
          type="email"
          value={inputValues.email}
        />
        <Field
          name="password"
          placeholder="password *"
          type="password"
          value={inputValues.password}
        />
        <Field
          name="country"
          placeholder="country *"
          type="text"
          value={inputValues.country}
        />
        <button
          className=" text-lg uppercase h-14 w-full font-bold bg-[#1B1C1D] text-white"
          type="submit"
        >
          Register
        </button>
        <Link href="/login">
          <p className=" text-[#aaa8a6] cursor-pointer text-lg my-[1rem] text-center underline underline-offset-2">
            Allready Registered ?
          </p>
        </Link>
      </form>
    </div>
  );
};

export default Register;
