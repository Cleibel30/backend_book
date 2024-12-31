import { Router } from "express";
import { Book } from "../model/book_model.js";
import jwt from "jsonwebtoken"

const editApp = Router()

editApp.put("/:book_id", async (req, res) => {
    const { book_id } = req.params
    const { admin_id, author, title, description, gender, book_url, photo_url } = req.body

    const token = req.headers.token

    if (!token) return res.status(403).json({ ok: false, status: 403, message: 'No hay token' });

    jwt.verify(token, process.env.secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ ok: false, status: 401, message: 'token invalido' });
        }
        req.user = decoded;
    });

    const admin = req.user.admin

    console.log(admin)

    if (!admin) return res.status(401).json({ ok: false, status: 401, body: null, message: "No tienes permiso" })

    const book = await Book.findOne({
        where: {
            book_id: book_id
        }
    })

    if (!book) return res.status(400).json({ ok: false, status: 400, body: null, message: "Libro no encontrado" })

    try {
        const udpataBook = await Book.update({
            admin_id: admin_id,
            author: author,
            title: title,
            description: description,
            gender: gender,
            book_url: book_url,
            photo_url: photo_url

        }, {
            where: {
                book_id: book_id
            }
        })

        console.log(req.body)

        res.status(200).json({
            ok: true,
            status: 200,
            body: udpataBook,
            message: "Libro modificado correctamente"
        })
    } catch (error) {
        res.status(200).json({
            ok: false,
            status: 400,
            body: error,
            message: "Error al modificar"
        })
    }

})

export default editApp