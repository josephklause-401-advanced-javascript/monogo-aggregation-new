const router = require('express').Router();
const Grade = require('../models/grades-model');

router
  .get('/', (req, res, next) => {
    Grade.find()
      .lean()
      .then(grades => res.json(grades))
      .catch(next);
  })
  .get('/avgScore', (req, res, next) => {
    Grade.avgScore()
      .then(grades => res.json(grades))
      .catch(next);
  });

module.exports = router;