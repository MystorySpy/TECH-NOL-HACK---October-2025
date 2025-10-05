import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Batch from '@/models/Batch';
import { auth } from '@clerk/nextjs/server';

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
    console.log('Fetching batch with ID:', batchId);
    await connectDB();

    // Find batch and verify it belongs to the teacher
    const batch = await Batch.findOne({
      _id: batchId,
      clerkTeacherId: userId
    });

    console.log('Found batch:', batch);

    if (!batch) {
      return NextResponse.json({ error: 'Batch not found' }, { status: 404 });
    }

    return NextResponse.json({ batch });

  } catch (error) {
    console.error('Error fetching batch:', error);
    return NextResponse.json({ 
      error: 'Internal Server Error' 
    }, { status: 500 });
  }
}