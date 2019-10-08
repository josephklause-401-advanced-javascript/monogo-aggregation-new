const router = require('express').Router();
const Book = require('../models/books-model');

router
  .get('/', (req, res, next) => {
    Book.find()
      .lean()
      .then(book => res.json(book))
      .catch(next);
  })
  .get('/avgPageCount', (req, res, next) => {
    Book.pageCount()
      .then(pageCount => res.json(pageCount))
      .catch(next);
  });

module.exports = router;