import mongoose from 'mongoose';

const NotesSchema = new mongoose.Schema({
  title: {type:String},
  description: {type:String},
  color:{type:String},

});


NotesSchema.statics.findById = async function (id) {
  return await this.findOne({ _id: id });
};

mongoose.models = {};
const Notes = mongoose.models.Notes || mongoose.model('Notes', NotesSchema);

export default Notes;