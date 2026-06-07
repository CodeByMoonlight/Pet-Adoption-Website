import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "ok" });
}
// import { NextRequest, NextResponse } from 'next/server';
// // import { prisma } from '@/lib/prisma';
// // import { Prisma } from '@prisma/client';
// import { writeFile } from 'fs/promises';
// import path from 'path';

// type PetPayload = {
//     name: string;
//     breed: string;
//     type: string;
//     sex: string;
//     age: number;
//     location: string;
//     description: string;
//     traits: string | string[];
//     primaryCol: string;
//     accentCol: string;
//     image?: string;
//     isLiked?: boolean;
// };

// // GET /api/pets - Get all pets
// export async function GET() {
//     try {
//         const pets = await prisma.pet.findMany({
//             orderBy: {
//                 createdAt: 'desc',
//             },
//         });
//         return NextResponse.json(pets);
//     } catch (error) {
//         console.error('Error fetching pets:', error);
//         return NextResponse.json(
//             { error: 'Failed to fetch pets' },
//             { status: 500 }
//         );
//     }
// }

// // POST /api/pets - Create a new pet
// export async function POST(request: NextRequest) {
//     try {
//         const contentType = request.headers.get('content-type');
//         let imageUrl = '';
//         let petData: PetPayload;

//         // Handle multipart/form-data (file upload)
//         if (contentType?.includes('multipart/form-data')) {
//             const formData = await request.formData();
//             const file = formData.get('file') as File;

//             if (file) {
//                 const bytes = await file.arrayBuffer();
//                 const buffer = Buffer.from(bytes);

//                 // Generate unique filename
//                 const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
//                 const filepath = path.join(process.cwd(), 'public/images', filename);

//                 // Save file to public/images
//                 await writeFile(filepath, buffer);
//                 imageUrl = `/images/${filename}`;
//             }

//             // Extract other form data
//             petData = {
//                 name: formData.get('name') as string,
//                 breed: formData.get('breed') as string,
//                 type: formData.get('type') as string,
//                 sex: formData.get('sex') as string,
//                 age: parseInt(formData.get('age') as string),
//                 location: formData.get('location') as string,
//                 description: (formData.get('description') as string) || '',
//                 traits: (formData.get('traits') as string) || '',
//                 primaryCol: formData.get('primaryCol') as string,
//                 accentCol: formData.get('accentCol') as string,
//             };
//         } else {
//             // Handle JSON data (URL-based image)
//             const body = (await request.json()) as PetPayload;
//             petData = body;
//             imageUrl = body.image || '';
//         }

//         const pet = await prisma.pet.create({
//             data: {
//                 name: petData.name,
//                 breed: petData.breed,
//                 type: petData.type.toLowerCase(),
//                 sex: petData.sex,
//                 age: petData.age,
//                 location: petData.location,
//                 description: petData.description,
//                 image: imageUrl,
//                 primaryCol: petData.primaryCol,
//                 accentCol: petData.accentCol,
//                 traits:
//                     typeof petData.traits === 'string'
//                         ? petData.traits
//                         : Array.isArray(petData.traits)
//                           ? petData.traits.join(',')
//                           : null,
//                 isLiked: false,
//             },
//         });

//         return NextResponse.json(pet, { status: 201 });
//     } catch (error) {
//         console.error('Error creating pet:', error);
//         return NextResponse.json(
//             { error: 'Failed to create pet' },
//             { status: 500 }
//         );
//     }
// }

// // PATCH /api/pets - Update a pet
// export async function PATCH(request: NextRequest) {
//     try {
//         const contentType = request.headers.get('content-type');
//         let imageUrl: string | undefined = undefined;
//         const updateData: Prisma.PetUpdateInput = {};
//         let petId: number;

//         // Handle multipart/form-data (file upload)
//         if (contentType?.includes('multipart/form-data')) {
//             const formData = await request.formData();
//             const file = formData.get('file') as File;

//             if (file) {
//                 const bytes = await file.arrayBuffer();
//                 const buffer = Buffer.from(bytes);

//                 // Generate unique filename
//                 const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
//                 const filepath = path.join(process.cwd(), 'public/images', filename);

//                 // Save file to public/images
//                 await writeFile(filepath, buffer);
//                 imageUrl = `/images/${filename}`;
//             }

//             // Extract other form data
//             petId = parseInt(formData.get('id') as string);

//             const name = formData.get('name');
//             if (name !== null) updateData.name = name as string;

//             const breed = formData.get('breed');
//             if (breed !== null) updateData.breed = breed as string;

//             const type = formData.get('type');
//             if (type !== null) updateData.type = type as string;

//             const sex = formData.get('sex');
//             if (sex !== null) updateData.sex = sex as string;

//             const age = formData.get('age');
//             if (age !== null) updateData.age = parseInt(age as string);

//             const location = formData.get('location');
//             if (location !== null) updateData.location = location as string;

//             const description = formData.get('description');
//             if (description !== null) updateData.description = description as string;

//             const traits = formData.get('traits');
//             if (traits !== null) updateData.traits = traits as string;

//             const primaryCol = formData.get('primaryCol');
//             if (primaryCol !== null) updateData.primaryCol = primaryCol as string;

//             const accentCol = formData.get('accentCol');
//             if (accentCol !== null) updateData.accentCol = accentCol as string;

//             const isLiked = formData.get('isLiked');
//             if (isLiked !== null) updateData.isLiked = isLiked === 'true';

//             if (imageUrl) updateData.image = imageUrl;
//         } else {
//             // Handle JSON data
//             const body = (await request.json()) as {
//                 id: number;
//                 name?: string;
//                 breed?: string;
//                 type?: string;
//                 sex?: string;
//                 age?: number;
//                 location?: string;
//                 description?: string;
//                 image?: string;
//                 traits?: string;
//                 primaryCol?: string;
//                 accentCol?: string;
//                 isLiked?: boolean;
//             };
//             petId = body.id;

//             if (body.name !== undefined) updateData.name = body.name;
//             if (body.breed !== undefined) updateData.breed = body.breed;
//             if (body.type !== undefined) updateData.type = body.type;
//             if (body.sex !== undefined) updateData.sex = body.sex;
//             if (body.age !== undefined) updateData.age = body.age;
//             if (body.location !== undefined) updateData.location = body.location;
//             if (body.description !== undefined)
//                 updateData.description = body.description;
//             if (body.image !== undefined) updateData.image = body.image;
//             if (body.traits !== undefined) updateData.traits = body.traits;
//             if (body.primaryCol !== undefined)
//                 updateData.primaryCol = body.primaryCol;
//             if (body.accentCol !== undefined)
//                 updateData.accentCol = body.accentCol;
//             if (body.isLiked !== undefined) updateData.isLiked = body.isLiked;
//         }

//         if (!petId) {
//             return NextResponse.json(
//                 { error: 'Pet ID is required' },
//                 { status: 400 }
//             );
//         }

//         const pet = await prisma.pet.update({
//             where: { id: Number(petId) },
//             data: updateData,
//         });

//         return NextResponse.json(pet);
//     } catch (error) {
//         console.error('Error updating pet:', error);
//         return NextResponse.json(
//             { error: 'Failed to update pet' },
//             { status: 500 }
//         );
//     }
// }

// // DELETE /api/pets - Delete a pet
// export async function DELETE(request: NextRequest) {
//     try {
//         const body = await request.json();
//         const petId = body.id;

//         if (!petId) {
//             return NextResponse.json(
//                 { error: 'Pet ID is required' },
//                 { status: 400 }
//             );
//         }

//         await prisma.pet.delete({
//             where: { id: Number(petId) },
//         });

//         return NextResponse.json({ message: 'Pet deleted successfully' });
//     } catch (error) {
//         console.error('Error deleting pet:', error);
//         return NextResponse.json(
//             { error: 'Failed to delete pet' },
//             { status: 500 }
//         );
//     }
// }