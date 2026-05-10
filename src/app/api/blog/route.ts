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

// GET all blogs
export async function GET() {
  await dbConnect();
  const blogs = await Blog.find().sort({ date: -1 });
  return NextResponse.json(blogs);
}

// POST create new blog
export async function POST(request: NextRequest) {
  await dbConnect();
  const body = await request.json();

  const blog = await Blog.create({
    title: body.title,
    slug: generateSlug(body.title),
    excerpt: body.excerpt || '',
    content: body.content,
    category: body.category || 'General',
    author: body.author || 'Kreative Catalyst',
    date: new Date().toISOString().split('T')[0],
    readTime: estimateReadTime(body.content),
    published: body.published ?? true,
    coverImage: body.coverImage || '',
  });

  return NextResponse.json(blog, { status: 201 });
}
