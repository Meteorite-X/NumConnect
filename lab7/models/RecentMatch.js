import { Schema, model } from 'mongoose';

const recentMatchSchema = new Schema({
  name:    String,
  av:      String,
  preview: String,
  unread:  Number,
  time:    String,
  online:  { type: Boolean, default: false }
});

export default model('RecentMatch', recentMatchSchema);
