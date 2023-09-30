"use client";

import React, { useEffect, useState, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import PersonNode from "@/components/PersonNode";
import axios from "axios";

export default function Home() {
  const [employee, setEmployee] = useState(false);
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const mainRef = useRef(null);
  const mapRef = useRef(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    mainRef.current.addEventListener("wheel", handleWheel);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  });

  useEffect(() => {
    axios.get("http://localhost:3000/candidates")
      .then((res) => {
        setData(res.data);
      }).catch((err) => {
        console.log(err);
      })
  }, [])

  const handleMouseDown = (e) => {
    setIsDragging(true);
    const rect = mapRef.current.getBoundingClientRect();
    const offsetX = (e.clientX - rect.left) / scale;
    const offsetY = (e.clientY - rect.top) / scale;
    setDragOffset({ x: offsetX, y: offsetY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = (e.clientX - dragOffset.x - 50) / scale;
    const y = (e.clientY - dragOffset.y - 50) / scale;

    mapRef.current.style.transform = `translate(${x}px, ${y}px)`;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e) => {
    const scaleFactor = 1.05;
    let newScale = scale;
    if (e.deltaY < 0) {
      newScale *= scaleFactor;
    } else {
      newScale /= scaleFactor;
    }

    setScale(newScale);
  };

  return (
    <main
      className="flex min-h-screen flex-col bg-white p-12 relative"
      ref={mainRef}
    >
      {/* Nesting stack, okay because it can be dragged */}
      <div
        className="flex absolute top-[40px] left-[60px] flex-col gap-4 z-50"
        onClick={() => setEmployee(!employee)}
      >
        <p className="text-black text-4xl font-extrabold tracking-wider">
          <span className="text-6xl text-primary">HR</span>ef
        </p>
        <div className="flex space-x-2">
          <Switch id="airplane-mode" />
          <div className="w-[65px] text-center">
            <Label htmlFor="airplane-mode" className="text-primary pt-1 font-semibold">
              {employee ? "Employee" : "Applicants"}
            </Label>
          </div>
        </div>
      </div>

      <div className="relative flex flex-col items-center justify-center w-full h-[calc(100vh-120px)] overflow-hidden"
        style={{ cursor: isDragging ? "grabbing" : "grab", border: "3px solid blue" }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}>
        <div
          className="relative flex flex-col items-center justify-center w-full h-[calc(100vh-120px)]"
          style={{ scale: `${scale}` }}
          ref={mapRef}
        >
          {
            data.map((el, index) => (
              <div
                className="absolute"
                style={{ left: `${el.x}px`, top: `${el.y}px` }}
                key={index}
              >
                <PersonNode />
              </div>
            ))
          }
        </div>
      </div>
    </main>
  );
}