import { Admin, Book, User } from "../model/book_model.js"


export const bookSend = async( admin_id, author, title, description, gender, book_url, photo_url)=>{
    const admin = await Admin.findOne({
        where: {
            admin_id: admin_id
        }
    })

    if (!admin) {
        console.log({ ok: false, status: 401, body: null, message: "No puedes subir archivos si no eres admin" })
        return
    }
        await Book.sync()
    
    try {
            const createUSer = await Book.create({
                
                admin_id: admin_id,
                author: author,
                title: title,
                description: description,
                gender: gender,
                book_url: book_url,
                photo_url: photo_url
            })
    
            console.log({
                ok: true,
                status: 201,
                body: createUSer
            })
        } catch (error) {
            console.log({
                ok: false,
                status: 500,
                body: error
            })
        }
}