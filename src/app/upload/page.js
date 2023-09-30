"use client";
import { useState } from "react";
import axios from "axios";

const FileUpload = () => {
    const [files, setFiles] = useState();

    const uploadFiles = (data) => {
        axios.post('/upload', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then(() => {
            console.log("success bro");
        }).catch((err) => {
            console.log(err);
        })
    }

    const packFiles = (files) => {
        const data = new FormData();

        [...files].forEach((file, i) => {
            data.append(`file-${i}`, file, file.name)
        })
        return data
    }

    const handleUploadClick = () => {
        if (files.length) {
            const data = packFiles(files)
            uploadFiles(data)
        }
    }

    return (
        <>
            <h1>File upload</h1>
            <form action="">
                <input type="file" name="file" onChange={(e) => setFiles(e.target.files)} accept=".pdf" multiple />
                <button onClick={handleUploadClick}>Submit</button>
            </form>

        </>
    );
}

export default FileUpload;