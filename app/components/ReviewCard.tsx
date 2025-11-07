'use client';

import { RiDoubleQuotesL } from 'react-icons/ri';
import Image from 'next/image';

type Review = {
    id: number;
    name: string;
    petName: string;
    img: string;
    rating: number;
    review: string;
};

type ReviewCardProps = {
    review: Review;
};

export default function ReviewCard({ review }: ReviewCardProps) {
    return (
        <div className="border-main-gray relative h-[22.625rem] w-72 rounded-xl border-3 duration-300 hover:scale-105 hover:shadow-lg">
            <div className="relative h-full w-full overflow-hidden rounded-lg">
                <Image
                    src={review.img}
                    alt="Review Image"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                    priority
                />
            </div>
            <div className="absolute top-0 left-0 flex h-full w-full flex-col justify-end gap-2 rounded-lg bg-gradient-to-b from-transparent via-white/24 to-white p-4">
                <RiDoubleQuotesL className="text-main-black h-6 w-6" />
                <p className="h-16 text-sm">{review.review}</p>
                <p className="text-right text-sm">-{review.name}</p>
            </div>
        </div>
    );
}
