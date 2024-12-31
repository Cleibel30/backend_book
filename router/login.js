import { Router } from "express";
import { User, Admin } from "../model/book_model.js";
import jwt from "jsonwebtoken"
import { body, validationResult } from "express-validator";
import { verifyPassword } from "../helpers/hash.js";


const loginApp = Router()

loginApp.post("/", [
    body("email").isEmail().notEmpty().withMessage("Debe ser un email valido"),
    body("password").notEmpty().isLength({ min: 8 }).withMessage("Ingrese una contraseña valida")
], async (req, res) => {
    const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.json({ ok: false, status: 406, body: errors.array() })
        }
        const { email, password } = req.body
    
        const user = await User.findOne({
            where: {
                email: email
            }
        })
        
        if(!user) return res.json({ok: false, status: 401, body:null, message: "Verifique los datos"})

        const verify = await verifyPassword(password, user.password)
        
        if(!verify) return res.json({ok: false, status: 401, body:null, message: "Verifique los datos"})

        const userToken = {
            user_id: user.user_id,
            user_name: user.user_name,
            email: user.email,
            admin: false
        }
        
        const token = jwt.sign(userToken, process.env.secretKey); 
        
        return res.status(202).json({
            ok: true,
            status: 202,
            body: token,
            message: "Has iniciado sesión"
        })
        
})

loginApp.post("/admin", [
    body("email").isEmail().notEmpty().withMessage("Debe ser un email valido"),
    body("password").notEmpty().isLength({ min: 8 }).withMessage("Ingrese una contraseña valida")
], async (req, res) => {
    const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.json({ ok: false, status: 406, body: errors.array() })
        }
        const { email, password } = req.body
    
        const user = await User.findOne({
            where: {
                email: email
            }
        })
        
        if(user) return res.json({ok: false, status: 401, body:null, message: "Verifique los datos"})

        const admin = await Admin.findOne({
            where: {
                email: email
            }
        })
        
        if(!admin) return res.json({ok: false, status: 401, body:null, message: "Verifique los datos"})

        const verify = await verifyPassword(password, admin.password)
        
        if(!verify) return res.json({ok: false, status: 401, body:null, message: "Verifique los datos"})

        const userToken = {
            admin_id: admin.admin_id,
            admin_name: admin.admin_name,
            email: admin.email,
            admin: true
        }
        
        

        const token = jwt.sign(userToken, process.env.secretKey); 
        
        return res.json({
            ok: true,
            status: 202,
            body: token
        })
        
})

export default loginApp
