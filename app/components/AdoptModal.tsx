'use client';

import { IoIosClose } from 'react-icons/io';
import { useState } from 'react';

type AdoptModalProps = {
    onClose?: () => void;
    onAdoptSuccess?: () => void;
    petId: number;
    petName: string;
};

export default function AdoptModal({
    onClose,
    onAdoptSuccess,
    petId,
    petName,
}: AdoptModalProps) {
    const handleClose = () => {
        onClose?.();
    };

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        petId: petId,
        address: '',
        email: '',
        phoneNo: '',
        reason: '',
    });

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            let response;

            response = await fetch('/api/adopt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                }),
            });

            if (response.ok) {
                console.log('Adoption Record created successfully!');
                onAdoptSuccess?.();
                handleClose();
            } else {
                console.error('Failed to create adoption record');
            }
        } catch (error) {
            console.error('Error creating adoption record:', error);
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
                        <h1 className="pb-1 text-4xl font-bold">ADOPT</h1>
                        <p className="text-sm">
                            Give this pet a loving home, start the process here.
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
                            />
                        </div>
                        <div className="input-group">
                            <label>Address</label>
                            <input
                                className="input-field"
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                placeholder="Enter your address"
                            />
                        </div>
                        <div className="input-group-div">
                            <div className="input-group">
                                <label>Email</label>
                                <input
                                    className="input-field"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div className="input-group">
                                <label>Phone No.</label>
                                <input
                                    className="input-field"
                                    type="tel"
                                    name="phoneNo"
                                    value={formData.phoneNo}
                                    onChange={handleInputChange}
                                    placeholder="Enter your phone number"
                                />
                            </div>
                        </div>
                        <div className="input-group">
                            <label>Why do you want to adopt {petName}?</label>
                            <textarea
                                className="input-field"
                                name="reason"
                                value={formData.reason}
                                onChange={handleInputChange}
                                placeholder="Your reason..."
                            />
                        </div>
                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting
                                ? 'Submitting...'
                                : `Adopt ${petName}`}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
