import { Router } from "express";
import { Book, Comment, Like, User } from "../model/book_model.js";
import jwt from "jsonwebtoken"
import { body } from "express-validator";

const likeApp = Router()

likeApp.post("/:book_id", async (req, res) => {

    const { book_id } = req.params

    const book = await Book.findOne({
        where: {
            book_id: book_id
        }
    })

    if (!book) return res.status(403).json({ ok: false, status: 403, message: 'No existe el libro' });

    const token = req.headers.token

    if (!token) return res.status(403).json({ ok: false, status: 403, message: 'No hay token' });

    jwt.verify(token, process.env.secretKey, (err, decoded) => {
        if (err) {
            return res.json({ ok: false, status: 401, message: 'token invalido' });
        }
        req.user = decoded;
    });


    const { admin, user_id, email } = req.user

    if (admin) return res.status(400).json({ ok: false, status: 400, body: error, message: "No puedes hacer comentarios siendo admin" })

    const user = await User.findOne({
        where: {
            email: email
        }
    })

    if (!user) return res.status(400).json({ ok: false, status: 400, body: error, message: "Usuario no encontrado" })

    await Like.sync()

    const like = await Like.findOne({
        where: {
            user_id: user_id,
            book_id: book_id
        }
    })

    if (like) {
        try {
            const deleteLike = await Like.destroy({
                where: {
                    like_id: like.like_id
                }
            })

            return res.status(201).json({
                ok: true,
                status: 201,
                body: deleteLike
            })
        } catch (error) {
            return res.status(201).json({
                ok: false,
                status: 400,
                body: error
            })
        }
    } else {
        try {
            const createComment = await Like.create({
                book_id: book_id,
                user_id: user_id,
            })

            return res.status(200).json({
                ok: true,
                status: 200,
                body: createComment,
                message: "Like añadido"
            })
        } catch (error) {
            return res.status(400).json({
                ok: false,
                status: 400,
                body: error,
                message: "error al añadir el like"
            })
        }
    }

})

likeApp.get("/showLike/:book_id", async (req, res) => {
    const { book_id } = req.params


    const token = req.headers.token

    if (!token) return res.json({ ok: false, status: 403, message: 'No hay token' });

    jwt.verify(token, process.env.secretKey, (err, decoded) => {
        if (err) {
            return res.json({ ok: false, status: 401, message: 'token invalido' });
        }
        req.user = decoded;
    });


    const { user_id, admin } = req.user

    if (admin) return res.json({ ok: false, status: 400, body: error, message: "No puedes hacer like siendo admin" })

    const user = await User.findOne({
        where: {
            user_id: user_id
        }
    })

    if (!user) return res.json({ ok: false, status: 400, body: error, message: "Usuario no encontrado" })


    const book = await Like.findOne({
        where: {
            book_id: book_id,
            user_id: user_id
        }
    })

    if (!book) return res.json({ ok: false, status: 403, message: 'No existe tu like', body: false });


    return res.json({ ok: true, status: 200, message: 'Like encontrado', body: true });
})

likeApp.get("/bookLike/:book_id", async (req, res) => {
    const { book_id } = req.params


    const book = await Like.findOne({
        where: {
            book_id: book_id
        }
    })

    if (!book) return res.json({ ok: false, status: 403, message: 'No existe tu like', body: false });

    if (book.lenght == 0) return res.json({ ok: true, status: 200, message: 'No tiene likes', body: 0 });


    return res.json({ ok: true, status: 200, message: 'Tiene likes', body: book.lenght });
})



export default likeApp

