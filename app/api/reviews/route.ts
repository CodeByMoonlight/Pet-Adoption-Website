import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { writeFile } from 'fs/promises';
import path from 'path';

// GET /api/reviews - Get all reviews
export async function GET() {
    try {
        const reviews = await prisma.review.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
        return NextResponse.json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        return NextResponse.json(
            { error: 'Failed to fetch reviews' },
            { status: 500 }
        );
    }
}

// POST /api/reviews - Create a new review
export async function POST(request: NextRequest) {
    try {
        const contentType = request.headers.get('content-type');
        let imageUrl = '';
        let reviewData: any = {};

        // Handle multipart/form-data (file upload)
        if (contentType?.includes('multipart/form-data')) {
            const formData = await request.formData();
            const file = formData.get('file') as File;

            if (file) {
                const bytes = await file.arrayBuffer();
                const buffer = Buffer.from(bytes);

                // Generate unique filename
                const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
                const filepath = path.join(process.cwd(), 'public/images', filename);

                // Save file to public/images
                await writeFile(filepath, buffer);
                imageUrl = `/images/${filename}`;
            }

            // Extract other form data
            reviewData = {
                name: formData.get('name') as string,
                petName: formData.get('petName') as string,
                rating: parseInt(formData.get('rating') as string),
                review: formData.get('review') as string,
            };
        } else {
            // Handle JSON data (URL-based image)
            const body = await request.json();
            reviewData = body;
            imageUrl = body.img || '';
        }

        const review = await prisma.review.create({
            data: {
                name: reviewData.name,
                petName: reviewData.petName,
                rating: reviewData.rating,
                review: reviewData.review,
                img: imageUrl,
            },
        });

        return NextResponse.json(review, { status: 201 });
    } catch (error) {
        console.error('Error creating review:', error);
        return NextResponse.json(
            { error: 'Failed to create review' },
            { status: 500 }
        );
    }
}
