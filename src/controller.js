import { nanoid } from 'nanoid';
import books from './books.js';

export const saveBook = (req, res) => {
    const {
        name, 
        year, 
        author, 
        summary, 
        publisher, 
        pageCount, 
        readPage, 
        reading
    } = req.body;
    
    if (!name) {
        return res.status(400).json({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku'
        })
    }

    if (readPage > pageCount) {
        return res.status(400).json({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
        })
    }

    const id = nanoid(16);
    const finished = pageCount === readPage;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const newBook = {
        id,
        name,
        year,
        author,
        summary, 
        publisher,
        pageCount,
        readPage,
        reading,
        finished,
        insertedAt,
        updatedAt
    }

    books.push(newBook);
    
    return res.status(201).json({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: { 
            bookId: id 
        }
    })

};

export const showAllBooks = (req, res) => {
    const result = books.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher
    }));

    if (books.length === 0){
        return res.json({
            status: 'success',
            data: { books }
        })
    }

    return res.status(200).json({
        status: 'success',
        data: { books: result }
    })
};

export const showDetailBookByID = (req, res) => {
    const { id } = req.params;
    const book = books.find((book) => book.id === id);

    if (book) {
        return res.status(200).json({
            status: 'success',
            data: { book }
        });
    }

    return res.status(404).json({
        status:'fail',
        message: 'Buku tidak ditemukan'
    })
}

export const changeBookDataByID = (req, res) => {
    const { id } = req.params;
    const { 
        name, 
        year, 
        author, 
        summary, 
        publisher, 
        pageCount, 
        readPage, 
        reading 
    } = req.body;

    if (!name){
        return res.status(400).json({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku'
        })
    }

    if (readPage > pageCount) {
        return res.status(400).json({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
        })
    }
    
    const bookIndex = books.findIndex((n) => n.id === id);
    
    if(bookIndex === -1) {
        return res.status(404).json({
            status: 'fail',
            message: 'Gagal memperbarui buku. Id tidak ditemukan'
        })
    }

    const updatedAt = new Date().toISOString();
    const finised = readPage === pageCount;

    books[bookIndex] = { ...books[bookIndex], name, year, author, summary, publisher, pageCount, readPage, reading};
    return res.status(200).json({
        status: 'success',
        message: 'Buku berhasil diperbarui'
    })

} 

export const deleteBookByID = (req, res) => {
    const { id } = req.params;
    const bookIndex = books.findIndex((book) => book.id === id);

    if (bookIndex !== -1){
        books.splice(bookIndex, 1);
        return res.status(200).json({
            status: 'success',
            message: 'Buku berhasil dihapus'
        })
    } else {
        return res.status(404).json({
            status: 'fail',
            message: 'Buku gagal dihapus. Id tidak ditemukan'
        })
    }
}