"use client";

import React, { useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import axios from "axios";
import { BsCloudUploadFill } from "react-icons/bs";
import toast from "react-hot-toast";
import { useUploadThing } from "@/lib/uploadthingHelpers";
const STATUS_IDLE = "idling";
const STATUS_UPLOADING = "uploading";

const UploadDialog = () => {
  const [files, setFiles] = useState([]);
  const selectFileBtn = useRef(null);
  const [numberOfFiles, setNumberOfFiles] = useState(0);
  const [status, setStatus] = React.useState(STATUS_IDLE);

  const { startUpload } = useUploadThing("pdfUploader", {
    onUploadError: (err) => {
      toast.error(err.message);
    },
    onClientUploadComplete: () => {
      toast.success("Resume upload successful!")
    }
  });

  const resetInput = () => {
    setFiles([]);
    setNumberOfFiles(0);
  };

  const handleFileInputChange = (e) => {
    setFiles([...files, ...e.target.files]);
    setNumberOfFiles(files.length + e.target.files.length);
  };

  const handleUploadClick = () => {
    setStatus(STATUS_UPLOADING);
    startUpload(files)
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          className="bg-white text-violet-500 rounded-md px-4 py-2 border border-primary shadow-md hover:bg-gray-50"
          onClick={resetInput}
        >
          Add Resume
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 opacity-50 bg-black animate-overlay-show z-40" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-lg max-w-[450px] max-h-[85vh] p-6 animate-content-show focus:outline-none w-full z-50">
          <Dialog.Title className="text-black font-semibold">
            Add Resume
          </Dialog.Title>
          <form
            className="mt-5 flex flex-col justify-center h-[200px] w-full cursor-pointer items-center"
            style={{
              border: "2px dashed #8b5cf6",
              borderRadius: "5px",
            }}
            onClick={() => selectFileBtn.current.click()}
          >
            <BsCloudUploadFill
              color="#8b5cf6"
              className="w-[150px] h-[150px]"
            />
            <p className="text-black">
              {numberOfFiles} files are selected
            </p>
            <input
              type="file"
              name="file"
              onChange={handleFileInputChange}
              accept=".pdf"
              multiple
              ref={selectFileBtn}
              hidden
            />
          </form>
          <div className="flex justify-end">
            <button
              className="text-primary border border-primary rounded-md px-4 py-2 hover:bg-gray-50 mt-5"
              onClick={handleUploadClick}
              disabled={status === STATUS_UPLOADING}
            >
              Upload
            </button>
          </div>
          <Dialog.Close asChild>
            <button className="text-violet-500 absolute top-2 right-2 w-7 h-7 p-0.5 bg-white rounded-full">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default UploadDialog;
