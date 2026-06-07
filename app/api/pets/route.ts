import { NextRequest, NextResponse } from 'next/server';
import {
  createPet,
  deletePet,
  fileToDataUrl,
  getPets,
  updatePet,
} from '../../../lib/static-store';

type PetPayload = {
  name: string;
  breed: string;
  type: string;
  sex: string;
  age: number;
  location: string;
  description: string;
  traits: string | string[];
  primaryCol: string;
  accentCol: string;
  image?: string;
  isLiked?: boolean;
};

type PetCreatePayload = Parameters<typeof createPet>[0];
type PetUpdatePayload = Parameters<typeof updatePet>[1];

export async function GET() {
  return NextResponse.json(getPets());
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type');
    let imageUrl = '';
    let petData: PetPayload;

    if (contentType?.includes('multipart/form-data')) {
      const formData = await request.formData();
      const file = formData.get('file') as File | null;

      if (file) {
        imageUrl = await fileToDataUrl(file);
      }

      petData = {
        name: formData.get('name') as string,
        breed: formData.get('breed') as string,
        type: formData.get('type') as string,
        sex: formData.get('sex') as string,
        age: parseInt(formData.get('age') as string, 10),
        location: formData.get('location') as string,
        description: (formData.get('description') as string) || '',
        traits: (formData.get('traits') as string) || '',
        primaryCol: formData.get('primaryCol') as string,
        accentCol: formData.get('accentCol') as string,
      };
    } else {
      const body = (await request.json()) as PetPayload;
      petData = body;
      imageUrl = body.image || '';
    }

    const pet = createPet({
      name: petData.name,
      breed: petData.breed,
      type: petData.type,
      sex: petData.sex,
      age: petData.age,
      location: petData.location,
      description: petData.description,
      traits: petData.traits,
      primaryCol: petData.primaryCol,
      accentCol: petData.accentCol,
      image: imageUrl,
      isLiked: petData.isLiked,
    } as PetCreatePayload);

    return NextResponse.json(pet, { status: 201 });
  } catch (error) {
    console.error('Error creating pet:', error);
    return NextResponse.json(
      { error: 'Failed to create pet' },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type');
    let imageUrl: string | undefined;
    let petId: number;
    const updateData: PetUpdatePayload = {};

    if (contentType?.includes('multipart/form-data')) {
      const formData = await request.formData();
      const file = formData.get('file') as File | null;

      if (file) {
        imageUrl = await fileToDataUrl(file);
      }

      petId = parseInt(formData.get('id') as string, 10);

      const name = formData.get('name');
      if (name !== null) updateData.name = name as string;

      const breed = formData.get('breed');
      if (breed !== null) updateData.breed = breed as string;

      const type = formData.get('type');
      if (type !== null) updateData.type = type as string;

      const sex = formData.get('sex');
      if (sex !== null) updateData.sex = sex as string;

      const age = formData.get('age');
      if (age !== null) updateData.age = parseInt(age as string, 10);

      const location = formData.get('location');
      if (location !== null) updateData.location = location as string;

      const description = formData.get('description');
      if (description !== null)
        updateData.description = description as string;

      const traits = formData.get('traits');
      if (traits !== null) updateData.traits = traits as string;

      const primaryCol = formData.get('primaryCol');
      if (primaryCol !== null) updateData.primaryCol = primaryCol as string;

      const accentCol = formData.get('accentCol');
      if (accentCol !== null) updateData.accentCol = accentCol as string;

      const isLiked = formData.get('isLiked');
      if (isLiked !== null) updateData.isLiked = isLiked === 'true';
    } else {
      const body = (await request.json()) as {
        id: number;
        name?: string;
        breed?: string;
        type?: string;
        sex?: string;
        age?: number;
        location?: string;
        description?: string;
        image?: string;
        traits?: string | string[];
        primaryCol?: string;
        accentCol?: string;
        isLiked?: boolean;
      };
      petId = body.id;

      if (body.name !== undefined) updateData.name = body.name;
      if (body.breed !== undefined) updateData.breed = body.breed;
      if (body.type !== undefined) updateData.type = body.type;
      if (body.sex !== undefined) updateData.sex = body.sex;
      if (body.age !== undefined) updateData.age = body.age;
      if (body.location !== undefined) updateData.location = body.location;
      if (body.description !== undefined)
        updateData.description = body.description;
      if (body.image !== undefined) updateData.image = body.image;
      if (body.traits !== undefined) updateData.traits = body.traits;
      if (body.primaryCol !== undefined)
        updateData.primaryCol = body.primaryCol;
      if (body.accentCol !== undefined)
        updateData.accentCol = body.accentCol;
      if (body.isLiked !== undefined) updateData.isLiked = body.isLiked;
    }

    if (imageUrl) {
      updateData.image = imageUrl;
    }

    if (!petId) {
      return NextResponse.json(
        { error: 'Pet ID is required' },
        { status: 400 },
      );
    }

    const pet = updatePet(petId, updateData);

    if (!pet) {
      return NextResponse.json(
        { error: 'Pet not found' },
        { status: 404 },
      );
    }

    return NextResponse.json(pet);
  } catch (error) {
    console.error('Error updating pet:', error);
    return NextResponse.json(
      { error: 'Failed to update pet' },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const petId = Number(body.id);

    if (!petId) {
      return NextResponse.json(
        { error: 'Pet ID is required' },
        { status: 400 },
      );
    }

    const deleted = deletePet(petId);

    if (!deleted) {
      return NextResponse.json(
        { error: 'Pet not found' },
        { status: 404 },
      );
    }

    return NextResponse.json({ message: 'Pet deleted successfully' });
  } catch (error) {
    console.error('Error deleting pet:', error);
    return NextResponse.json(
      { error: 'Failed to delete pet' },
      { status: 500 },
    );
  }
}