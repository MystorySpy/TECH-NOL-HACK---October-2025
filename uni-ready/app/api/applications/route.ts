"use server"

// app/api/applications/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Application from '@/models/Application';
import User from '@/models/User';
import Student from '@/models/Student';
import Teacher from '@/models/Teacher';
import { auth } from '@clerk/nextjs/server';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const {userId} = await auth();
    const body = await request.json();
    const { type, applicationData } = body;

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Create or update user
    const user = await User.findOneAndUpdate(
      { clerkUserId: userId },
      {
        clerkUserId: userId,
        email: applicationData.email,
        role: type,
        approved: false,
      },
      { upsert: true, new: true }
    );

    // Create application
    const application = await Application.create({
      clerkUserId: userId,
      type,
      applicationData,
      status: 'pending',
    });

    // Create specific profile based on type
    if (type === 'student') {
      await Student.create({
        userId: user._id,
        clerkUserId: userId,
        name: applicationData.name,
        age: applicationData.age,
        email: applicationData.email,
        gradeLevel: applicationData.gradeLevel,
        subjects: applicationData.subjects,
        school: applicationData.school,
        goals: applicationData.goals,
        learningStyle: applicationData.learningStyle,
        availability: applicationData.availability,
        approved: false,
      });
    } else if (type === 'teacher') {
      await Teacher.create({
        userId: user._id,
        clerkUserId: userId,
        name: applicationData.name,
        age: applicationData.age,
        email: applicationData.email,
        university: applicationData.university,
        program: applicationData.program,
        year: applicationData.year,
        subject: applicationData.subject,
        gpa: applicationData.gpa,
        experience: applicationData.experience,
        teachingStyle: applicationData.teachingStyle,
        availability: applicationData.availability,
        bio: applicationData.bio,
        approved: false,
      });
    }

    return NextResponse.json({ 
      success: true, 
      applicationId: application._id 
    }, { status: 201 });

  } catch (error) {
    console.error('Application error:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}