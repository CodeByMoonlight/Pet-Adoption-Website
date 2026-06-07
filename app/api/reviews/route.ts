import { NextRequest, NextResponse } from 'next/server';
import {
  createReview,
  fileToDataUrl,
  getReviews,
} from '../../../lib/static-store';

type ReviewPayload = {
  name: string;
  petName: string;
  rating: number;
  review?: string;
  img?: string;
};

export async function GET() {
  return NextResponse.json(getReviews());
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type');
    let imageUrl = '';
    let reviewData: ReviewPayload;

    if (contentType?.includes('multipart/form-data')) {
      const formData = await request.formData();
      const file = formData.get('file') as File | null;

      if (file) {
        imageUrl = await fileToDataUrl(file);
      }

      reviewData = {
        name: formData.get('name') as string,
        petName: formData.get('petName') as string,
        rating: parseInt(formData.get('rating') as string, 10),
        review: (formData.get('review') as string) || '',
      };
    } else {
      const body = (await request.json()) as ReviewPayload;
      reviewData = body;
      imageUrl = body.img || '';
    }

    const review = createReview({
      ...reviewData,
      img: imageUrl,
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json(
      { error: 'Failed to create review' },
      { status: 500 },
    );
  }
}
