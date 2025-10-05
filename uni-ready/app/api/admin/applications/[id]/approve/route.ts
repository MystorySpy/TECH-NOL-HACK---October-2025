// app/api/admin/applications/[id]/approve/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import dbConnect from '@/lib/mongodb';
import Application from '@/models/Application';
import User from '@/models/User';
import Teacher from '@/models/Teacher';
import Student from '@/models/Student';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is admin in database (most reliable)
    const adminUser = await User.findOne({ 
      clerkUserId: userId, 
      role: 'admin' 
    });
    
    if (!adminUser) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const application = await Application.findById(params.id);
    
    if (!application) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    if (application.status !== 'pending') {
      return NextResponse.json({ error: 'Application already processed' }, { status: 400 });
    }

    await User.findOneAndUpdate(
        { clerkUserId: application.clerkUserId },
        { 
          approved: true,
        }
    );

    await Application.findByIdAndUpdate(
      params.id,
      { status: 'approved', reviewedAt: new Date() }
    );

    // Update application status
    if (application.type === 'teacher') {
      await Teacher.findOneAndUpdate(
        { clerkUserId: application.clerkUserId },
        { approved: true }
      );
    } else if (application.type === 'student') {
      await Student.findOneAndUpdate(
        { clerkUserId: application.clerkUserId },
        { approved: true }
      );
    }

    return NextResponse.json({ 
      success: true,
      message: 'Application approved successfully'
    });
    
  } catch (error) {
    console.error('Approve application error:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}