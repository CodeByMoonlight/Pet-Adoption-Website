'use client';

import { IoIosClose } from 'react-icons/io';
import Image from 'next/image';
import { AiFillHeart } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';
import { useState, useEffect } from 'react';

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
    isLiked?: boolean;
};

type ViewModalProps = {
    pet: Pet;
    onClose?: () => void;
    onPetUpdate?: (updatedPet: Pet) => void;
    onAdopt?: () => void;
};

export default function ViewPetModal({
    pet,
    onClose,
    onPetUpdate,
    onAdopt,
}: ViewModalProps) {
    // States for like button
    const [isLiked, setIsLiked] = useState(pet.isLiked || false);
    const [isHovered, setIsHovered] = useState(false);

    // Effects //
    // Reset isLiked when pet changes
    useEffect(() => {
        setIsLiked(pet.isLiked || false);
    }, [pet.id, pet.isLiked]);

    //Functions//
    // Close modal handler
    const handleClose = () => {
        onClose?.();
    };

    // Like button handler
    const handleLikeToggle = async () => {
        const newLikedState = !isLiked;
        setIsLiked(newLikedState);

        try {
            const response = await fetch('/api/pets', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: pet.id,
                    isLiked: newLikedState,
                }),
            });

            if (!response.ok) {
                // Revert on error
                setIsLiked(!newLikedState);
                console.error('Failed to update liked status');
            } else {
                // Update parent component's state
                const updatedPet = await response.json();
                onPetUpdate?.(updatedPet);
            }
        } catch (error) {
            // Revert on error
            setIsLiked(!newLikedState);
            console.error('Error updating liked status:', error);
        }
    };

    // Parse traits into array
    const traits: string[] = Array.isArray(pet.traits)
        ? pet.traits
        : typeof pet.traits === 'string'
          ? pet.traits
                .split(',')
                .map((s) => s.trim())
                .filter(Boolean)
          : [];

    return (
        <div className="modal" onClick={handleClose}>
            <div
                className="pet-modal-container w-[26.5rem] max-w-[26.5rem] min-w-[20rem] flex-col gap-4 lg:w-[45rem] lg:max-w-[45rem] lg:min-w-[20rem] lg:flex-row lg:gap-6"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="relative h-52 w-full overflow-hidden rounded-lg px-36 lg:h-auto lg:w-2/5">
                    <Image
                        src={pet.image}
                        alt={pet.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover object-center"
                        priority
                    />
                </div>
                <div className="flex w-full flex-col gap-4 lg:w-3/5">
                    <div className="modal-header">
                        <div>
                            <div className="flex flex-row items-center gap-2">
                                <h1 className="pb-1 text-4xl font-bold">
                                    {pet.name}
                                </h1>
                                <button
                                    onClick={handleLikeToggle}
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                    className="transition-transform hover:scale-110"
                                >
                                    {isLiked || isHovered ? (
                                        <AiFillHeart className="h-8 w-8 rounded-lg bg-red-100 p-1 text-red-400 transition-colors" />
                                    ) : (
                                        <AiOutlineHeart className="h-8 w-8 rounded-lg bg-red-100 p-1 text-red-400 transition-colors" />
                                    )}
                                </button>
                            </div>

                            <div className="text-sm text-gray-400">
                                <span>{pet.breed}</span>
                                <span> | </span>
                                <span>{pet.sex}</span>
                                <span> | </span>
                                <span>{pet.age} years old</span>
                                <span> | </span>
                                <span>{pet.location}</span>
                            </div>
                        </div>
                        <button className="" onClick={handleClose}>
                            <IoIosClose className="close-btn h-8 w-8" />
                        </button>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <h2 className="text-xl font-bold">ABOUT</h2>
                            <p className="text-base leading-normal">
                                {pet.description}
                            </p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h2 className="text-xl font-bold">PERSONALITY</h2>
                            <div className="flex flex-wrap gap-2">
                                {traits.map((trait, index) => (
                                    <span
                                        key={`${trait}-${index}`}
                                        className="rounded-full px-3 py-2 text-xs"
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
                    </div>
                    <button
                        onClick={() => {
                            handleClose();
                            onAdopt?.();
                        }}
                        className="btn"
                    >
                        Adopt {pet.name}
                    </button>
                </div>
            </div>
        </div>
    );
}
