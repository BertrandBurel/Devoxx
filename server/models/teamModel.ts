import * as mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
  name: String,
  weight: Number,
  age: Number,
});

const teamModel = mongoose.model('team', teamSchema);

export default teamModel;
