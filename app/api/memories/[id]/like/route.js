import { NextResponse } from 'next/server';

import connectDB from '@/lib/connectDB';
import { authenticateToken } from '@/lib/auth';
import Memory from '@/app/models/Memory.model';

export async function PUT(request, { params }) {
  try {
    await connectDB();

    const user = await authenticateToken(request);
    const userId = user?.user?.id;

    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const memory = await Memory.findById(id);
    if (!memory) {
      return NextResponse.json(
        { message: 'Memory not found' },
        { status: 404 }
      );
    }
    const likeIndex = memory.likes.findIndex(
      (like) => String(like) === String(userId)
    );

    if (likeIndex === -1) {
      // Like the memory
      memory.likes.push(userId);
    } else {
      // Unlike the memory
      memory.likes.splice(likeIndex, 1);
    }

    await memory.save();

    return NextResponse.json({
      likes: memory.likes,
      isLiked: likeIndex === -1
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: 'Error updating like' },
      { status: 500 }
    );
  }
}
