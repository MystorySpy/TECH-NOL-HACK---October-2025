// models/Application.ts
import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
  clerkUserId: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['student', 'teacher'],
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  applicationData: {
    type: Object,
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  reviewedAt: Date,
  reviewedBy: String,
});

export default mongoose.models.Application || mongoose.model('Application', ApplicationSchema);