const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema();

schema.static('avgScore', function() {
  return this.aggregate([
    { 
      $group: {
        _id: '$class_id',
        scores: {
          $addToSet: '$scores'
        }
      } 
    }, 
    { 
      $unwind: {
        path: '$scores'
      } }, { $unwind: {
      path: '$scores'
    } 
    }, 
    { 
      $group: {
        _id: {
          'class_id': '$_id',
          'type': '$scores.type'
        },
        avgScore: {
          $avg: '$scores.score'
        }
      } 
    }, 
    { 
      $project: {
        class_id: '$_id.class_id',
        _id: 0,
        type: '$_id.type',
        avgScore: '$avgScore'
      } 
    }
  ]);
});

module.exports = mongoose.model('Grade', schema);