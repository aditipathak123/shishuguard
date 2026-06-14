import { NextResponse } from 'next/server';
import connectDB from '@/lib/connectDB';
import Sleep from '@/app/models/Sleep.model';
import { authenticateToken } from '@/lib/auth';

export async function PATCH(req, context) {
  try {
    await connectDB();
    const user = await authenticateToken(req);
    const data = await req.json();
    const params = await context.params;
    console.log(params)

    const updated = await Sleep.findOneAndUpdate(
      { _id: params.id, userId: user.user.id },
      data,
      { new: true }
    );

    if (!updated) throw new Error("Sleep log not found or unauthorized");
    return NextResponse.json(updated);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const user = await authenticateToken(req);

    const deleted = await Sleep.findOneAndDelete({
      _id: params.id,
      user: user._id,
    });

    if (!deleted) throw new Error("Sleep log not found or unauthorized");
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
