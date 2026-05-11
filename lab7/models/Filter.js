import { Schema, model } from 'mongoose';

const filterSchema = new Schema({
  label:  { type: String, required: true },
  active: { type: Boolean, default: false },
  order:  Number
});

export default model('Filter', filterSchema);
