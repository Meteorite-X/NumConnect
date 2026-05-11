import { Schema, model } from 'mongoose';

const generalMessageSchema = new Schema({
  name:      String,
  av:        String,
  time:      String,
  text:      String,
  gradient:  [String],
  clickable: { type: Boolean, default: false }
}, { timestamps: true });

export default model('GeneralMessage', generalMessageSchema);
