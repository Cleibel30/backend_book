import { Router } from "express";
import { Book, Comment, Like, User } from "../model/book_model.js";
import { Op } from 'sequelize';

const showCommentsApp = Router();

// Corrige los foreignKeys
Comment.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Comment, { foreignKey: 'user_id' });

showCommentsApp.get("/:book_id", async (req, res) => {
    const { book_id } = req.params
    if (!book_id) return res.json({ok: false, status: 400, message: "El parámetro de búsqueda es obligatorio", body: [] });
    try {
        const comments = await Comment.findAll({
            include: [{
                model: User,
                required: true
            }],
            where: {
                book_id: book_id
            }
        });

        if (comments.length === 0) return res.json({ ok: false, status: 404, message: "No hay comentarios", body: [] });
        
        return res.json({ ok: true, status: 200, message: "Comentarios:", body: comments });

    } catch (error) {
        console.error('Error al obtener comentarios y usuarios:', error);
        res.send("Error interno del servidor");
    }
});

export default showCommentsApp;

