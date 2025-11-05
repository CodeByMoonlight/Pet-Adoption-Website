'use client';

import { IoPaw } from 'react-icons/io5';
import Image from 'next/image';

type Pet = {
    id: number;
    name: string;
    breed: string;
    sex: string;
    age: number;
    location: string;
    description: string;
    image: string;
    traits: string;
    primaryCol: string;
    accentCol: string;
};

type PetCardProps = {
    pet: Pet;
    onClick?: () => void;
};

function PetCard({ pet, onClick }: PetCardProps) {
    const traits: string[] = Array.isArray(pet.traits)
        ? pet.traits
        : typeof pet.traits === 'string'
          ? pet.traits
                .split(',')
                .map((s) => s.trim())
                .filter(Boolean)
          : [];

    return (
        <div
            className="flex min-h-[372px] w-72 cursor-pointer flex-col justify-between rounded-xl border-3 border-gray-200 p-4 duration-300 hover:scale-105 hover:shadow-lg"
            onClick={onClick}
        >
            <div className="relative min-h-38 w-full overflow-hidden rounded-lg">
                <Image
                    src={pet.image}
                    alt={pet.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 288px"
                    className="object-cover"
                    priority
                />
            </div>
            <div className="flex flex-row items-center justify-between pt-2">
                <div>
                    <h1 className="text-2xl font-bold">{pet.name}</h1>
                    <h2 className="text-sm text-gray-400">{pet.breed}</h2>
                </div>
                <IoPaw
                    className="h-8 w-8 rounded-lg p-1"
                    style={{
                        backgroundColor: pet.accentCol,
                        color: pet.primaryCol,
                    }}
                />
            </div>
            <p className="h-[64px] overflow-hidden text-sm leading-normal">
                {pet.description}
            </p>
            <div className="flex w-[251px] flex-row gap-2 overflow-hidden pt-2">
                {traits.slice(0, 3).map((trait, index) => (
                    <span
                        key={`${trait}-${index}`}
                        className="rounded-full px-3 py-1 text-xs"
                        style={{
                            backgroundColor: pet.accentCol,
                            color: pet.primaryCol,
                        }}
                    >
                        {trait}
                    </span>
                ))}
            </div>
        </div>
    );
}

export default PetCard;
