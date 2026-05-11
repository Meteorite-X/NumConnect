import { Schema, model } from 'mongoose';

const kpiSchema = new Schema({
  id:         { type: String, unique: true },
  icon:       String,
  iconClass:  String,
  label:      String,
  value:      String,
  valueClass: String,
  change:     String,
  negative:   { type: Boolean, default: false }
});

export default model('KPI', kpiSchema);
