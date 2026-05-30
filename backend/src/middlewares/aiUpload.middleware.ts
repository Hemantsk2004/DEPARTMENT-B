import multer from "multer";

const storage = multer.memoryStorage();

export const aiUpload = multer({
  storage,
});