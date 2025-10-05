import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import connectDB from '@/lib/mongodb';
import Batch from '@/models/Batch';
import Student from '@/models/Student';

export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    // Find the student by clerkUserId
    const student = await Student.findOne({ clerkUserId: userId });
    
    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    // Get all batches where this student is enrolled
    const batches = await Batch.find({ 
      students: student._id 
    })
    .populate('teacherId', 'name university')
    .sort({ createdAt: -1 });

    return NextResponse.json({ batches });

  } catch (error) {
    console.error('Error fetching student batches:', error);
    return NextResponse.json({ 
      error: 'Internal Server Error' 
    }, { status: 500 });
  }
}