import { Router } from "express";
import { Book, Comment, Like, User } from "../model/book_model.js";
import { Op } from 'sequelize';
import { body } from "express-validator";

const searchBookApp = Router()

searchBookApp.post("/search", async (req, res) => {
  try {
    const { search } = req.body;

    const booksAll = await Book.findAll();

    if (!search) {
      return res.json({ ok: false, status: 400, message: "Últimas publicaciones :", body: booksAll });
    }

    const books = await Book.findAll({
      where: {
        [Op.or]: [
          { author: { [Op.like]: `%${search}%` } },
          { title: { [Op.like]: `%${search}%` } },
          { description: { [Op.like]: `%${search}%` } },
          { gender: { [Op.like]: `%${search}%` } }
        ]
      }
    });

    if (books.length === 0) {
      return res.json({ ok: false, status: 404, message: "No se encontraron libros", body: [] });
    }

    return res.json({ ok: true, status: 200, message: "Libros encontrados", body: books });
  } catch (error) {
    return res.json({ ok: false, status: 500, message: "Error interno del servidor", body: error.message });
  }
})

searchBookApp.get("/gender/:gender", async (req, res) => {
  try {
    const { gender } = req.params;

    if (!gender) {
      return res.json({ ok: true, status: 400, message: "El parámetro de búsqueda es obligatorio", body: [] });
    }

    const books = await Book.findAll({
      where: {
        [Op.and]: [
          { gender: { [Op.like]: `%${gender}%` } }
        ]
      }
    });

    if (books.length === 0) {
      return res.json({ ok: true, status: 404, message: "No se encontraron libros", body: [] });
    }

    return res.json({ ok: true, status: 200, message: "Libros encontrados", body: books });
  } catch (error) {
    return res.json({ ok: true, status: 500, message: "Error interno del servidor", body: error.message });
  }
})

searchBookApp.get("/books", async (req, res) => {
  try {

    const books = await Book.findAll({});


    if (books.length === 0) {
      return res.json({ ok: false, status: 404, message: "No hay libros", body: null });
    }

    return res.json({ ok: true, status: 200, message: "Libros encontrados", body: books });

  } catch (error) {
    return res.json({ ok: true, status: 500, message: "Error interno del servidor", body: error.message });
  }
})

searchBookApp.get("/book/:book_id", async (req, res) => {
  try {

    const { book_id } = req.params

    const book = await Book.findOne({
      where: {
        book_id: book_id
      }
    });


    if (!book) {
      return res.json({ ok: false, status: 404, message: "Este libro no existe", body: {} });
    }

    return res.json({ ok: true, status: 200, message: "Libro encontrado", body: book });

  } catch (error) {
    return res.json({ ok: true, status: 500, message: "Error interno del servidor", body: error.message });
  }
})

export default searchBookApp