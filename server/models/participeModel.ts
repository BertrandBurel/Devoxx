import * as mongoose from 'mongoose';

const participeSchema = new mongoose.Schema({
  players: Array,
});

const participeModel = mongoose.model('participe', participeSchema);

export default participeModel;
