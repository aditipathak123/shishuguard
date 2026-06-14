import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectDB from '@/lib/connectDB';
import Memory from '@/app/models/Memory.model';
import { authenticateToken } from '@/lib/auth';
import { hasCloudinaryConfig, uploadImage } from '@/lib/cloudinary';

const MAX_UPLOAD_SIZE = 10 * 1024 * 1024;

export async function DELETE(req, context) {
  try {
    await connectDB();

    const { id: memoryId } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(memoryId)) {
      return NextResponse.json({ error: 'Invalid memory id' }, { status: 400 });
    }

    const user = await authenticateToken(req);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const memory = await Memory.findById(memoryId);
    if (!memory) {
      return NextResponse.json({ message: 'Memory already deleted' }, { status: 200 });
    }

    if (memory.user.toString() !== user.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await Memory.findByIdAndDelete(memoryId);
    return NextResponse.json({ message: 'Memory deleted' }, { status: 200 });

  } catch (err) {
    console.error('[MEMORY_DELETE_ERROR]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req, context) {
  try {

    await connectDB();
    const { id: memoryId } = await context.params;
    const user = await authenticateToken(req);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const memory = await Memory.findById(memoryId);
    if (!memory) {
      return NextResponse.json({ error: 'Memory not found' }, { status: 404 });
    }

    if (memory.user.toString() !== user?.user?.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const formData = await req.formData();
    const file = formData.get("file");
    const tags = formData.get("tags") || "";

    const updatedFields = {
      title: formData.get("title") || memory.title,
      description: formData.get("description") || memory.description,
      type: "image",
      isPublic: formData.get("isPublic") === "true",
      tags: String(tags)
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    if (file && typeof file.arrayBuffer === "function" && file.size > 0) {
      if (file.size > MAX_UPLOAD_SIZE || !file.type?.startsWith("image/")) {
        return NextResponse.json(
          { error: "Only image uploads up to 10MB are allowed" },
          { status: 400 }
        );
      }

      if (!hasCloudinaryConfig) {
        return NextResponse.json(
          { error: "Cloudinary upload is not configured" },
          { status: 500 }
        );
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      const base64 = buffer.toString("base64");
      const dataUri = `data:${file.type};base64,${base64}`;
      const imageUrl = await uploadImage(dataUri);

      updatedFields.type = "image";
      updatedFields.file = imageUrl;
    }

    const updatedMemory = await Memory.findByIdAndUpdate(memoryId, updatedFields, { new: true });
    return NextResponse.json({ message: 'Memory updated successfully', memory: updatedMemory }, { status: 200 });

  } catch (err) {
    console.error('[MEMORY_UPDATE_ERROR]', err);
    return NextResponse.json({ error: 'Failed to update memory' }, { status: 500 });
  }
}
