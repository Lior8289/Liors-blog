import React from "react";
import ProfilePicture from "../assets/images/profilePictureJerusalem.jpg";

export default function About() {
  return (
    <div className="flex flex-col items-center mt-4">
      <img
        className="h-60 w-60 object-cover rounded-full"
        src={ProfilePicture}
        alt="Lior Morali"
      />
      <h1 className="mt-4 text-xl font-semibold">Lior Morali</h1>
      <p className="mt-2 text-center max-w-md px-4 mb-10">
        {/* Add your descriptive text here */}
        I'm a second-year Computer Science student with a passion for web
        development and full-stack technologies. I enjoy creating responsive and
        dynamic applications that provide a great user experience. Currently,
        I'm focused on honing my skills in the MERN stack, working on various
        projects that allow me to apply and expand my knowledge. Outside of
        coding, I love exploring new technologies, reading tech blogs, and
        continuously learning to stay updated with the latest industry trends.
      </p>
    </div>
  );
}
