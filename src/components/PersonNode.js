"use client";

import * as HoverCard from "@radix-ui/react-hover-card";

export default function PersonNode({ data, viewEmployee }) {
  const keywordsArray = JSON.parse(data?.keywords.replace(/'/g, '"'));
  return (
    <HoverCard.Root>
      <HoverCard.Trigger asChild>
        <a href={data?.resumeLink} target="_blank">
          <button
            className="rounded-full bg-red-400 "
            style={{ width: `${48}px`, height: `${48}px`, backgroundColor: data?.color }}
          />
        </a>
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content
          className="w-64 min-h-32 data-[side=bottom]:animate-slideUpAndFade data-[side=right]:animate-slideLeftAndFade data-[side=left]:animate-slideRightAndFade data-[side=top]:animate-slideDownAndFade rounded-md bg-white p-5 shadow-lg data-[state=open]:transition-all text-black"
          sideOffset={5}
        >
          <p>
            <span className="font-bold">{viewEmployee ? "Employee Id" : "Applicant Id"}</span>: {data?.id}
          </p>

          <p><span className="font-bold">Skills: </span> {keywordsArray.join(", ")}</p>
          <p><span className="font-bold">Score </span>: {data?.score}</p>
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
}
