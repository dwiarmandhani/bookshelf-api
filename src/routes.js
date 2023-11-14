const { addBooksHandler, getAllBooksHandler, getBooksByIdHandler, editBukuByIdHandler, deleteBukuByIdHandler } = require("./handler");
const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBooksHandler,
    },
    {
        method:'GET',
        path:'/books',
        handler:getAllBooksHandler,
    },
    {
        method:'GET',
        path:'/books/{id}',
        handler:getBooksByIdHandler
    },
    {
        method:'PUT',
        path:'/books/{id}',
        handler:editBukuByIdHandler
    },
    {
        method: 'DELETE',
        path: '/books/{id}',
        handler: deleteBukuByIdHandler
    },
];

module.exports = routes;