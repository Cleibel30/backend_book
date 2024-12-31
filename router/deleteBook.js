import { Router } from "express";
import { Book } from "../model/book_model.js";
import jwt from "jsonwebtoken"

const deleteApp = Router()

deleteApp.delete("/:book_id", async (req, res) => {

    const token = req.headers.token

    if (!token) return res.status(403).json({ ok: false, status: 403, message: 'No hay token' });

    jwt.verify(token, process.env.secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ ok: false, status: 401, message: 'token invalido' });
        }
        req.user = decoded;
    });

    const admin = req.user.admin

    if (!admin) return res.status(401).json({ ok: false, status: 401, body: null, message: "No tienes permiso" })


    const { book_id } = req.params
    const book = await Book.findOne({
        where: {
            book_id: book_id
        }
    })

    if (!book) return res.status(400).json({ ok: false, status: 400, body: null, message: "Libro no encontrado" })

    try {
        const deleteBook = await Book.destroy({
            where: {
                book_id: book_id
            }
        })

        return res.status(201).json({
            ok: true,
            status: 201,
            body: deleteBook,
            message: "libro eliminado correctamente"
        })
    } catch (error) {
        return res.status(400).json({
            ok: false,
            status: 400,
            body: error,
            message: "Error al eliminar"
        })
    }
})

export default deleteApp