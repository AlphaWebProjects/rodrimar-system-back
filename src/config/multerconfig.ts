import multer from 'multer';

export const Multer = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: (1024 * 4) * (1024 * 4)
  }
})

export default Multer;
