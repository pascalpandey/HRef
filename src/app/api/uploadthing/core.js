import { createUploadthing } from "uploadthing/next";
 
const f = createUploadthing();
 
export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: "64MB", maxFileCount: 50 } })
    .onUploadComplete(async ({ file }) => {  
      console.log("file url", file.url);
    }),
}
