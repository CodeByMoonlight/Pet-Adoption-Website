import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { writeFile } from 'fs/promises';
import path from 'path';

// GET /api/pets - Get all pets
export async function GET() {
    try {
        const pets = await prisma.pet.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
        return NextResponse.json(pets);
    } catch (error) {
        console.error('Error fetching pets:', error);
        return NextResponse.json(
            { error: 'Failed to fetch pets' },
            { status: 500 }
        );
    }
}

// POST /api/pets - Create a new pet
export async function POST(request: NextRequest) {
    try {
        const contentType = request.headers.get('content-type');
        let imageUrl = '';
        let petData: any = {};

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
            petData = {
                name: formData.get('name') as string,
                breed: formData.get('breed') as string,
                sex: formData.get('sex') as string,
                age: parseInt(formData.get('age') as string),
                location: formData.get('location') as string,
                description: formData.get('description') as string,
                traits: formData.get('traits') as string,
                primaryCol: formData.get('primaryCol') as string,
                accentCol: formData.get('accentCol') as string,
            };
        } else {
            // Handle JSON data (URL-based image)
            const body = await request.json();
            petData = body;
            imageUrl = body.image || '';
        }

        const pet = await prisma.pet.create({
            data: {
                name: petData.name,
                breed: petData.breed,
                sex: petData.sex,
                age: petData.age,
                location: petData.location,
                description: petData.description,
                image: imageUrl,
                primaryCol: petData.primaryCol,
                accentCol: petData.accentCol,
                traits:
                    typeof petData.traits === 'string'
                        ? petData.traits
                        : Array.isArray(petData.traits)
                          ? petData.traits.join(',')
                          : null,
                isLiked: false,
            },
        });

        return NextResponse.json(pet, { status: 201 });
    } catch (error) {
        console.error('Error creating pet:', error);
        return NextResponse.json(
            { error: 'Failed to create pet' },
            { status: 500 }
        );
    }
}

// PATCH /api/pets - Update a pet
export async function PATCH(request: NextRequest) {
    try {
        const contentType = request.headers.get('content-type');
        let imageUrl: string | undefined = undefined;
        let updateData: any = {};
        let petId: number;

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
            petId = parseInt(formData.get('id') as string);
            
            const fields = ['name', 'breed', 'sex', 'age', 'location', 'description', 'traits', 'primaryCol', 'accentCol', 'isLiked'];
            fields.forEach(field => {
                const value = formData.get(field);
                if (value !== null) {
                    if (field === 'age') {
                        updateData[field] = parseInt(value as string);
                    } else if (field === 'isLiked') {
                        updateData[field] = value === 'true';
                    } else {
                        updateData[field] = value as string;
                    }
                }
            });
            if (imageUrl) updateData.image = imageUrl;
        } else {
            // Handle JSON data
            const body = await request.json();
            petId = body.id;

            // Build update object with only provided fields
            const fields = ['name', 'breed', 'sex', 'age', 'location', 'description', 'image', 'traits', 'primaryCol', 'accentCol', 'isLiked'];
            fields.forEach(field => {
                if (body[field] !== undefined) {
                    updateData[field] = body[field];
                }
            });
        }

        if (!petId) {
            return NextResponse.json(
                { error: 'Pet ID is required' },
                { status: 400 }
            );
        }

        const pet = await prisma.pet.update({
            where: { id: Number(petId) },
            data: updateData,
        });

        return NextResponse.json(pet);
    } catch (error) {
        console.error('Error updating pet:', error);
        return NextResponse.json(
            { error: 'Failed to update pet' },
            { status: 500 }
        );
    }
}

// DELETE /api/pets - Delete a pet
export async function DELETE(request: NextRequest) {
    try {
        const body = await request.json();
        const petId = body.id;

        if (!petId) {
            return NextResponse.json(
                { error: 'Pet ID is required' },
                { status: 400 }
            );
        }

        await prisma.pet.delete({
            where: { id: Number(petId) },
        });

        return NextResponse.json({ message: 'Pet deleted successfully' });
    } catch (error) {
        console.error('Error deleting pet:', error);
        return NextResponse.json(
            { error: 'Failed to delete pet' },
            { status: 500 }
        );
    }
}