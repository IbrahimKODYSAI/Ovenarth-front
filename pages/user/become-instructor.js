import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

import { Button } from "antd";
import {
  SettingOutlined,
  UserSwitchOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { UserContext } from "../../contexts/UserContext";

const BecomeInstructor = () => {
  const {
    state: { user },
  } = useContext(AuthContext);

  const { becomeInstructor, loading } = useContext(UserContext);

  return (
    <div className="">
      <div className=" h-32 border text-center bg-gradient-to-br from-sky-600 to-black">
        <h1 className="mx-auto mt-7 w-max  text-[2.5rem] font-bold text-white">
          Become instructor
        </h1>
      </div>
      <div>
        <div className="align-middle mt-12">
          <div className="m-auto w-[30%] text-center p-2">
            <UserSwitchOutlined className="py-4 text-[8rem]" />
            <br />
            <h2 className="text-4xl font-bold">
              Setup payout to publish courses on OvenArth
            </h2>
            <p className="text-yellow-500 my-8 text-2xl font-semibold">
              OvenArth partners with stripe to transfer earnins to your bank
              account
            </p>
            <Button
              className="mb-3 text-black"
              type="primary"
              block
              shape="round"
              size="large"
              onClick={becomeInstructor}
              icon={
                loading ? (
                  <LoadingOutlined className=" align-middle" />
                ) : (
                  <SettingOutlined className=" align-middle" />
                )
              }
              disabled={
                (user && user.role && user.role.includes("Instructor")) ||
                loading
              }
            >
              {loading ? "Processing" : "Payout setup"}
            </Button>
            <p className="text-xl font-medium">
              You will be redirect to stripe to complete onboarding process.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeInstructor;
