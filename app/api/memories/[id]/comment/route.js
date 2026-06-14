import { NextResponse } from 'next/server';
import connectDB from '@/lib/connectDB';
import Memory from '@/app/models/Memory.model';
import { authenticateToken } from '@/lib/auth';

export async function POST(req, { params }) {
  await connectDB();
  const user = await authenticateToken(req);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { text } = await req.json();

  const { id } = await params;
  const memory = await Memory.findById(id);
  if (!memory) return NextResponse.json({ error: 'Memory not found' }, { status: 404 });

  memory.comments.push({ user: user.user.id, text });
  await memory.save();

  return NextResponse.json({ comments: memory.comments });
}
