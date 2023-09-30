import React, { useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import axios from "axios";

const DialogDemo = () => {
    const [files, setFiles] = useState();
    const selectFileBtn = useRef(null);

    const uploadFiles = (data) => {
        axios
            .post("/upload", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(() => {
                console.log("success bro");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const packFiles = (files) => {
        const data = new FormData();

        [...files].forEach((file, i) => {
            data.append(`file-${i}`, file, file.name);
        });
        return data;
    };

    const handleUploadClick = () => {
        if (files.length) {
            const data = packFiles(files);
            uploadFiles(data);
        }
    };

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <button className="bg-white text-violet-500 border rounded-md px-4 py-2 shadow-lg">
                    Add Resume
                </button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 opacity-30 bg-black animate-overlay-show " />
                <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-lg max-w-[450px] max-h-[85vh] p-6 animate-content-show focus:outline-none w-full">
                    <Dialog.Title className="text-black font-semibold">
                        Add Resume
                    </Dialog.Title>
                    <form
                        className="mt-5 flex justify-center ali h-[200px] w-full cursor-pointer items-center"
                        style={{
                            border: "2px dashed #1475dc",
                            borderRadius: "5px",
                        }}
                        onClick={() => selectFileBtn.current.click()}
                    >
                        <input
                            type="file"
                            name="file"
                            onChange={(e) => {
                                setFiles(e.target.files);
                            }}
                            accept=".pdf"
                            multiple
                            ref={selectFileBtn}
                            hidden
                        />
                    </form>
                    <div className="flex justify-end">
                        <Dialog.Close asChild>
                            <button
                                className="text-green-900 border rounded-md px-4 py-2 hover:bg-green-50"
                                onClick={handleUploadClick}
                            >
                                Upload
                            </button>
                        </Dialog.Close>
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

export default DialogDemo;
