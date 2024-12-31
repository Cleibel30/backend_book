import { Router } from "express";
import multer from "multer";
import upload from "../multer/multer.js";
import { fileURLToPath } from "url";
import { dirname, join, extname } from "path";
import fs from "fs";
import { validationUpload } from "../helpers/validation.js";
import jwt from "jsonwebtoken"
import { Book } from "../model/book_model.js";
import { bookSend } from "../helpers/uploadBook.js";


const uploadApp = Router()

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

uploadApp.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});


uploadApp.post('/files', (req, res) => {

  const singleUpload = upload.fields([{ name: 'file', maxCount: 1 }, { name: 'photo', maxCount: 1}])

  singleUpload(req, res, (err) => {
    const token = req.headers.token

    if (!token) return res.json({ ok: false, status: 403, message: 'No hay token' });

    jwt.verify(token, process.env.secretKey, (err, decoded) => {
      if (err) {
        return res.json({ ok: false, status: 401, message: 'token invalido' });
      }
      req.user = decoded;
    });

    const { admin_id, admin } = req.user

    const { author, title, description, gender } = req.body

    // if (!validationUpload(title, description, author)) return res.json({ ok: false, status: 401, body: null, message: "Ingrese los datos correctamente" })

    const {file, photo} = req.files

    if (!admin) return res.json({ ok: false, status: 401, body: null, message: "No tienes permiso" })

    if (err) return res.json({ ok: false, status: 401, body: null, message: "Error al subir el archivo" })

    if (!req.files) return res.json({ ok: false, status: 401, body: null, message: "No hay archivo" })

      
    const author_show = author[0]
    const title_show = title[0]
    const des_show = description[0]

    bookSend(admin_id, author_show, title_show, des_show, gender, file[0].filename, photo[0].filename)
    return res.json({ ok: true, status: 200, body: req.file, message: "Archivo subido" })
  });

});

export default uploadApp