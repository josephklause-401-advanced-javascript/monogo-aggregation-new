const router = require('express').Router();
const Trade = require('../models/trades-model');

router
  .get('/', (req, res, next) => {
    Trade.find()
      .lean()
      .then(trades => res.json(trades))
      .catch(next);
  })
  .get('/topTenHours', (req, res, next) => {
    Trade.topTenHours()
      .then(trades => res.json(trades))
      .catch(next);
  });

module.exports = router;