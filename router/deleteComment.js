
import { Router } from "express";
import { Book, Comment, User } from "../model/book_model.js";
import jwt from "jsonwebtoken"

const deleteCommentApp = Router()

deleteCommentApp.delete("/:comment_id", async (req, res) => {

    const { comment_id } = req.params

    const comment = await Comment.findOne({
        where: {
            comment_id: comment_id
        }
    })

    if (!comment) return res.json({ ok: false, status: 403, message: 'No existe el comentario' });

    const token = req.headers.token

    if (!token) return res.json({ ok: false, status: 403, message: 'No hay token' });

    jwt.verify(token, process.env.secretKey, (err, decoded) => {
        if (err) {
            return res.json({ ok: false, status: 401, message: 'token invalido' });
        }
        req.user = decoded;
    });

    const { email, admin, user_id } = req.user

    if(comment.user_id != user_id) return res.json({ ok: false, status: 401, message: 'Este usuario no hizo este comentario' });

    try{
        const deleteComment = await Comment.destroy({
            where: {
                comment_id: comment.comment_id
            }
        })
    
        return res.json({
            ok:true,
            status: 201,
            body: deleteComment
        })
    }catch(error){
        return res.json({
            ok:false,
            status: 400,
            body: error
        })
    }

})

export default deleteCommentApp

