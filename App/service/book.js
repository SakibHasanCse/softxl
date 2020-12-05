import Book from './../model/book';
import { NotFound, BadRequest } from './../utils/error';
import mongoose from 'mongoose'

export const getBook = async () => {
    const book = await Book.find()
    if (book) {

        return book;
    }
    return new Error('Somthing went worng');
}

export const singleBooks = async (id) => {

    const book = await Book.findOne({ _id: id, active: true })
    if (book) {

        return book;
    }
    return new Error('Somthing went worng');
}

export const allBooks = async () => {

    const book = await Book.find({ active: true })
    if (book) {

        return book;
    }
    return new Error('Somthing went worng');

}


export const createBook = async (book, image) => {
    let isValid = mongoose.Types.ObjectId.isValid(book.authorId)
    if (!isValid) {
        return new BadRequest('Author id NotFound');

    }
    const oldBook = await Book.findOne({ name: book.name })
    if (oldBook) {
        return new BadRequest(`Book Already exists , Try anuther One`);
    }
    const newbook = new Book({
        name: book.name,
        genre: book.genre,
        authorId: book.authorId,
        image
    })
    const books = await newbook.save()
    if (books) {
        return books
    }
    return new Error('Somthing went worng');

}


export const deleteBook = async (id) => {
    const books = await Book.findById(id)
    if (!books) {
        return new NotFound(`Book Not Found`)
    }
    const book = await Book.deleteOne({ _id: id })
    if (book) {
        return book
    }
    new Error(`Somthing went wrong`)


}

export const updateBook = async (body, id) => {
    const book = await Book.findOne({ _id: id })
    if (!book) {
        return new Error(`Book Not Found`)
    }
    const result = await Book.findByIdAndUpdate(id, body, { new: true, runValidators: true })
    if (result) {
        return result
    }
    return new Error(`Somthing went wrong`)


}