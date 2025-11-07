'use client';

import { IoIosClose } from 'react-icons/io';
import { FaStar } from 'react-icons/fa';
import { useState } from 'react';

type ReviewModalProps = {
    onClose?: () => void;
};

export default function ReviewModal({ onClose }: ReviewModalProps) {
    // States for form handling
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [formData, setFormData] = useState({
        name: '',
        petName: '',
        img: '',
        review: '',
    });

    // Functions for form handling
    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
    ) => {
        const { name, value } = e.target;
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
            reader.readAsDataURL(file);
        }
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
                formDataUpload.append('petName', formData.petName);
                formDataUpload.append('rating', rating.toString());
                formDataUpload.append('review', formData.review);

                response = await fetch('/api/reviews', {
                    method: 'POST',
                    body: formDataUpload,
                });
            } else {
                // Send as JSON if no file
                response = await fetch('/api/reviews', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ...formData,
                        rating: rating,
                    }),
                });
            }

            if (response.ok) {
                console.log('Review created successfully!');
                handleClose();
            } else {
                console.error('Failed to create review');
            }
        } catch (error) {
            console.error('Error creating review:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Close modal handler
    const handleClose = () => {
        onClose?.();
    };

    return (
        <div className="modal" onClick={handleClose}>
            <div
                className="modal-container"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-header">
                    <div className="">
                        <h1 className="pb-1 text-4xl font-bold">REVIEW</h1>
                        <p className="text-sm">
                            We'd love to hear what you think
                        </p>
                    </div>
                    <button className="" onClick={handleClose}>
                        <IoIosClose className="close-btn h-8 w-8" />
                    </button>
                </div>
                <div>
                    <form className="modal-form" onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label>Full Name</label>
                            <input
                                className="input-field"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Enter your full name"
                                required
                            />
                        </div>
                        <div className="input-group-div">
                            <div className="input-group">
                                <label>Pet's Name</label>
                                <input
                                    className="input-field"
                                    type="text"
                                    name="petName"
                                    value={formData.petName}
                                    onChange={handleInputChange}
                                    placeholder="Enter your pet's name"
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label>Pet's Image</label>
                                <input
                                    id="file-input"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="input-group">
                            <label>Rating</label>
                            <div className="flex flex-row justify-between">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <FaStar
                                        key={star}
                                        className={`border-main-gray h-10 w-10 cursor-pointer rounded-lg border-2 p-2 transition-colors ${
                                            star <= (hoverRating || rating)
                                                ? 'text-yellow-400'
                                                : 'text-gray-300'
                                        }`}
                                        onClick={() => setRating(star)}
                                        onMouseEnter={() =>
                                            setHoverRating(star)
                                        }
                                        onMouseLeave={() => setHoverRating(0)}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="input-group">
                            <label>What do you think about FurEverHome?</label>
                            <textarea
                                className="input-field"
                                name="review"
                                value={formData.review}
                                onChange={handleInputChange}
                                placeholder="Your feedback..."
                                required
                            />
                        </div>

                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Submitting...' : 'Submit Record'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
