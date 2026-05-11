import { Schema, model } from 'mongoose';

const featureSchema = new Schema({
  icon:      String,
  iconClass: String,
  title:     String,
  desc:      String,
  order:     Number
});

export default model('Feature', featureSchema);
