import { Schema, model } from 'mongoose';

const messageSchema = new Schema({
  userId: { type: String, required: true, index: true },  // "enkh", "bat" гэх мэт
  sender: String,
  av:     String,
  time:   String,                                          // "14:12"
  text:   String,
  me:     { type: Boolean, default: false }
}, { timestamps: true });

export default model('Message', messageSchema);
