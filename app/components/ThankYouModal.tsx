'use client';

import { IoIosClose } from 'react-icons/io';
import { useState } from 'react';
import Image from 'next/image';
import { ConfettiFireworks } from '@/components/ui/confetti';

type ThankYouModalProps = {
    onClose: () => void;
};

export default function ThankYouModal({ onClose }: ThankYouModalProps) {
    const handleClose = () => {
        onClose();
    };

    return (
        <div className="modal" onClick={handleClose}>
            <div
                className="modal-container"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-header justify-end!">
                    <button className="" onClick={handleClose}>
                        <IoIosClose className="close-btn h-8 w-8" />
                    </button>
                </div>
                <div className="relative min-h-38 w-full overflow-hidden rounded-lg">
                    <Image
                        src="/images/TY5.gif"
                        alt="thank you gif"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 288px"
                        className="object-contain"
                        priority
                    />
                </div>
                <div className="flex flex-col items-center justify-center gap-2">
                    <span className="text-center text-lg font-bold">
                        Thank You for Giving Me a Loving Home!
                    </span>
                    <span className="text-center text-sm leading-normal">
                        I’ve been waiting for someone just like you. Thank you
                        for giving me a second chance and a place where I
                        belong. I can’t wait to start our new adventure
                        together.
                    </span>
                </div>
            </div>
        </div>
    );
}
