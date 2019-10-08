const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema();

schema.static('top10StatePops', function() {
  return this.aggregate([
    {
      $group: {
        _id: '$state',
        population: {
          $sum: '$pop'
        }
      }
    }, 
    {
      $sort: {
        population: -1
      }
    }, 
    {
      $limit: 10
    }

  ]);
});

module.exports = mongoose.model('Zip', schema);