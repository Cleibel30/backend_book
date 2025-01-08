import { Router } from "express";
import { Book, Comment, User } from "../model/book_model.js";
import jwt from "jsonwebtoken"

const commentApp = Router()

commentApp.post("/", async (req, res) => {

    await Comment.sync()

    const { book_id, comment } = req.body


    const book = await Book.findOne({
        where: {
            book_id: book_id
        }
    })

    if(!book) return res.json({ ok: false, status: 403, message: 'No existe el libro' });

    const token = req.headers.token

    if (!token) return res.json({ ok: false, status: 403, message: 'No hay token' });

    jwt.verify(token, process.env.secretKey, (err, decoded) => {
        if (err) {
            return res.json({ ok: false, status: 401, message: 'token invalido' });
        }
        req.user = decoded;
    });


    const { email, admin, user_id } = req.user

    if (admin) return res.json({ ok: false, status: 400, body: error, message: "No puedes hacer comentarios siendo admin" })

    const user = await User.findOne({
        where: {
            email: email
        }
    })

    if (!user) return res.json({ ok: false, status: 400, body: error, message: "Usuario no encontrado" })

    try {
        const createComment = await Comment.create({
            book_id: book_id,
            user_id: user_id,
            comment: comment
        })

        return res.json({
            ok: true,
            status: 200,
            body: createComment,
            message: "Comentario creado"
        })
    } catch (error) {
        return res.json({
            ok: false,
            status: 400,
            body: error,
            message: "error al crear el comentario"
        })
    }
})

export default commentApp

