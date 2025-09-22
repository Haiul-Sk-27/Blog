import multer from 'multer';

const stroage = multer.memoryStorage();
export const singleUpload = multer({stroage}).single('file')