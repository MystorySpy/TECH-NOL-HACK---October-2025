import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Batch from '@/models/Batch';
import Student from '@/models/Student';
import mongoose from 'mongoose';
import { auth } from '@clerk/nextjs/server';
import Teacher from '@/models/Teacher';

export async function POST(
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

    // Find the batch
    const batch = await Batch.findById(batchId);
    
    if (!batch) {
      return NextResponse.json({ error: 'Batch not found' }, { status: 404 });
    }

    // Check if student is already in the batch
    if (batch.students.includes(student._id)) {
      return NextResponse.json({ error: 'Already enrolled in this batch' }, { status: 400 });
    }

    // Add student to batch
    batch.students.push(student._id);
    await batch.save();

    return NextResponse.json({ 
      success: true,
      message: 'Successfully joined batch'
    });

  } catch (error) {
    console.error('Error joining batch:', error);
    return NextResponse.json({ 
      error: 'Internal Server Error' 
    }, { status: 500 });
  }
}
