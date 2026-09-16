'use client';

import { IoIosClose } from 'react-icons/io';
import Image from 'next/image';
import { AiFillHeart } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';
import { useState, useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

// Utility function to format age from months
const formatAge = (ageInMonths: number): string => {
    if (ageInMonths < 12) {
        return `${ageInMonths} ${ageInMonths === 1 ? 'month' : 'months'} old`;
    }
    const years = Math.floor(ageInMonths / 12);
    const remainingMonths = ageInMonths % 12;

    if (remainingMonths === 0) {
        return `${years} ${years === 1 ? 'year' : 'years'} old`;
    }
    return `${years} ${years === 1 ? 'year' : 'years'} and ${remainingMonths} ${remainingMonths === 1 ? 'month' : 'months'} old`;
};

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
    const [open, setOpen] = useState(true);
    const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

    const handleOpenChange = (nextOpen: boolean) => {
        setOpen(nextOpen);

        if (!nextOpen) {
            if (closeTimerRef.current) {
                clearTimeout(closeTimerRef.current);
            }

            closeTimerRef.current = setTimeout(() => {
                onClose?.();
            }, 200);
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
        <div>
            <Dialog open={open} onOpenChange={handleOpenChange}>
                <DialogContent
                    className="pet-modal-container max-w-106 flex-col gap-4 lg:w-180 lg:max-w-180 lg:min-w-[20rem] lg:flex-row lg:gap-6"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="relative h-52 w-full min-w-0 overflow-hidden rounded-lg lg:h-auto lg:w-2/5">
                        <Image
                            src={pet.image}
                            alt={pet.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover object-center"
                            priority
                        />
                    </div>
                    <div className="flex w-full min-w-0 flex-col gap-4 lg:flex-1">
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
                                <span>{formatAge(pet.age)}</span>
                                <span> | </span>
                                <span>{pet.location}</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1">
                                <h2 className="text-sm font-semibold tracking-wider">
                                    ABOUT
                                </h2>
                                <p className="text-base leading-6.5">
                                    {pet.description}
                                </p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h2 className="text-sm font-semibold tracking-wider">
                                    PERSONALITY
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    {traits.map((trait, index) => (
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
                        </div>
                        <Button
                            className="btn"
                            onClick={() => {
                                handleClose();
                                onAdopt?.();
                            }}
                        >
                            Adopt
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
