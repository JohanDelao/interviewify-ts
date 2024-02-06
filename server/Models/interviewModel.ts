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
  position: {
    type: String,
    required: true,
  },
  qa_feedbacks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'QAFeedback',
    },
  ],
  score: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

export default mongoose.model('Interview', interviewSchema);
