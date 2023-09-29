"use client";

import { useState } from "react";
import "./PersonNode.css";

export default function PersonNode({ diameter }) {
  const [showPopup, setShowPopup] = useState(false);
  return (
    <div className="relative">
      <button
        className="rounded-full bg-red-400"
        onMouseEnter={() => setShowPopup(true)}
        style={{ width: `${diameter}px`, height: `${diameter}px` }}
      />
      {showPopup && (
        <div
          className="w-64 h-44 bg-white text-black absolute top-0 left-0 -translate-y-[176px] translate-x-[48px] rounded-md popup"
          onMouseLeave={() => setShowPopup(false)}
        ></div>
      )}
    </div>
  );
}
