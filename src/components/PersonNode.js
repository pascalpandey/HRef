"use client";

import * as HoverCard from "@radix-ui/react-hover-card";

export default function PersonNode({ data, viewEmployee, handleAcceptCandidate, handleRejectCandidtate }) {
  const keywordsArray = JSON.parse(data?.keywords.replace(/'/g, '"'));

  return (
    <HoverCard.Root>
      <HoverCard.Trigger asChild>
        {!viewEmployee ? (
          <button
            className="rounded-full bg-red-400 "
            style={{
              width: `${48}px`,
              height: `${48}px`,
              backgroundColor: data?.color,
            }}
          />
        ) : (
          <a href={data?.resumeLink} target="_blank">
            <button
              className="rounded-full bg-red-400 "
              style={{
                width: `${48}px`,
                height: `${48}px`,
                backgroundColor: data?.color,
              }}
            />
          </a>
        )}
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content
          className="w-64 min-h-32 data-[side=bottom]:animate-slideUpAndFade data-[side=right]:animate-slideLeftAndFade data-[side=left]:animate-slideRightAndFade data-[side=top]:animate-slideDownAndFade rounded-md bg-white p-5 shadow-lg data-[state=open]:transition-all text-black"
          sideOffset={5}
        >
          <div className="flex flex-col gap-1">
            <p>
              <span className="font-bold">
                {viewEmployee ? "Employee Id:" : "Applicant Id:"}
              </span>{" "}
              {data?.id}
              {data?.id}
            </p>
            <p>
              <span className="font-bold">
                {viewEmployee ? "Score:" : "Predicted Score:"}{" "}
              </span>{" "}
              {data?.score}
            </p>
            <div className="flex flex-wrap w-full gap-2 mt-1">
              {keywordsArray.map((v, index) => {
                return (
                  <div className="rounded-2xl bg-gray-100 text-black px-4 py-1 border border-gray-300" key={index}>
                    {v}
                  </div>
                );
              })}
            </div>
            {
              !viewEmployee &&
              <div className="flex gap-2 mt-2">
                <button className="w-1/2 border border-gray-300 rounded-md p-1 bg-green-50" onClick={() => handleAcceptCandidate(data?.id)}>
                  Accept
                </button>
                <button className="w-1/2 border border-gray-300 rounded-md p-1 bg-red-50" onClick={() => handleRejectCandidtate(data?.id)}>
                  Reject
                </button>
              </div>
            }

          </div>
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
}
