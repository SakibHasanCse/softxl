import { allBooks, createBook, deleteBook, getBook, singleBooks, updateBook } from './../service/book';
export const createBooks = async (req, res, next) => {
    try {
    
        const book = req.body
        let image ;
        image ?  image = req.files.image.data : null
        const newbook = await createBook(book ,image)
        if (newbook instanceof Error) {
            return next(newbook, req, res)
        }
        return res.status(201).json({
            success: true,
            message: 'Book created successfully'
        })
    } catch (error) {
        console.log(error)

        return next(error, req, res)
    }
}

export const getBooks = async (req, res) => {
    const book = await getBook()
    if (book instanceof Error) {
        return next(book, req, res)
    }
    return res.status(200).json({
        success: true,
        length: book.length,
        book
    })
}

export const singleBook = async (req, res) => {
    const id = req.params.id
    const book = await singleBooks(id)
    if (book instanceof Error) {
        return next(book, req, res)
    }
    return res.status(200).json({
        success: true,
        length: book.length,
        book
    })
}

export const allBook = async (req, res, next) => {
    const book = await allBooks()
    if (book instanceof Error) {
        return next(book, req, res)
    }
    return res.status(200).json({
        success: true,
        length: book.length,
        book
    })
}

export const deleteBooks = async (req, res, next) => {
    try {
        const id = req.params.id
        const book = await deleteBook(id)
        console.log(book)
        if (book instanceof Error) {
            return next(book, req, res)
        } else {

            return res.status(200).json({
                success: true,
                message: 'Book deleted successfully'
            })
        }
    } catch (error) {
        return next(error, req, res)

    }

}

export const updateBooks = async (req, res, next) => {
    const id = req.params.id
    const body = req.body
    const book = await updateBook(body, id)
    if (book instanceof Error) {
        return next(book, req, res)
    }
    return res.status(201).json({
        success: true,
        message: 'Book updated successfully'
    })
}