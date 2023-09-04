import mongoose from 'mongoose';
import passportLocalMongoose from "passport-local-mongoose";
import findOrCreate from "mongoose-findorcreate";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: false
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  _id: {
    type: String
  }
})
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);
export default mongoose.model('User', userSchema);