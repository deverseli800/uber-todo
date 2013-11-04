var Mongoose = require('mongoose');

exports.TodoSchema = new Mongoose.Schema({
  description : { type : String, required : true },
  due : { type : Date, required : true },
  done : { type : Boolean, default : false },
  title :  { type : String, required : true },
  orbit:  { type : String, required : false },
  ttl: { type : Number, required : false },
  angle: { type: Number, required: false}
});