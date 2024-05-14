import React from "react";
import CallToAction from "../components/CallToAction";
export default function Projects() {
  return (
    <div className="min-h-screen mx-auto justify-center items-center gap-6 p-3 ">
      <div className="">
        <h1 className="text-3xl text-center p-10 ">Projects</h1>
        <p className="text-xl text-center p-1">
          Here there's some of my projects
        </p>
      </div>

      <img
        className="mx-auto flex flex-wrap mt-20 mb-20"
        src="https://t4.ftcdn.net/jpg/00/89/02/67/360_F_89026793_eyw5a7WCQE0y1RHsizu41uhj7YStgvAA.jpg"
        alt="under construction"
      />
      <div className="">
        <CallToAction />
      </div>
    </div>
  );
}
