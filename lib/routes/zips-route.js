const router = require('express').Router();
const Zip = require('../models/zip');

router
  .get('/', (req, res, next) => {
    Zip.find()
      .lean()
      .then(zips => res.json(zips))
      .catch(next);
  })
  .get('/top10StatePops', (req, res, next) => {
    Zip.top10StatePops()
      .then(states => res.json(states))
      .catch(next);
  });

module.exports = router;