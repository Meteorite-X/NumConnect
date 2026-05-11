import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  id:          { type: String, required: true, unique: true, index: true },
  name:        { type: String, required: true },
  age:         Number,
  av:          String,
  mbti:        String,
  major:       String,
  year:        String,
  score:       Number,
  online:      { type: Boolean, default: false },
  email:       String,
  plan:        { type: String, enum: ['free', 'premium'], default: 'free' },
  status:      { type: String, enum: ['active', 'reported'], default: 'active' },
  tags:        [String],
  bio:         String,
  commonHours: Number,
  gradient:    [String]
}, { timestamps: true });

export default model('User', userSchema);
