import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import connectDB from '@/lib/mongodb';
import Batch from '@/models/Batch';
import Student from '@/models/Student';
import Teacher from '@/models/Teacher';
import mongoose from 'mongoose';

export async function GET(
  req: Request,
  { params }: { params: { batchId: string } }
) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { batchId } = params;

    // Validate batchId format
    if (!mongoose.Types.ObjectId.isValid(batchId)) {
      return NextResponse.json({ error: 'Invalid batch ID format' }, { status: 400 });
    }

    await connectDB();

    // Find the student
    const student = await Student.findOne({ clerkUserId: userId });
    
    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    // Find the batch and verify student is enrolled
    const batch = await Batch.findOne({
      _id: new mongoose.Types.ObjectId(batchId),
      students: student._id
    });

    if (!batch) {
      return NextResponse.json({ error: 'Batch not found or access denied' }, { status: 404 });
    }

    // Get teacher information
    const teacher = await Teacher.findOne({ 
      clerkUserId: batch.clerkTeacherId 
    }).select('name university email');

    const batchWithTeacher = {
      ...batch.toObject(),
      teacherInfo: teacher || { name: 'Unknown', university: 'Unknown' }
    };

    return NextResponse.json({ batch: batchWithTeacher });

  } catch (error) {
    console.error('Error fetching student batch:', error);
    return NextResponse.json({ 
      error: 'Internal Server Error' 
    }, { status: 500 });
  }
}