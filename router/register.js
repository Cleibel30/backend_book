import { Router } from "express";
import { body, validationResult } from "express-validator";
import { validationRegister } from "../helpers/validation.js";
import { hashPassword } from "../helpers/hash.js";
import bcrypt from "bcrypt"
import { User, Admin } from "../model/book_model.js";


const registerApp = Router()

registerApp.post("/", [
    body('user_name').notEmpty().isLength({ min: 3, max: 20 }).trim().withMessage('El nombre mínimo debe tener 3 caracteres y máximo 20'),
    body("email").isEmail().notEmpty().withMessage("Debe ser un email valido"),
    body("password").notEmpty().isLength({ min: 8 }).withMessage("Ingrese una contraseña valida")
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.json({ ok: false, status: 406, body: errors.array() })
    }

    await User.sync()

    if(!req.body) return res.json({ ok: false, status: 406, body: null, message: "Debes llenar todos los datos"})

    const { user_name, email, password } = req.body

    const user = await User.findOne({
        where: {
            email: email
        }
    })

    if (user) return res.json({ ok: false, status: 401, body: null, message: "Correo en uso" })

    const admin = await Admin.findOne({
        where: {
            email: email
        }
    })

    if (admin) return res.json({ ok: false, status: 401, body: null, message: "No puedes ser usuario y admin al mismo tiempo" })


    const pass = await hashPassword(password, 10)

    try {
        const createUSer = await User.create({
            user_name: user_name,
            email: email,
            password: pass
        })

        return res.json({
            ok: true,
            status: 201,
            body: createUSer
        })
    } catch (error) {
        return res.json({
            ok: false,
            status: 500,
            body: error
        })
    }

})

registerApp.post("/admin", [
    body('user_name').notEmpty().isLength({ min: 3, max: 20 }).trim().withMessage('El nombre es obligatorio'),
    body("email").isEmail().notEmpty().withMessage("Debe ser un email valido"),
    body("password").notEmpty().isLength({ min: 8 }).withMessage("Ingrese una contraseña valida"),
    // body("password_admin").notEmpty().isLength({ min: 8 }).withMessage("Ingrese una contraseña de administrador valida")
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.json({ ok: false, status: 406, body: errors.array() })
    }

    await Admin.sync()

    const { user_name, email, password, password_admin } = req.body

    // if (!validationRegister(user_name, email, password)) return res.status(406).json({ ok: false, status: 406, body: null, message: "Asegúrese de que tiene el formato correcto (ejemplo@dominio.com). La contraseña no es válida. Debe tener al menos 8 caracteres, incluyendo una letra mayúscula, una letra minúscula, un número y un carácter especial. El nombre de usuario mínimo debe tener 3 caracteres y máximo 20" })

    const admin = await Admin.findOne({
        where: {
            email: email
        }
    })

    if (admin) return res.json({ ok: false, status: 401, body: null, message: "Admin ya existente" })

    const user = await User.findOne({
        where: {
            email: email
        }
    })

    if (user) return res.json({ ok: false, status: 401, body: null, message: "No puedes ser usuario y admin al mismo tiempo" })

    if ("sisiato24" != password_admin) return res.json({ ok: false, status: 401, body: null, message: "Datos incorrectos" })

    const pass = await hashPassword(password, 10)

    try {
        const createAdmin = await Admin.create({
            admin_name: user_name,
            email: email,
            password: pass
        })

        return res.json({
            ok: true,
            status: 201,
            body: createAdmin,
            message: "Admin creado"
        })
    } catch (error) {
        return res.json({
            ok: false,
            status: 500,
            body: error
        })
    }
})

export default registerApp