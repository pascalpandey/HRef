"use client";

import { useState } from "react";
import "./PersonNode.css";

export default function PersonNode() {
  const [showPopup, setShowPopup] = useState(false);
  return (
    <div
      className="relative w-72 h-52"
      onMouseEnter={() => {
        setShowPopup(true);
      }}
      onMouseLeave={() => {
        setShowPopup(false);
      }}
    >
      <button
        className="rounded-full bg-red-400 bottom-0 left-0 absolute w-[32px] h-[32px]"
      />
      {showPopup && (
        <div
          className="w-64 h-44 bg-white text-black absolute top-0 right-0 rounded-md popup shadow-md z-10"
        ></div>
      )}
    </div>
  );
}
