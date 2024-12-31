import { Router } from "express";
import { Book, Comment, Like, User } from "../model/book_model.js";
import path from 'path';
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const showBooksApp = Router()

showBooksApp.get("/:url", async (req, res) => {
    const { url } = req.params
    const urlfile = path.join(__dirname, '../uploads', url);
    res.sendFile(urlfile);
})



export default showBooksApp

