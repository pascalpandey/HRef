"use client";

import PersonNode from "@/components/PersonNode";
import { useEffect, useState, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

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
      {/* ngestack gpp soalnya bsa drag */}
      <div
        className="flex space-x-2 absolute top-[60px] left-[60px] z-50"
        onClick={() => setEmployee(!employee)}
      >
        <Switch id="airplane-mode" />
        <div className="w-[65px] text-center">
          <Label htmlFor="airplane-mode" className="text-primary pt-1">
            {employee ? "Employee" : "Applicants"}
          </Label>
        </div>
      </div>
      <div className="relative">
        <PersonNode diameter={diameter} />
      </div>
    </main>
  );
}
