import express from 'express'

import {getAllBooks, getBookById, createBook, updateBook, deleteBook} from '../controllers/bookController.js'

const bookRouter = express.Router();

bookRouter.get("/", getAllBooks);

bookRouter.get("/:id", getBookById);

bookRouter.post("/", createBook);

bookRouter.put("/:id", updateBook);

bookRouter.delete("/:id", deleteBook);

export default bookRouter;