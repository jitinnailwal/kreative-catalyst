import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Review from '@/models/Review';

// GET all reviews
export async function GET() {
  await dbConnect();
  const reviews = await Review.find().sort({ date: -1 });
  return NextResponse.json(reviews);
}

// POST create new review
export async function POST(request: NextRequest) {
  await dbConnect();
  const body = await request.json();

  const review = await Review.create({
    quote: body.quote,
    name: body.name,
    role: body.role || '',
    rating: body.rating ?? 5,
    published: body.published ?? true,
    date: new Date().toISOString().split('T')[0],
  });

  return NextResponse.json(review, { status: 201 });
}
