"use client";

import React, { useEffect, useState, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import PersonNode from "@/components/PersonNode";
import axios from "axios";

export default function Home() {
  const [diameter, setDiameter] = useState(48);
  const [employee, setEmployee] = useState(false);
  const mainRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
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
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    setDragOffset({ x: offsetX, y: offsetY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.clientX - dragOffset.x - 50;
    const y = e.clientY - dragOffset.y - 50;

    mapRef.current.style.transform = `translate(${x}px, ${y}px)`;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e) => {
    const maxZoom = 80;
    const minZoom = 10;
    let scale = 1;

    const scaleFactor = 1.05;
    if (e.deltaY > 0) {
      scale *= scaleFactor;
    } else {
      scale /= scaleFactor;
    }
    setDiameter((prevDiameter) => {
      const newDiameter = prevDiameter * scale
      return Math.min(Math.max(newDiameter, minZoom), maxZoom);
    });
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
          ref={mapRef}
        >
          {
            data.map((el, index) => (
              <div
                className="absolute"
                style={{ left: `${el.x}px`, top: `${el.y}px` }}
                key={index}
              >
                <PersonNode diameter={diameter} />
              </div>
            ))
          }
        </div>
      </div>


    </main>
  );
}
