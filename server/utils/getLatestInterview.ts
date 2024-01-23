import mongoose from 'mongoose';
import interviewModel from '../Models/interviewModel';
import qa_feedbackModel from '../Models/qa_feedbackModel';

export async function getLatestInterview(userId) {
  const interview = await interviewModel
    .findOne({ user_id: userId })
    .sort({ _id: -1 });

  const feedbacks = await qa_feedbackModel.find({
    interview_id: interview._id,
  });
  return feedbacks;
}
