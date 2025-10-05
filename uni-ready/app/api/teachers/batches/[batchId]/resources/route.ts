import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import connectDB from '@/lib/mongodb';
import Batch from '@/models/Batch';
import mongoose from 'mongoose';

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

    let body;
    try {
      body = await req.json();
    } catch (error) {
      return NextResponse.json({ error: 'Invalid JSON in request body' }, { status: 400 });
    }

    const { type, title, url, description } = body;
    
    // Validate required fields
    if (!type || !title || !url) {
      return NextResponse.json({ 
        error: 'Missing required fields: type, title, url' 
      }, { status: 400 });
    }

    if (type !== 'link' && type !== 'file') {
      return NextResponse.json({ 
        error: 'Type must be either "link" or "file"' 
      }, { status: 400 });
    }

    await connectDB();

    // Verify batch exists and belongs to teacher
    const batch = await Batch.findOne({
      _id: new mongoose.Types.ObjectId(batchId),
      clerkTeacherId: userId
    });

    if (!batch) {
      return NextResponse.json({ error: 'Batch not found' }, { status: 404 });
    }


    // Create new resource object
    const newResource = {
      type,
      title: title.trim(),
      url: url.trim(),
      description: description?.trim() || '',
      uploadedAt: new Date()
    };

    // Add new resource to the batch
    batch.resources.push(newResource);
    batch.updatedAt = new Date();

    await batch.save();

    return NextResponse.json({ 
      success: true,
      message: 'Resource added successfully',
      resource: newResource
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ 
      error: 'Internal Server Error' 
    }, { status: 500 });
  }
}