import { Schema, model } from 'mongoose';

const statSchema = new Schema({
  value: String,
  label: String,
  order: Number
});

export default model('Stat', statSchema);
