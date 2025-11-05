'use client';

import Image from 'next/image';
import PetCard from './components/PetCard';
import ReviewCard from './components/ReviewCard';
import AdoptModal from './components/AdoptModal';
import ReviewModal from './components/ReviewModal';
import CreatePetModal from './components/CreatePetModal';
import UpdatePetModal from './components/UpdatePetModal';
import ViewPetModal from './components/ViewPetModal';
import { useEffect, useState } from 'react';
import { Adopt } from '@prisma/client';
import ThankYouModal from './components/ThankYouModal';

type Pet = {
    id: number;
    name: string;
    breed: string;
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

type Review = {
    id: number;
    name: string;
    petName: string;
    img: string;
    rating: number;
    review: string;
};

export default function Home() {
    const [pets, setPets] = useState<Pet[]>([]);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [openViewPetModal, setOpenViewPetModal] = useState(false);
    const [openCreatePetModal, setOpenCreatePetModal] = useState(false);
    const [openUpdatePetModal, setOpenUpdatePetModal] = useState(false);
    const [openAdoptModal, setOpenAdoptModal] = useState(false);
    const [openReviewModal, setOpenReviewModal] = useState(false);
    const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
    const [adoptedData, setAdoptedData] = useState<Adopt[]>([]);
    const [openThankYouModal, setopenThankYouModal] = useState(false);

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await fetch('/api/pets');
                const petsData: Pet[] = await response.json();

                const adoptedResponse = await fetch('/api/adopt');
                const adoptedData: Adopt[] = await adoptedResponse.json();
                const adoptedPetIds = new Set(
                    adoptedData.map((adopt) => adopt.petId),
                );

                const availablePets = petsData.filter(
                    (pet) => !adoptedPetIds.has(pet.id),
                );
                setPets(availablePets);
                setAdoptedData(adoptedData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching pets:', error);
            }
        };

        fetchPets();
    }, []);

    useEffect(() => {
        try {
            fetch('/api/reviews')
                .then((res) => res.json())
                .then((data) => {
                    setReviews(data);
                    setLoading(false);
                });
        } catch (error) {
            console.error('Error fetching', error);
        }
    }, []);

    if (loading) return <div>Loading...</div>;

    const handlePetUpdate = (updatedPet: Pet) => {
        setPets((prevPets) =>
            prevPets.map((pet) =>
                pet.id === updatedPet.id ? updatedPet : pet,
            ),
        );
        setSelectedPet(updatedPet);
    };

    const refreshPets = async () => {
        try {
            const response = await fetch('/api/pets');
            const petsData: Pet[] = await response.json();

            const adoptedResponse = await fetch('/api/adopt');
            const adoptedData: Adopt[] = await adoptedResponse.json();
            const adoptedPetIds = new Set(
                adoptedData.map((adopt) => adopt.petId),
            );

            const availablePets = petsData.filter(
                (pet) => !adoptedPetIds.has(pet.id),
            );
            setPets(availablePets);
            setAdoptedData(adoptedData);
        } catch (error) {
            console.error('Error refreshing pets:', error);
        }
    };

    const handleAdoptSuccess = () => {
        setOpenAdoptModal(false);
        setopenThankYouModal(true);
        refreshPets(); // Refresh the pets list to remove the adopted pet
    };

    return (
        <div>
            <main className="flex flex-row gap-6">
                {/* Pet Cards*/}
                {pets.map((pet) => (
                    <PetCard
                        key={pet.id}
                        pet={pet}
                        onClick={() => {
                            setSelectedPet(pet);
                            setOpenViewPetModal(true);
                        }}
                    />
                ))}

                {/* Review Cards*/}
                {/* {reviews.slice(0, 3).map((review) => (
                    <ReviewCard key={review.id} review={review} />
                ))} */}

                {/* Create Button */}
                <button onClick={() => setOpenCreatePetModal(true)}>
                    Add Pet
                </button>

                {/* Update Button */}
                {/* {pets.slice(0, 3).map((pet) => (
                    <PetCard
                        key={pet.id}
                        pet={pet}
                        onClick={() => {
                            setSelectedPet(pet);
                            setOpenUpdatePetModal(true);
                        }}
                    />
                ))} */}

                {/* Review Button */}
                <button onClick={() => setOpenReviewModal(true)}>
                    Feedback
                </button>
            </main>
            {openCreatePetModal && (
                <CreatePetModal
                    onClose={() => setOpenCreatePetModal(false)}
                    onPetCreated={refreshPets}
                />
            )}

            {openUpdatePetModal && selectedPet && (
                <UpdatePetModal
                    pet={selectedPet}
                    onClose={() => setOpenUpdatePetModal(false)}
                    onPetUpdate={refreshPets}
                />
            )}

            {openReviewModal && (
                <ReviewModal onClose={() => setOpenReviewModal(false)} />
            )}

            {openAdoptModal && selectedPet && (
                <AdoptModal
                    onClose={() => setOpenAdoptModal(false)}
                    onAdoptSuccess={handleAdoptSuccess}
                    petId={selectedPet.id}
                    petName={selectedPet.name}
                />
            )}

            {openViewPetModal && selectedPet && (
                <ViewPetModal
                    pet={selectedPet}
                    onClose={() => setOpenViewPetModal(false)}
                    onPetUpdate={handlePetUpdate} //Note
                    onAdopt={() => {
                        setOpenViewPetModal(false);
                        setOpenAdoptModal(true);
                    }}
                />
            )}

            {openThankYouModal && (
                <ThankYouModal onClose={() => setopenThankYouModal(false)} />
            )}
            <footer></footer>
        </div>
        // <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        //   <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        //     <Image
        //       className="dark:invert"
        //       src="/next.svg"
        //       alt="Next.js logo"
        //       width={180}
        //       height={38}
        //       priority
        //     />
        //     <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
        //       <li className="mb-2 tracking-[-.01em]">
        //         Get started by editing{" "}
        //         <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
        //           app/page.tsx
        //         </code>
        //         .
        //       </li>
        //       <li className="tracking-[-.01em]">
        //         Save and see your changes instantly.
        //       </li>
        //     </ol>

        //     <div className="flex gap-4 items-center flex-col sm:flex-row">
        //       <a
        //         className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
        //         href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
        //         target="_blank"
        //         rel="noopener noreferrer"
        //       >
        //         <Image
        //           className="dark:invert"
        //           src="/vercel.svg"
        //           alt="Vercel logomark"
        //           width={20}
        //           height={20}
        //         />
        //         Deploy now
        //       </a>
        //       <a
        //         className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
        //         href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
        //         target="_blank"
        //         rel="noopener noreferrer"
        //       >
        //         Read our docs
        //       </a>
        //     </div>
        //   </main>
        //   <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        //     <a
        //       className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        //       href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
        //       target="_blank"
        //       rel="noopener noreferrer"
        //         src="/window.svg"
        //         alt="Window icon"
        //         width={16}
        //         height={16}
        //       />
        //       Examples
        //     </a>
        //     <a
        //       className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        //       href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
        //       target="_blank"
        //       rel="noopener noreferrer"
        //     >
        //       <Image
        //         aria-hidden
        //         src="/globe.svg"
        //         alt="Globe icon"
        //         width={16}
        //         height={16}
        //       />
        //       Go to nextjs.org →
        //     </a>
        //   </footer>
        // </div>
    );
}
