import * as mongoose from 'mongoose';

const catSchema = new mongoose.Schema({
  date: String,
  nbrP: Number,
  theme: String,
});

const catModel = mongoose.model('cat', catSchema);

export default catModel;
