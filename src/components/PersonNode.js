"use client";

import * as HoverCard from "@radix-ui/react-hover-card";

export default function PersonNode() {
  return (
    <HoverCard.Root>
      <HoverCard.Trigger asChild>
        <button
          className="rounded-full bg-red-400 "
          style={{ width: `${48}px`, height: `${48}px` }}
        />
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content
          className="w-64 h-48 data-[side=bottom]:animate-slideUpAndFade data-[side=right]:animate-slideLeftAndFade data-[side=left]:animate-slideRightAndFade data-[side=top]:animate-slideDownAndFade rounded-md bg-white p-5 shadow-lg data-[state=open]:transition-all"
          sideOffset={5}
        ></HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
}
