"use client";

import { useState } from "react";
import "./PersonNode.css";

export default function PersonNode({ diameter }) {
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
        className="rounded-full bg-red-400 bottom-0 left-0 absolute"
        style={{ width: `${diameter}px`, height: `${diameter}px`, transition: "width 0.3s ease-in-out, height 0.3s ease-in-out" }}
      />
      {showPopup && (
        <div
          className="w-64 h-44 bg-white text-black absolute top-0 right-0 rounded-md popup shadow-md"
        ></div>
      )}
    </div>
  );
}
