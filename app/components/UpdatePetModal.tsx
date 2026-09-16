'use client';

import { AiOutlineCloudUpload } from 'react-icons/ai';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
    InputGroup,
    InputGroupInput,
    InputGroupTextarea,
} from '@/components/ui/input-group';
import { Field, FieldLabel } from '@/components/ui/field';

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

type UpdateModalProps = {
    pet: Pet;
    onClose?: () => void;
    onPetUpdate?: (updatedPet: Pet) => void;
};

export default function UpdatePetModal({
    pet,
    onClose,
    onPetUpdate,
}: UpdateModalProps) {
    // States for form handling
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [open, setOpen] = useState(true);
    const [imagePreview, setImagePreview] = useState<string>(pet.image);
    const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [formData, setFormData] = useState({
        name: pet.name,
        breed: pet.breed,
        type: pet.type,
        location: pet.location,
        sex: pet.sex,
        age: pet.age.toString(),
        image: pet.image,
        primaryCol: pet.primaryCol,
        accentCol: pet.accentCol,
        description: pet.description,
        traits: pet.traits,
    });

    useEffect(() => {
        return () => {
            if (closeTimerRef.current) {
                clearTimeout(closeTimerRef.current);
            }
        };
    }, []);

    //Functions
    // Functions for form handling
    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
    ) => {
        const { name, value } = e.target;

        // Handle description character limit
        if (name === 'description' && value.length > 320) {
            return;
        }

        // Handle traits comma limit (max 11 commas = 12 traits)
        if (name === 'traits') {
            const commaCount = (value.match(/,/g) || []).length;
            if (commaCount > 11) {
                return;
            }
        }

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageContainerClick = () => {
        const fileInput = document.getElementById(
            'file-input',
        ) as HTMLInputElement;
        fileInput?.click();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Edit is removed for demo purposes.
            toast.info(
                'This is a live demo — editing is disabled for visitors.',
                { position: 'top-right' },
            );
            onPetUpdate?.({
                ...pet,
                ...formData,
                age: Number(formData.age),
                image: imagePreview,
            });
            setOpen(false);
        } catch (error) {
            console.error('Error updating pet:', error);
        } finally {
            setIsSubmitting(false);
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

    return (
        <div>
            <Dialog open={open} onOpenChange={handleOpenChange}>
                <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
                    <DialogHeader className="text-left">
                        <DialogTitle>Update Record</DialogTitle>
                        <DialogDescription>
                            Modify this pet&apos;s details using the fields
                            below.
                        </DialogDescription>
                    </DialogHeader>

                    <form
                        className="flex flex-col gap-y-3"
                        onSubmit={handleSubmit}
                    >
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="flex flex-col justify-between gap-y-2">
                                <Field>
                                    <FieldLabel htmlFor="inline-end-input">
                                        Pet&apos;s Image
                                    </FieldLabel>
                                    <button
                                        type="button"
                                        className="border-input bg-background hover:bg-accent flex h-46.5 w-full grow cursor-pointer items-center justify-center overflow-hidden rounded-md border border-dashed transition-colors"
                                        onClick={handleImageContainerClick}
                                    >
                                        {imagePreview ? (
                                            <div className="relative h-full w-full">
                                                <Image
                                                    src={imagePreview}
                                                    alt="Preview"
                                                    className="h-full w-full object-cover"
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, 50vw"
                                                />
                                            </div>
                                        ) : (
                                            <div className="text-muted-foreground flex flex-col items-center gap-2 text-center">
                                                <AiOutlineCloudUpload className="h-12 w-12" />
                                                <span className="text-sm">
                                                    Click to upload image
                                                </span>
                                            </div>
                                        )}
                                    </button>
                                    <Input
                                        id="file-input"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                </Field>

                                <span className="grid grid-cols-2 gap-4">
                                    <Field>
                                        <FieldLabel htmlFor="inline-end-input">
                                            Card Primary Color
                                        </FieldLabel>
                                        <InputGroup>
                                            <InputGroupInput
                                                id="primaryCol"
                                                type="color"
                                                name="primaryCol"
                                                value={formData.primaryCol}
                                                onChange={handleInputChange}
                                                className="h-11 w-full p-1"
                                            />
                                        </InputGroup>
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="inline-end-input">
                                            Card Accent Color
                                        </FieldLabel>
                                        <InputGroup>
                                            <InputGroupInput
                                                id="accentCol"
                                                type="color"
                                                name="accentCol"
                                                value={formData.accentCol}
                                                onChange={handleInputChange}
                                                className="h-11 w-full p-1"
                                            />
                                        </InputGroup>
                                    </Field>
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                                <Field>
                                    <FieldLabel htmlFor="inline-end-input">
                                        Name
                                    </FieldLabel>
                                    <InputGroup>
                                        <InputGroupInput
                                            id="name"
                                            type="string"
                                            placeholder="Enter pet's name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </InputGroup>
                                </Field>

                                <Field>
                                    <FieldLabel htmlFor="inline-end-input">
                                        Breed
                                    </FieldLabel>
                                    <InputGroup>
                                        <InputGroupInput
                                            id="breed"
                                            type="string"
                                            placeholder="Enter pet's breed"
                                            value={formData.breed}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </InputGroup>
                                </Field>

                                <Field className="col-span-2">
                                    <FieldLabel htmlFor="inline-end-input">
                                        Location
                                    </FieldLabel>
                                    <InputGroup>
                                        <InputGroupInput
                                            id="location"
                                            type="string"
                                            placeholder="Enter pet's location"
                                            value={formData.location}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </InputGroup>
                                </Field>

                                <Field>
                                    <FieldLabel htmlFor="sex">Sex</FieldLabel>
                                    <InputGroup>
                                        <InputGroupInput
                                            id="sex"
                                            type="string"
                                            placeholder="Enter pet's sex"
                                            value={formData.sex}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </InputGroup>
                                </Field>

                                <Field>
                                    <FieldLabel htmlFor="inline-end-input">
                                        Age (in months)
                                    </FieldLabel>
                                    <InputGroup>
                                        <InputGroupInput
                                            id="age"
                                            type="number"
                                            placeholder="Enter pet's age in months"
                                            value={formData.age}
                                            onChange={handleInputChange}
                                            required
                                            min="0"
                                            max="360"
                                        />
                                    </InputGroup>
                                </Field>

                                <Field className="col-span-2">
                                    <FieldLabel htmlFor="inline-end-input">
                                        Type
                                    </FieldLabel>
                                    <InputGroup>
                                        <InputGroupInput
                                            id="type"
                                            type="string"
                                            placeholder="Enter pet's type"
                                            value={formData.type}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </InputGroup>
                                </Field>
                            </div>
                        </div>

                        <Field>
                            <FieldLabel htmlFor="inline-end-input">
                                Personality (Max 12 traits, separated by commas)
                            </FieldLabel>
                            <InputGroup>
                                <InputGroupInput
                                    id="traits"
                                    type="string"
                                    placeholder="Enter pet's personality traits, separated by commas"
                                    value={formData.traits}
                                    onChange={handleInputChange}
                                    required
                                />
                            </InputGroup>
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="inline-end-input">
                                Description (Max 320 characters)
                            </FieldLabel>
                            <InputGroup>
                                <InputGroupTextarea
                                    id="description"
                                    placeholder="Enter pet's description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className="min-h-28"
                                    required
                                />
                            </InputGroup>
                        </Field>

                        <div className="flex justify-end gap-3 pt-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Updating...' : 'Update Record'}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
