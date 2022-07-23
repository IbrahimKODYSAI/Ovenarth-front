import Image from "next/image";
import React from "react";
import img1 from "../../public/img/carou1.jpg";

const Main = () => {
  return (
    <div className="w-full h-96 border boder-gray-100 relative">
      <Image
        src={img1}
        alt="Woman on computer"
        objectFit="cover"
        objectPosition="bottom"
      />
      <div className="absolute bg-white top-12 left-8 p-4 flex flex-col items-satrt justify-center shadow-lg h-40 w-[440px]">
        <h2 className="text-3xl font-bold mb-2">Hello everyone welcome</h2>
        <h3 className="text-xl">Look at this new project !</h3>
        <h3 className="text-xl">the goal is to learn without stress</h3>
      </div>
    </div>
  );
};

export default Main;
