import express from 'express';
import { validatorhandler } from '../middlewares/appMid';
import { isAuth, isLibarian } from '../middlewares/auth';
import { createBooks, getBooks, deleteBooks, updateBooks, singleBook, allBook } from './../controllers/book';
import book from './../model/validation/book';
const router = express.Router();




router
    .route('/books')
    .get(isAuth, isLibarian(), getBooks)

router
    .route('/book')
    .get(isAuth, allBook)
    .post(isAuth, isLibarian(),  createBooks)


router
    .route('/book/:id')
    .get(isAuth, singleBook)
    .put(isAuth, isLibarian(), updateBooks)
    .delete(isAuth, isLibarian(), deleteBooks)

export default router
