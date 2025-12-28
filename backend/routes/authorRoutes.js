import express from 'express'
import { createAuthor, getAllAuthors } from '../controllers/authorController.js';

const authorRouter = express.Router();

authorRouter.get('/', getAllAuthors);

authorRouter.post('/', createAuthor);

export default authorRouter

