import { Schema, model } from 'mongoose';

const planFeatureSchema = new Schema({
  yes:  Boolean,
  text: String
}, { _id: false });

const planSchema = new Schema({
  id:       { type: String, unique: true, index: true },
  name:     String,
  price:    Number,
  currency: String,
  period:   String,
  features: [planFeatureSchema]
});

export default model('Plan', planSchema);
