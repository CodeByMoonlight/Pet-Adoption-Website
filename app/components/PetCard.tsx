'use client';

import { IoPaw } from 'react-icons/io5';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { SquarePen, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type Pet = {
    id: number;
    name: string;
    breed: string;
    type: string;
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
    onEdit?: () => void;
    onDelete?: () => void;
};

function PetCard({ pet, onClick, onEdit, onDelete }: PetCardProps) {
    const pathname = usePathname();
    const isAdmin = pathname.includes('/admin');
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
            className="border-main-gray flex min-h-82 w-80 cursor-pointer flex-col gap-2.5 rounded-xl border bg-white p-4 drop-shadow-lg drop-shadow-gray-200 duration-300 hover:scale-105 hover:shadow-lg"
            onClick={onClick}
        >
            <div className="relative min-h-42 w-full overflow-hidden rounded-lg">
                <Image
                    src={pet.image}
                    alt={pet.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 288px"
                    className="object-cover"
                    priority
                />
            </div>
            <div className="flex flex-row items-center justify-between">
                <div className="w-full">
                    <div className="flex flex-row justify-between">
                        <span>
                            <h1 className="text-2xl font-bold">{pet.name}</h1>
                            <h2 className="pt-0.5 text-sm text-gray-400!">
                                {pet.breed}
                            </h2>
                        </span>
                        {isAdmin && (
                            <div className="flex flex-row items-center gap-2 justify-self-center">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onEdit?.();
                                    }}
                                    className="h-7 w-7 rounded-full p-1! text-blue-800 hover:cursor-pointer hover:bg-blue-100 hover:text-blue-900"
                                >
                                    <SquarePen />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDelete?.();
                                    }}
                                    className="h-7 w-7 rounded-full p-1! text-red-800 hover:cursor-pointer hover:bg-red-100 hover:text-red-900"
                                >
                                    <Trash2 />
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
                {!isAdmin && (
                    <div className="min-h-fit min-w-fit">
                        <IoPaw
                            className="h-8 w-8 rounded-lg p-1"
                            style={{
                                backgroundColor: pet.accentCol,
                                color: pet.primaryCol,
                            }}
                        />
                    </div>
                )}
            </div>
            <p className="line-clamp-3 flex-1 truncate overflow-hidden leading-6">
                {pet.description}
            </p>
            <div className="flex w-[15.688rem] flex-row gap-2 overflow-hidden pt-2">
                {traits.slice(0, 3).map((trait, index) => (
                    <Badge
                        key={`${trait}-${index}`}
                        style={{
                            backgroundColor: pet.accentCol,
                            color: pet.primaryCol,
                        }}
                    >
                        {trait}
                    </Badge>
                ))}
            </div>
        </div>
    );
}

export default PetCard;
