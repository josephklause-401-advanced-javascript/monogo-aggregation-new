const router = require('express').Router();
const Student = require('../models/students-model');

router
  .get('/', (req, res, next) => {
    Student.find()
      .lean()
      .then(students => res.json(students))
      .catch(next);
  })
  .get('/avgMinMaxGrades', (req, res, next) => {
    Student.avgMinMaxGrades()
      .then(grades => res.json(grades))
      .catch(next);
  });

module.exports = router;