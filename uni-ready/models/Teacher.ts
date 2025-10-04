// models/Teacher.ts
import mongoose from 'mongoose';

const TeacherSchema = new mongoose.Schema({
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
  university: {
    type: String,
    required: true,
  },
  program: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  gpa: {
    type: Number,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  teachingStyle: {
    type: String,
  },
  availability: [{
    day: String,
    times: [String],
  }],
  bio: {
    type: String,
  },
  approved: {
    type: Boolean,
    default: false,
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Teacher || mongoose.model('Teacher', TeacherSchema);