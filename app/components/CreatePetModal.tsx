'use client';

import { IoIosClose } from 'react-icons/io';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { useState } from 'react';

type CreateModalProps = {
    onClose?: () => void;
    onPetCreated?: () => void;
};

export default function CreatePetModal({
    onClose,
    onPetCreated,
}: CreateModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>('');
    const [formData, setFormData] = useState({
        name: '',
        breed: '',
        location: '',
        sex: '',
        age: '',
        image: '',
        primaryCol: '#CE566D',
        accentCol: '#FFEEF1',
        description: '',
        traits: '',
    });

    const handleClose = () => {
        onClose?.();
    };

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
            setSelectedFile(file);
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
            let response;

            // If a file was selected, send as FormData
            if (selectedFile) {
                const formDataUpload = new FormData();
                formDataUpload.append('file', selectedFile);
                formDataUpload.append('name', formData.name);
                formDataUpload.append('breed', formData.breed);
                formDataUpload.append('sex', formData.sex);
                formDataUpload.append('age', formData.age);
                formDataUpload.append('location', formData.location);
                formDataUpload.append('description', formData.description);
                formDataUpload.append('traits', formData.traits);
                formDataUpload.append('primaryCol', formData.primaryCol);
                formDataUpload.append('accentCol', formData.accentCol);

                response = await fetch('/api/pets', {
                    method: 'POST',
                    body: formDataUpload,
                });
            } else {
                // Send as JSON if no file
                response = await fetch('/api/pets', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ...formData,
                        age: parseInt(formData.age),
                    }),
                });
            }

            if (response.ok) {
                console.log('Pet created successfully!');
                onPetCreated?.();
                handleClose();
            } else {
                console.error('Failed to create pet');
            }
        } catch (error) {
            console.error('Error creating pet:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="modal" onClick={handleClose}>
            <div
                className="modal-container"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-header">
                    <div className="">
                        <h1 className="pb-1 text-4xl font-bold">ADD RECORD</h1>
                        <p className="text-sm">
                            Provide basic information to create a pet profile.
                        </p>
                    </div>
                    <button className="" onClick={handleClose}>
                        <IoIosClose className="close-btn h-8 w-8" />
                    </button>
                </div>
                <div>
                    <form
                        className="modal-form h-[372px] overflow-y-auto"
                        onSubmit={handleSubmit}
                    >
                        <div className="input-group-div">
                            <div className="input-group">
                                <label>Name</label>
                                <input
                                    className="input-field"
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter pet's name"
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label>Breed</label>
                                <input
                                    className="input-field"
                                    type="text"
                                    name="breed"
                                    value={formData.breed}
                                    onChange={handleInputChange}
                                    placeholder="Enter pet's breed"
                                    required
                                />
                            </div>
                        </div>
                        <div className="input-group">
                            <label>Location</label>
                            <input
                                className="input-field"
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                placeholder="Enter pet's location"
                                required
                            />
                        </div>
                        <div className="input-group-div">
                            <div className="input-group">
                                <label>Sex</label>
                                <input
                                    className="input-field"
                                    type="text"
                                    name="sex"
                                    value={formData.sex}
                                    onChange={handleInputChange}
                                    placeholder="Enter pet's sex"
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label>Age</label>
                                <input
                                    className="input-field"
                                    type="number"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleInputChange}
                                    placeholder="Enter pet's age"
                                    min="0"
                                    max="30"
                                    required
                                />
                            </div>
                        </div>
                        <div className="input-group">
                            <label>Pet's Image</label>
                            <div
                                className="flex h-32 w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 transition-colors hover:border-gray-400"
                                onClick={handleImageContainerClick}
                            >
                                {imagePreview ? (
                                    <div className="relative h-full w-full">
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="h-full w-full rounded-lg object-cover"
                                        />
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center text-center">
                                        <div className="text-gray-400">
                                            <AiOutlineCloudUpload className="h-12 w-12" />
                                        </div>
                                        <span className="text-sm text-gray-500">
                                            Click to upload image
                                        </span>
                                    </div>
                                )}
                            </div>
                            <input
                                id="file-input"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </div>
                        <div className="input-group-div">
                            <div className="input-group">
                                <label>Card Primary Color</label>
                                <input
                                    className="input-field h-12"
                                    type="color"
                                    name="primaryCol"
                                    value={formData.primaryCol}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="input-group">
                                <label>Card Accent Color</label>
                                <input
                                    className="input-field h-12"
                                    type="color"
                                    name="accentCol"
                                    value={formData.accentCol}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="input-group">
                            <div className="flex flex-row items-center gap-2">
                                <label>Personality</label>
                                <span className="text-xs text-gray-400">
                                    (Max: 12 Traits)
                                </span>
                            </div>
                            <input
                                className="input-field"
                                name="traits"
                                value={formData.traits}
                                onChange={handleInputChange}
                                placeholder="Enter pet's personality traits (comma-separated)..."
                                required
                            />
                        </div>
                        <div className="input-group">
                            <div className="flex flex-row items-center gap-2">
                                <label>Description</label>
                                <span className="text-xs text-gray-400">
                                    (Max: 320 characters)
                                </span>
                            </div>

                            <textarea
                                className="input-field"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Enter pet's description..."
                                required
                            />
                        </div>

                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Creating...' : 'Create Record'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
