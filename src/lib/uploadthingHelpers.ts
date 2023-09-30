import { generateReactHelpers } from "@uploadthing/react/hooks";
 
import type { ourFileRouter } from "../app/api/uploadthing/core";
 
export const { useUploadThing, uploadFiles } =
  generateReactHelpers<typeof ourFileRouter>();