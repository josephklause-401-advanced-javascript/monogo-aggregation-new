const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema();

schema.static('topTenHours', function() {
  return this.aggregate([
    {
      $match: {
        ticker: 'abcd'
      }
    }, 
    {
      $project: {
        hour: { $hour: '$time' },
        shares: '$shares'
      }
    }, 
    {
      $group: {
        _id: '$hour',
        count: {
          $sum: '$shares'
        }
      }
    }
  ]);
});

module.exports = mongoose.model('Trade', schema);