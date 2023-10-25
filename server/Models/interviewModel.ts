import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const interviewSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  qa_feedbacks: [{
    type: Schema.Types.ObjectId,
    ref: 'QAFeedback',
  }],
  created_at: {
    type: Date,
    default: Date.now,
  },
  
})

export default mongoose.model('Interview', interviewSchema);