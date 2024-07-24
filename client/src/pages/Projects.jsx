import React from "react";
import ProgrammerWorking from "../assets/images/ProgrammerWorking.jpg";

export default function Projects() {
  return (
    <div>
      {" "}
      <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
        Currenntly working on more projects
      </h1>
      <img
        className="mt-10 p-3 max-h-[600px] w-full object-contain "
        src={ProgrammerWorking}
        alt=""
      />
    </div>
  );
}
