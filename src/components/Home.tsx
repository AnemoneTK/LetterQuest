import { useState } from "react";
import Setting from "./Setting";
export default function Home() {
  const [mode, setMode] = useState<string>("");
  return (
    <>
      <div className="flex flex-col gap-5 md:gap-10 lg:gap-20 items-center justify-center h-dvh md:h-full">
        <div className=" text-center font-extrabold text-7xl">Letter Quest</div>
        {mode}
        <Setting mode={mode} setMode={setMode} name="" />
        <div className="flex flex-col gap-5 w-72">
          <button className="primary-btn ">Start</button>
          <button className="flex items-center justify-center gap-3 text-xl hover:underline">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
              />
            </svg>
            How to play
          </button>
        </div>
      </div>
    </>
  );
}
