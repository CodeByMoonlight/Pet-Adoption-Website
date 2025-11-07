'use client';

import { IoPaw } from 'react-icons/io5';
import { FiEdit } from 'react-icons/fi';
import { FaRegTrashAlt } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

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
            className="border-main-gray flex min-h-[23.25rem] w-72 cursor-pointer flex-col justify-between rounded-xl border-3 bg-white p-4 duration-300 hover:scale-105 hover:shadow-lg"
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
            <div className="flex flex-row items-center justify-between">
                <div className="w-full">
                    <div className="flex flex-row justify-between">
                        <h1 className="text-2xl font-bold">{pet.name}</h1>
                        {isAdmin && (
                            <div className="flex flex-row gap-2">
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onEdit?.();
                                    }}
                                    className=""
                                    aria-label="Edit"
                                >
                                    <FiEdit className="h-6 w-6 cursor-pointer rounded-sm p-1 text-blue-900 hover:bg-blue-100" />
                                </button>
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDelete?.();
                                    }}
                                    className=""
                                    aria-label="Delete"
                                >
                                    <FaRegTrashAlt className="h-6 w-6 cursor-pointer rounded-sm p-1 text-red-900 hover:bg-red-100" />
                                </button>
                            </div>
                        )}
                    </div>
                    <h2 className="text-sm !text-gray-400">{pet.breed}</h2>
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
            <p className="h-[4rem] overflow-hidden text-sm leading-normal">
                {pet.description}
            </p>
            <div className="flex w-[15.688rem] flex-row gap-2 overflow-hidden pt-2">
                {traits.slice(0, 3).map((trait, index) => (
                    <div
                        key={`${trait}-${index}`}
                        className="rounded-full px-3 py-1 text-xs"
                        style={{
                            backgroundColor: pet.accentCol,
                            color: pet.primaryCol,
                        }}
                    >
                        {trait}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PetCard;
