"use server"

// app/api/applications/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Application from '@/models/Application';
import User from '@/models/User';

import { auth } from '@clerk/nextjs/server';

export async function GET() {
  try {
    await dbConnect();
    const {userId} = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get pending applications
    const pendingApplications = await Application.find({ status: 'pending' })
    .populate('user')
    .limit(10)


    return NextResponse.json({ 
      pendingApplications 
    }, { status: 200 });

  } catch (error) {
    console.error('Application error:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}