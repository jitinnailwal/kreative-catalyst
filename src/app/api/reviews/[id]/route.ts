import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Review from '@/models/Review';

// GET single review
export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const review = await Review.findById(params.id);
  if (!review) {
    return NextResponse.json({ error: 'Review not found' }, { status: 404 });
  }
  return NextResponse.json(review);
}

// PUT update review
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const body = await request.json();

  const review = await Review.findById(params.id);
  if (!review) {
    return NextResponse.json({ error: 'Review not found' }, { status: 404 });
  }

  if (body.quote !== undefined) review.quote = body.quote;
  if (body.name !== undefined) review.name = body.name;
  if (body.role !== undefined) review.role = body.role;
  if (body.rating !== undefined) review.rating = body.rating;
  if (body.published !== undefined) review.published = body.published;

  await review.save();
  return NextResponse.json(review);
}

// DELETE review
export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const review = await Review.findByIdAndDelete(params.id);
  if (!review) {
    return NextResponse.json({ error: 'Review not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
