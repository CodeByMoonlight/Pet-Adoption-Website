import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { writeFile } from 'fs/promises';
import path from 'path';

// GET /api/adopt - Get all adoptions
export async function GET() {
    try {
        const adoptions = await prisma.adopt.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
        return NextResponse.json(adoptions);
    } catch (error) {
        console.error('Error fetching adoptions:', error);
        return NextResponse.json(
            { error: 'Failed to fetch adoptions' },
            { status: 500 }
        );
    }
}

// POST /api/adopt - Create a new adopt
export async function POST(request: NextRequest) {
    try {
        const contentType = request.headers.get('content-type');
        let imageUrl = '';

        const body = await request.json();
        const adopt = await prisma.adopt.create({
            data: {
                name: body.name,
                petId: body.petId,
                address: body.address,
                email: body.email,
                phoneNo: body.phoneNo,
                reason: body.reason,
            },
        });

        return NextResponse.json(adopt, { status: 201 });
    } catch (error) {
        console.error('Error creating adopt:', error);
        return NextResponse.json(
            { error: 'Failed to create adopt' },
            { status: 500 }
        );
    }
}