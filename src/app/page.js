"use client";

import React, { useEffect, useState, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import PersonNode from "@/components/PersonNode";
import Dialog from "@/components/ui/UploadDialog";
import { Button } from "@/components/ui/button";
import DragDrop from "@/components/DragAndDrop";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
    const candidates = [
      { x: 100, y: 200 },
      { x: 150, y: 250 },
      { x: 200, y: 300 },
      { x: 250, y: 350 },
      { x: 300, y: 400 },
      { x: 350, y: 450 },
      { x: 400, y: 500 },
      { x: 450, y: 550 },
      { x: 500, y: 600 },
      { x: 550, y: 650 },
      { x: 800, y: 200 },
      { x: 800, y: 100 },
      { x: 1550, y: 200 },
      { x: 1600, y: 150 },
      { x: 1800, y: 150 },
      { x: 2000, y: 100 },
      { x: 2000, y: 0 },
    ];

    setData(candidates);
  }, []);

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
    const scaleFactor = 1.05;
    let newScale = scale;
    if (e.deltaY > 0) {
      newScale *= scaleFactor;
    } else {
      newScale /= scaleFactor;
    }

    newScale = Math.min(Math.max(newScale, 0.5), 2);
    setScale(newScale);
  };

  return (
    <main
      className="flex min-h-screen flex-col bg-white p-12 relative"
      ref={mainRef}
    >
      <div
        className="flex absolute top-[40px] left-[60px] flex-col gap-4 z-30"
        onClick={() => setEmployee(!employee)}
      >
        <p className="text-black text-4xl font-extrabold tracking-wider">
          <span className="text-6xl text-primary">HR</span>ef
        </p>
        <div className="flex space-x-2">
          <Switch id="airplane-mode" />
          <div className="w-[65px] text-center">
            <Label
              htmlFor="airplane-mode"
              className="text-primary pt-1 font-semibold"
            >
              {employee ? "Employee" : "Applicants"}
            </Label>
          </div>
        </div>
      </div>

      <div
        className="relative flex flex-col items-center justify-center w-full h-[calc(100vh-120px)] overflow-hidden"
        style={{
          cursor: isDragging ? "grabbing" : "grab",
          border: "3px solid blue",
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <div
          className="relative flex flex-col items-center justify-center w-full h-[calc(100vh-120px)] border-red"
          style={{ scale: `${scale}` }}
          ref={mapRef}
        >
          {data.map((el, index) => (
            <div
              className="absolute"
              style={{ left: `${el.x}px`, top: `${el.y}px` }}
              key={index}
            >
              <PersonNode />
            </div>
          ))}
        </div>
      </div>
      {!employee && (
        <div className="absolute top-[50px] right-[60px] z-30">
          <Dialog />
        </div>
      )}
    </main>
  );
}
