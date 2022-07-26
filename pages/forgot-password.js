import React, { useContext, useEffect } from "react";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { AuthContext } from "../contexts/AuthContext";
import Field from "../Components/Atoms/Field";

const ForgotPassword = () => {
  const router = useRouter();

  const {
    loading,
    state,
    inputValues,
    SendResetCode,
    resetPassword,
    success,
    setSuccess,
  } = useContext(AuthContext);
  const { username } = state.user;
  const { email, code, newPAssword, newPasswordConfirm } = inputValues;

  useEffect(() => {
    if (username !== "") router.push("/");
  }, [username, router]);

  return (
    <div className="w-[360px] my-[3em] mx-auto">
      <h1 className=" text-5xl font-bold mb-[2rem]">Reset password</h1>
      <form className="form" onSubmit={success ? resetPassword : SendResetCode}>
        {!success && (
          <div>
            <p className=" text-lg leading-6 my-[0.25em]">
              Enter your email account and we will send you a reset code
            </p>
            <Field
              name="email"
              placeholder="Email"
              type="email"
              value={inputValues.email}
            />
          </div>
        )}

        {success && (
          <div>
            <p className=" text-lg leading-6 my-[0.25em]">
              {"Enter the code we've send to your email"}
            </p>
            <p
              onClick={() => {
                setSuccess(false);
              }}
              className="text-blue-700 underline cursor-pointer"
            >
              Resend the code
            </p>
            <Field
              name="code"
              placeholder="Enter the received code"
              type="text"
              value={code}
            />
            <Field
              name="newPassword"
              placeholder="Enter your new password"
              type="password"
              value={newPAssword}
            />
            <Field
              name="newPasswordConfirm"
              placeholder="Confirm the password"
              type="password"
              value={newPasswordConfirm}
            />
          </div>
        )}
        <button
          className=" text-lg uppercase h-14 w-full font-bold bg-[#1B1C1D] text-white"
          type="submit"
          disabled={!email || loading}
        >
          {loading ? <SyncOutlined spin /> : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
