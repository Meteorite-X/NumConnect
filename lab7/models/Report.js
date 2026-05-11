import { Schema, model } from 'mongoose';

const reportSchema = new Schema({
  id:     { type: String, unique: true, index: true },
  icon:   String,
  title:  String,
  detail: String,
  status: { type: String, enum: ['open', 'resolved'], default: 'open', index: true }
}, { timestamps: true });

export default model('Report', reportSchema);
