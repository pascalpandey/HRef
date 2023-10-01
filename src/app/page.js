"use client";

import React, { useEffect, useState, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import PersonNode from "@/components/PersonNode";
import Dialog from "@/components/ui/UploadDialog";
import axios from "axios";
import SearchBar from "@/components/SearchBar";

export default function Home() {
  const [viewEmployee, setViewEmployee] = useState(false);
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [startMousePos, setStartMousePos] = useState({ x: 0, y: 0 });
  const [mapPos, setMapPos] = useState({ x: 0, y: 0 });
  const [openId, setOpenId] = useState();
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
    fetchData();
  }, [viewEmployee]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        viewEmployee
          ? "http://localhost:8000/employees"
          : "http://localhost:8000/candidates"
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAcceptCandidate = async (id) => {
    await axios({
      url: `http://localhost:8000/candidates/accept/${id}`,
      method: "POST",
    });
    // refetch data dari model yang udah di retrain
    fetchData();
  };

  const handleRejectCandidtate = async (id) => {
    await axios({
      url: `http://localhost:8000/candidates/reject/${id}`,
      method: "DELETE",
    });
    // refetch data dari model yang udah di retrain
    fetchData();
  };

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
      <div className="flex absolute top-[30px] left-[50px] flex-col gap-4 z-30">
        <p className="text-black text-4xl font-extrabold tracking-wider">
          <span className="text-7xl text-primary">HR</span>ef
        </p>
        <div
          className="flex space-x-2"
          onClick={() => setViewEmployee(!viewEmployee)}
        >
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
      <div className="flex absolute top-[40px] left-[calc((100vw-640px)/2)] flex-col gap-4 z-30 w-[640px] h-[60px]">
        <SearchBar
          data={data}
          setOpenId={setOpenId}
          setMapPos={setMapPos}
        />
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
          {data?.map((el, index) => (
            <div
              className="absolute"
              style={{ left: `${el.x}px`, top: `${el.y}px` }}
              key={index}
            >
              <PersonNode
                data={el}
                viewEmployee={viewEmployee}
                isOpen={openId === el.id}
                handleAcceptCandidate={handleAcceptCandidate}
                handleRejectCandidtate={handleRejectCandidtate}
              />
            </div>
          ))}
        </div>
      </div>
      {!viewEmployee && (
        <div className="absolute top-[45px] right-[50px] z-30">
          <Dialog />
        </div>
      )}
    </main>
  );
}
