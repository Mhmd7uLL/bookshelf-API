import express from 'express';
import {
    saveBook,
    showAllBooks,
    showDetailBookByID,
    changeBookDataByID,
    deleteBookByID,
} from './controller.js';

const router = express.Router();
router.post('/books', saveBook);
router.get('/books', showAllBooks);
router.get('/books/:id', showDetailBookByID);
router.put('/books/:id', changeBookDataByID);
router.delete('/books/:id', deleteBookByID);

export default router;