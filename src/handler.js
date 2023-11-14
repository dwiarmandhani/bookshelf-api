const books = require('./books');

const addBooksHandler = async (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

    // Menggunakan dynamic import untuk mengimpor modul nanoid
    const nanoidModule = await import('nanoid');
    const { nanoid } = nanoidModule;

    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    var finished = false;
    if (pageCount === readPage) {
        finished = true;
    };

    const newBooks = {
        id, name, year, author, summary, publisher, pageCount, readPage, reading, finished, insertedAt, updatedAt
    };

    books.push(newBooks);

    const isSuccess = books.filter((book) => book.id === id).length > 0;

    if(isSuccess){
        if(name && name !== ""){
            if(readPage > pageCount){
                const response = h.response({
                    status: 'fail',
                    message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
                   
                });
                response.code(400);
                return response;
            } else {
                const response = h.response({
                    status: 'success',
                    message: 'Buku berhasil ditambahkan',
                    data: {
                        bookId: id,
                    },
                });
                response.code(201);
                return response;
            }
        } else {
            const response = h.response({
                status: 'fail',
                message: 'Gagal menambahkan buku. Mohon isi nama buku',
            });
            response.code(400);
            return response;
        }
    }
    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal ditambahkan',
    });

    response.code(500);
    return response;
};

const getAllBooksHandler = () => {
    const bookArray = books;

    if(bookArray.length > 0){
        const books = bookArray.map(book => {
            return {
            id: book.id,
            name: book.name,
            publisher: book.publisher
            };
        });
        return {
            status: 'success',
            data: {
                books,
            },
        };
    }

    return {
        status: 'success',
        data: {
            books,
        },
    };
}

const getBooksByIdHandler = (request, h) => {
    const { id } = request.params;
    const book = books.filter((n) => n.id === id)[0];
    if (book !== undefined) {
        const isFinished = book.finished;
        if(isFinished === true){
            return {
                status: 'success',
                message: 'Halaman buku telah dibaca',
                data: {
                  book
                },
            };
        } else {
            return {
                status: 'success',
                data: {
                  book
                },
            };
        }
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    });

    response.code(404);
    return response;

}

const editBukuByIdHandler = (request, h) => {
    const { id } = request.params;
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

    const updatedAt = new Date().toISOString();
    const index = books.findIndex((book) => book.id === id);
    const insertedAt = books.filter((n) => n.id === id)[0].insertedAt;

    if(index !== -1){
        if(name && name !== ""){
            if(readPage > pageCount){
                const response = h.response({
                    status: 'fail',
                    message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
                
                });
                response.code(400);
                return response;
            } else {
                books[index] = {
                    ...books[index],
                    name,
                    year,
                    author,
                    summary,
                    publisher,
                    pageCount,
                    readPage,
                    reading,
                    insertedAt,
                    updatedAt
                };
                const response = h.response({
                    status: 'success',
                    message: 'Buku berhasil diperbarui',
                
                });
                response.code(200);
                return response;

            }
        } else {
            const response = h.response({
                status: 'fail',
                message: 'Gagal memperbarui buku. Mohon isi nama buku',
            
            });
            response.code(400);
            return response;
        }
    } else {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Id tidak ditemukan',
        
        });
        response.code(404);
        return response;
    }

}

const deleteBukuByIdHandler = (request, h) => {
    const { id } = request.params;

    const index = books.findIndex((book) => book.id === id);
    const book = books.filter((n) => n.id === id)[0];
    if (index !== -1){
        const isFinished =  book.finished;
        if (isFinished === true) {
            books.splice(index, 1);
            const response = h.response({
              status: 'success',
              message: 'Buku yang telah dibaca, berhasil dihapus',
            });
            response.code(200);
            return response;
        } else {
            books.splice(index, 1);
            const response = h.response({
              status: 'success',
              message: 'Buku berhasil dihapus',
            });
            response.code(200);
            return response;
        }

    } else {
        const response = h.response({
            status: 'fail',
            message: 'Buku gagal dihapus. Id tidak ditemukan',
        
        });
        response.code(404);
        return response;
    }
}
module.exports = { addBooksHandler, getAllBooksHandler, getBooksByIdHandler, editBukuByIdHandler,deleteBukuByIdHandler };

