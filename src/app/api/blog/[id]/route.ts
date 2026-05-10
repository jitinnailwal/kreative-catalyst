import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function estimateReadTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

// GET single blog
export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const blog = await Blog.findById(params.id);
  if (!blog) {
    return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
  }
  return NextResponse.json(blog);
}

// PUT update blog
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const body = await request.json();

  const blog = await Blog.findById(params.id);
  if (!blog) {
    return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
  }

  if (body.title !== undefined) {
    blog.title = body.title;
    blog.slug = generateSlug(body.title);
  }
  if (body.excerpt !== undefined) blog.excerpt = body.excerpt;
  if (body.content !== undefined) {
    blog.content = body.content;
    blog.readTime = estimateReadTime(body.content);
  }
  if (body.category !== undefined) blog.category = body.category;
  if (body.author !== undefined) blog.author = body.author;
  if (body.published !== undefined) blog.published = body.published;
  if (body.coverImage !== undefined) blog.coverImage = body.coverImage;

  await blog.save();
  return NextResponse.json(blog);
}

// DELETE blog
export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const blog = await Blog.findByIdAndDelete(params.id);
  if (!blog) {
    return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
