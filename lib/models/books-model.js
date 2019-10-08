const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema();

schema.static('pageCount', function() {
  return this.aggregate([
    { 
      $unwind: {
        path: '$authors'
      } 
    }, 
    { 
      $group: {
        _id: '$authors',
        averagePageCount: {
          $avg: '$pageCount'
        }
      } 
    }
  ]);
});

module.exports = mongoose.model('Books', schema);