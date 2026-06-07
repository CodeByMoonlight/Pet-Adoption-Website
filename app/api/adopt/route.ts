import { NextRequest, NextResponse } from 'next/server';
import {
  createAdoption,
  getAdoptions,
} from '../../../lib/static-store';

export async function GET() {
  return NextResponse.json(getAdoptions());
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const adopt = createAdoption({
      name: body.name,
      petId: body.petId,
      address: body.address,
      email: body.email,
      phoneNo: body.phoneNo,
      reason: body.reason,
    });

    return NextResponse.json(adopt, { status: 201 });
  } catch (error) {
    console.error('Error creating adopt:', error);
    return NextResponse.json(
      { error: 'Failed to create adopt' },
      { status: 500 },
    );
  }
}