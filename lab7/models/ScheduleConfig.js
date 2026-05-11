import { Schema, model } from 'mongoose';

const scheduleConfigSchema = new Schema({
  key:      { type: String, unique: true, default: 'default' },  // singleton
  days:     [String],
  hours:    [String],
  template: [[String]]
});

export default model('ScheduleConfig', scheduleConfigSchema);
