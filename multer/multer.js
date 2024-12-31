import multer from "multer";
import { nanoid } from "nanoid";
import { fileURLToPath } from "url";
import { dirname, join, extname } from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Crear la carpeta 'uploads' si no existe
const uploadDir = join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = extname(file.originalname);
    const name = nanoid()
    cb(null, name + ext);
  }
});

const fileFilter = (req, file, cb) => {
    const ext = extname(file.originalname).toLowerCase();
    if (ext !== '.pdf' && ext !== '.jpg' && ext !== '.jpeg' && ext !== ".png") {
      return cb(new Error('Only PDFs are allowed'), false);
    }
    cb(null, true);
  };
  
  const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
  });

export default upload
