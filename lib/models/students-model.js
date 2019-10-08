const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema();

schema.static('avgMinMaxGrades', function() {
  return this.aggregate([
    {
      $unwind: {
        path: '$scores',
      }
    }, 
    {
      $group: {
        _id: '$scores.type',
        
        average: 
        {
          $avg: '$scores.score'
        },
        min: 
        {
          $min: '$scores.score'
        },
        max: 
        {
          $max: '$scores.score'
        },
      } 
    }
  ]);
});

module.exports = mongoose.model('Student', schema);