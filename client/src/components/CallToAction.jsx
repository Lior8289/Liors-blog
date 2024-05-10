import React from "react";
import { Button } from "flowbite-react";
import HostagesTicker from "./HostageTicker";

export default function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-red-500 bg-black justify-center item-center rounded-tl-3xl rounded-br-3xl text-center">
      <div className="p-7 flex-1">
        <img src="https://mverse.co.il/wp-content/uploads/2023/11/0f00390b-bf87-47e7-b103-3cb1842905e8.jpg" />
      </div>
      <div className="flex-1 justify-center flex flex-col">
        <h2 className="text-2xl ">עם ישראל חי יחד ננצח</h2>

        <Button
          gradientMonochrome="failure"
          className="rounded-tl-xl rounded-bl-none mt-4 mb-4"
        >
          <a
            href="https://stories.bringthemhomenow.net/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Bring Them Home
          </a>
        </Button>
        <img
          src="https://static.wixstatic.com/media/ea03ee_a13327eedcd54ee6b6a2fee4aa02bbc6~mv2.png"
          alt=""
        />
        <HostagesTicker />
      </div>
    </div>
  );
}
