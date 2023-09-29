"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

export default function PersonNode({ diameter, employee }) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
      <button
        className="rounded-full bg-red-400"
        style={{ width: `${diameter}px`, height: `${diameter}px` }}
      />
      </HoverCardTrigger>
      <HoverCardContent className="w-64 h-48 rounded-md shadow-md translate-x-[130px] -translate-y-[220px]">
        
      </HoverCardContent>
    </HoverCard>
  );
}
