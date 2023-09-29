"use client";

import PersonNode from "@/components/PersonNode";
import { useEffect, useState, useRef } from "react";

export default function Home() {
  const [diameter, setDiameter] = useState(48);
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
      className="flex min-h-screen flex-col items-center justify-between p-24"
      ref={mainRef}
    >
      <PersonNode diameter={diameter} />
    </main>
  );
}
