import express from "express"
import dotenv from "dotenv"
import registerApp from "./router/register.js"
import loginApp from "./router/login.js"
import uploadApp from "./router/upload_pdf.js"
import editApp from "./router/editBook.js"
import deleteApp from "./router/deleteBook.js"
import commentApp from "./router/comment.js"
import deleteCommentApp from "./router/deleteComment.js"
import likeApp from "./router/like.js"
import searchBookApp from "./router/searchBook.js"
import showCommentsApp from "./router/showComments.js"
import showBooksApp from "./router/showBooks.js"
import showUsersApp from "./router/showUsers.js"

import cors from "cors"


dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.static('.'));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/register", registerApp)
app.use("/login", loginApp)
app.use("/upload", uploadApp)
app.use("/edit", editApp)
app.use("/delete", deleteApp)
app.use("/comment", commentApp)
app.use("/deleteComment", deleteCommentApp)
app.use("/like", likeApp)
app.use("/searchBook", searchBookApp)
app.use("/showComments", showCommentsApp)
app.use("/showBooks", showBooksApp)
app.use("/showUsers", showUsersApp)



app.listen(PORT, ()=> console.log("Servidor abierto en el puerto " + PORT))
