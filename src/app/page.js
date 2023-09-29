"use client";

import PersonNode from "@/components/PersonNode";
import { useEffect, useState, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [diameter, setDiameter] = useState(48);
  const [employee, setEmployee] = useState(false);
  const mainRef = useRef(null);

  useEffect(() => {
    let scale = 1;
    mainRef.current.addEventListener("wheel", (e) => {
      const scaleFactor = 1.05;
      if (e.deltaY > 0) {
        scale *= scaleFactor;
      } else {
        scale /= scaleFactor;
      }
      setDiameter(diameter * scale);
    });
  }, []);

  return (
    <main
      className="flex min-h-screen flex-col bg-white p-12 relative"
      ref={mainRef}
    >
      <div className="flex absolute top-[40px] left-[60px] flex-col gap-4 z-50">
        <p className="text-black text-4xl font-extrabold tracking-wider">
          <span className="text-6xl text-primary">HR</span>ef
        </p>
        <div className="flex space-x-2" onClick={() => setEmployee(!employee)}>
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
      <div className="relative flex flex-col items-center justify-center w-full h-[calc(100vh-120px)]">
        <PersonNode diameter={diameter} />
      </div>
      {!employee && (
        <div className="flex absolute top-[60px] right-[60px] flex-col gap-4 z-50">
          <Button>+ Upload CV</Button>
        </div>
      )}
    </main>
  );
}
