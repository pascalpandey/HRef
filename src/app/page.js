"use client";

import React, { useEffect, useState, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import PersonNode from "@/components/PersonNode";
import Dialog from "@/components/ui/UploadDialog";

export default function Home() {
  const [viewEmployee, setViewEmployee] = useState(false);
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [startMousePos, setStartMousePos] = useState({ x: 0, y: 0 });
  const [mapPos, setMapPos] = useState({ x: 0, y: 0 });
  const mainRef = useRef(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    mainRef.current.addEventListener("wheel", handleWheel);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  });

  useEffect(() => {
    const candidates = [
      { name: "kevin", keywords: ["ganteng", "bebek"], color: "blue", resumeLink: "https://utfs.io/f/6dfa044a-7b8a-4f6e-a3ec-8d3bb428c406-2gj.pdf", score: 6.9, x: 100, y: 200 },
      { name: "kevin", keywords: ["ganteng", "bebek"], color: "blue", resumeLink: "https://utfs.io/f/6dfa044a-7b8a-4f6e-a3ec-8d3bb428c406-2gj.pdf", score: 6.9, x: 150, y: 250 },
      { name: "kevin", keywords: ["ganteng", "bebek"], color: "blue", resumeLink: "https://utfs.io/f/6dfa044a-7b8a-4f6e-a3ec-8d3bb428c406-2gj.pdf", score: 6.9, x: 200, y: 300 },
      { name: "kevin", keywords: ["ganteng", "bebek"], color: "blue", resumeLink: "https://utfs.io/f/6dfa044a-7b8a-4f6e-a3ec-8d3bb428c406-2gj.pdf", score: 6.9, x: 250, y: 350 },
      { name: "kevin", keywords: ["ganteng", "bebek"], color: "blue", resumeLink: "https://utfs.io/f/6dfa044a-7b8a-4f6e-a3ec-8d3bb428c406-2gj.pdf", score: 6.9, x: 300, y: 400 },
      { name: "kevin", keywords: ["ganteng", "bebek"], color: "blue", resumeLink: "https://utfs.io/f/6dfa044a-7b8a-4f6e-a3ec-8d3bb428c406-2gj.pdf", score: 6.9, x: 350, y: 450 },
      { name: "kevin", keywords: ["ganteng", "bebek"], color: "blue", resumeLink: "https://utfs.io/f/6dfa044a-7b8a-4f6e-a3ec-8d3bb428c406-2gj.pdf", score: 6.9, x: 400, y: 500 },
      { name: "kevin", keywords: ["ganteng", "bebek"], color: "blue", resumeLink: "https://utfs.io/f/6dfa044a-7b8a-4f6e-a3ec-8d3bb428c406-2gj.pdf", score: 6.9, x: 450, y: 550 },
      { name: "kevin", keywords: ["ganteng", "bebek"], color: "blue", resumeLink: "https://utfs.io/f/6dfa044a-7b8a-4f6e-a3ec-8d3bb428c406-2gj.pdf", score: 6.9, x: 500, y: 600 },
      { name: "kevin", keywords: ["ganteng", "bebek"], color: "red", resumeLink: "https://utfs.io/f/6dfa044a-7b8a-4f6e-a3ec-8d3bb428c406-2gj.pdf", score: 6.9, x: 550, y: 650 },
      { name: "kevin", keywords: ["ganteng", "bebek"], color: "red", resumeLink: "https://utfs.io/f/6dfa044a-7b8a-4f6e-a3ec-8d3bb428c406-2gj.pdf", score: 6.9, x: 800, y: 200 },
      { name: "kevin", keywords: ["ganteng", "bebek"], color: "red", resumeLink: "https://utfs.io/f/6dfa044a-7b8a-4f6e-a3ec-8d3bb428c406-2gj.pdf", score: 6.9, x: 800, y: 100 },
      { name: "kevin", keywords: ["ganteng", "bebek"], color: "red", resumeLink: "https://utfs.io/f/6dfa044a-7b8a-4f6e-a3ec-8d3bb428c406-2gj.pdf", score: 6.9, x: 1550, y: 200 },
      { name: "kevin", keywords: ["ganteng", "bebek"], color: "red", resumeLink: "https://utfs.io/f/6dfa044a-7b8a-4f6e-a3ec-8d3bb428c406-2gj.pdf", score: 6.9, x: 1600, y: 150 },
      { name: "kevin", keywords: ["ganteng", "bebek"], color: "red", resumeLink: "https://utfs.io/f/6dfa044a-7b8a-4f6e-a3ec-8d3bb428c406-2gj.pdf", score: 6.9, x: 1800, y: 150 },
      { name: "kevin", keywords: ["ganteng", "bebek"], color: "red", resumeLink: "https://utfs.io/f/6dfa044a-7b8a-4f6e-a3ec-8d3bb428c406-2gj.pdf", score: 6.9, x: 2000, y: 100 },
      { name: "kevin", keywords: ["ganteng", "bebek"], color: "red", resumeLink: "https://utfs.io/f/6dfa044a-7b8a-4f6e-a3ec-8d3bb428c406-2gj.pdf", score: 6.9, x: 2000, y: 0 },
    ];

    const employees = [
      { name: "kevin", keywords: ["ganteng", "bebek"], color: "red", resumeLink: "https://utfs.io/f/6dfa044a-7b8a-4f6e-a3ec-8d3bb428c406-2gj.pdf", score: 6.9, x: 10, y: 20 },
      { name: "kevin", keywords: ["ganteng", "bebek"], color: "red", resumeLink: "https://utfs.io/f/6dfa044a-7b8a-4f6e-a3ec-8d3bb428c406-2gj.pdf", score: 6.9, x: 150, y: 250 },
      { name: "kevin", keywords: ["ganteng", "bebek"], color: "red", resumeLink: "https://utfs.io/f/6dfa044a-7b8a-4f6e-a3ec-8d3bb428c406-2gj.pdf", score: 6.9, x: 200, y: 300 },
      { name: "kevin", keywords: ["ganteng", "bebek"], color: "red", resumeLink: "https://utfs.io/f/6dfa044a-7b8a-4f6e-a3ec-8d3bb428c406-2gj.pdf", score: 6.9, x: 250, y: 350 },
      { name: "kevin", keywords: ["ganteng", "bebek"], color: "red", resumeLink: "https://utfs.io/f/6dfa044a-7b8a-4f6e-a3ec-8d3bb428c406-2gj.pdf", score: 6.9, x: 300, y: 400 },
    ];

    setData(viewEmployee ? employees : candidates);
  }, [viewEmployee]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setStartMousePos({ x: e.clientX, y: e.clientY });
    const deltaX = (e.clientX - startMousePos.x) / scale;
    const deltaY = (e.clientY - startMousePos.y) / scale;
    setMapPos({ x: mapPos.x + deltaX, y: mapPos.y + deltaY });
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

    newScale = Math.min(Math.max(newScale, 0.5), 2);
    setScale(newScale);
  };

  return (
    <main
      className="flex min-h-screen flex-col bg-white relative"
      ref={mainRef}
    >
      <div
        className="flex absolute top-[30px] left-[50px] flex-col gap-4 z-30"
        onClick={() => setViewEmployee(!viewEmployee)}
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
              {viewEmployee ? "Employee" : "Candidates"}
            </Label>
          </div>
        </div>
      </div>

      <div
        className="relative flex flex-col items-center justify-center w-full h-screen overflow-hidden"
        style={{
          cursor: isDragging ? "grabbing" : "grab",
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <div
          className="relative flex flex-col items-center justify-center w-full h-screen"
          style={{ scale: `${scale}`, left: mapPos.x, top: mapPos.y }}
        >
          {data.map((el, index) => (
            <div
              className="absolute"
              style={{ left: `${el.x}px`, top: `${el.y}px` }}
              key={index}
            >
              <PersonNode data={el} viewEmployee={viewEmployee} />
            </div>
          ))}
        </div>
      </div>
      {!viewEmployee && (
        <div className="absolute top-[40px] right-[50px] z-30">
          <Dialog />
        </div>
      )}
    </main>
  );
}
