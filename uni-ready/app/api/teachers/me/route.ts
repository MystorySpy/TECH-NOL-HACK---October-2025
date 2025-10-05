// app/api/teachers/me/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import Teacher from '@/models/Teacher';

export async function GET() {
  try {
    await dbConnect();
    
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user record to check role and approval
    const user = await User.findOne({ clerkUserId: userId });
    
    if (!user || user.role !== 'teacher') {
      return NextResponse.json({ error: 'Teacher not found' }, { status: 404 });
    }

    // Get teacher profile details
    const teacher = await Teacher.findOne({ clerkUserId: userId });
    
    if (!teacher) {
      return NextResponse.json({ error: 'Teacher profile not found' }, { status: 404 });
    }

    // Combine data
    const teacherData = {
      _id: teacher._id,
      name: teacher.name,
      role: user.role,
      approved: user.approved,
      subject: teacher.subject,
      university: teacher.university,
      students: teacher.students || [],
    }

    return NextResponse.json({ teacher: teacherData });
    
  } catch (error) {
    console.error('Get teacher error:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}