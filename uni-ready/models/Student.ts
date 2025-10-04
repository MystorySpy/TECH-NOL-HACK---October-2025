// models/Student.ts
import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  clerkUserId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  gradeLevel: {
    type: String,
    required: true,
  },
  subjects: [{
    type: String,
    required: true,
  }],
  school: {
    type: String,
    required: true,
  },
  goals: {
    type: String,
  },
  learningStyle: {
    type: String,
  },
  availability: [{
    type: String,
  }],
  approved: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Student || mongoose.model('Student', StudentSchema);