const express = require('express');
const router = express.Router();
const {Book} = require('../models');
const fileMiddleware = require('../middleware/file');

const stor = {
    books: [],
};

[1, 2, 3].map(el => {
    const newBook = new Book(`Book - ${el}`, `description book - ${el}`);
    stor.books.push(newBook);
});

router.get('/', (req, res) => {
    const {books} = stor;
    res.json(books);
});

router.get('/:id', (req, res) => {
    const {books} = stor;
    const {id} = req.params;
    const index = books.findIndex(el => el.id === id);

    if (index !== -1) {
        res.json(books[index]);
    } else {
        res.status(404);
        res.json("book | not found");
    }
});

router.post('/', (req, res) => {
    const {books} = stor;
    const {title, description, favorite, fileCover, fileName, fileBook} = req.body;

    const newBook = new Book(title, description, favorite, fileCover, fileName, fileBook);
    books.push(newBook);

    res.status(201);
    res.json(newBook);
});

router.put('/:id', (req, res) => {
    const {books} = stor;
    const {title, description, favorite, fileCover, fileName, fileBook} = req.body;
    const {id} = req.params;
    const index = books.findIndex(el => el.id === id);

    if (index !== -1) {
        books[index] = {
            ...books[index],
            title,
            description,
            favorite,
            fileCover,
            fileName,
            fileBook
        };
        res.json(books[index]);
    } else {
        res.status(404);
        res.json("book | not found");
    }
});

router.delete('/:id', (req, res) => {
    const {books} = stor;
    const {id} = req.params;
    const index = books.findIndex(el => el.id === id);

    if (index !== -1) {
        books.splice(index, 1);
        res.json(true);
    } else {
        res.status(404);
        res.json("book | not found");
    }
});

// загрузка файлов
router.post('/upload-img', fileMiddleware.single('cover-img'), (req, res) => {
    if (req.file) {
        const {path} = req.file;
        res.json(path);
    } else {
        res.json(null);
    }
});

router.get('/:id/download', (req, res) => {
    res.download(__dirname + '/../public/img/cover.png', 'cover.png', err=>{
        if (err){
            res.status(404).json();
        }
    });
});

module.exports = router;

