import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Batch from '@/models/Batch';
import Teacher from '@/models/Teacher';
import { auth } from '@clerk/nextjs/server';

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name, description } = await req.json();
    
    await connectDB();

    // Find the teacher to get their subject and verify they exist
    const teacher = await Teacher.findOne({ clerkUserId: userId });
    
    if (!teacher) {
      return NextResponse.json({ error: 'Teacher not found' }, { status: 404 });
    }

    if (!teacher.approved) {
      return NextResponse.json({ error: 'Teacher not approved' }, { status: 403 });
    }

    // Create new batch with teacher's data
    const batch = new Batch({
      teacherId: teacher._id,
      clerkTeacherId: userId,
      name,
      description,
      subject: teacher.subject, // Taken from teacher model
      students: [],
      resources: [],
      isActive: true
    });

    await batch.save();

    return NextResponse.json({ 
      success: true,
      message: 'Batch created successfully'
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating batch:', error);
    return NextResponse.json({ 
      error: 'Internal Server Error' 
    }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    // Get all batches for this teacher using clerkTeacherId
    const batches = await Batch.find({ clerkTeacherId: userId })
      .populate('students', 'name email gradeLevel')
      .sort({ createdAt: -1 });

    return NextResponse.json({ batches });

  } catch (error) {
    console.error('Error fetching batches:', error);
    return NextResponse.json({ 
      error: 'Internal Server Error' 
    }, { status: 500 });
  }
}