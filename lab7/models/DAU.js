import { Schema, model } from 'mongoose';

const dauSchema = new Schema({
  day:    String,    // "Да", "Мя" гэх мэт
  value:  Number,
  height: Number,
  order:  Number
});

export default model('DAU', dauSchema);
