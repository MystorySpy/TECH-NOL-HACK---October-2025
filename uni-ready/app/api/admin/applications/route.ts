"use server"

// app/api/applications/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Application from '@/models/Application';
import User from '@/models/User';

import { auth } from '@clerk/nextjs/server';
import { ApplicationDTO } from '@/types/applicationDTO';

export async function GET() {
  try {
    await dbConnect();
    const {userId} = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get pending applications
    const applications = await Application.find({ status: 'pending' })
      .sort({ submittedAt: -1 })
      .limit(100);

    // Transform to DTO - only send what the client needs
    const applicationDTOs: ApplicationDTO[] = applications.map(app => ({
      id: app._id.toString(), // Convert ObjectId to string
      type: app.type,
      status: app.status,
      applicationData: app.applicationData,
      submittedAt: app.submittedAt.toISOString(),
      reviewedAt: app.reviewedAt?.toISOString()
    }));


    return NextResponse.json({ 
      applications: applicationDTOs 
    }, { status: 200 });

  } catch (error) {
    console.error('Application error:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}