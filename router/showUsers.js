import { Router } from "express";
import { Book, Comment, Like, User } from "../model/book_model.js";
import jwt from "jsonwebtoken"
import { body } from "express-validator";

const showUsersApp = Router()

showUsersApp.get("/", async (req, res) => {

    const token = req.headers.token

    if (!token) return res.status(403).json({ ok: false, status: 403, message: 'No hay token' });

    jwt.verify(token, process.env.secretKey, (err, decoded) => {
        if (err) {
            return res.json({ ok: false, status: 401, message: 'token invalido', body: null });
        }
        req.user = decoded;
    });

    if(!req.user) return res.json({ ok: false, status: 400, message: 'no hay token',  body: undefined});
    return res.json({ ok: true, status: 200, message: 'token valido',  body: req.user});
})




export default showUsersApp

