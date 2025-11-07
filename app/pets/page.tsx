'use client';

// Components
import Image from 'next/image';
import PetCard from '../components/PetCard';
import ReviewCard from '../components/ReviewCard';
import AdoptModal from '../components/AdoptModal';
import ReviewModal from '../components/ReviewModal';
import CreatePetModal from '../components/CreatePetModal';
import UpdatePetModal from '../components/UpdatePetModal';
import ViewPetModal from '../components/ViewPetModal';
import ThankYouModal from '../components/ThankYouModal';
import { ConfettiFireworks } from '@/components/ui/confetti';

// Hooks and Utilities
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Types
import { Adopt } from '@prisma/client';

// Icons
import { IoIosArrowRoundBack } from 'react-icons/io';
import { FiSearch } from 'react-icons/fi';
import { FaPlus } from 'react-icons/fa6';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

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

export default function PetsPage() {
    // State //
    // Modal States
    const [openCreatePetModal, setOpenCreatePetModal] = useState(false);
    const [openViewPetModal, setOpenViewPetModal] = useState(false);
    const [openUpdatePetModal, setOpenUpdatePetModal] = useState(false);
    const [openReviewModal, setOpenReviewModal] = useState(false);
    const [openAdoptModal, setOpenAdoptModal] = useState(false);
    const [openThankYouModal, setOpenThankYouModal] = useState(false);

    // Data States
    const [pets, setPets] = useState<Pet[]>([]);
    const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
    const [adoptedData, setAdoptedData] = useState<Adopt[]>([]);

    // Loading, Navigation, and Search States
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    // Constants //
    const PETS_PER_PAGE = 12;
    const pathname = usePathname();
    const isAdmin = pathname.includes('/admin');

    // Effects //
    // Fetch pets and adopted data on component mount
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

    // Functions //
    // Functions related to pets
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

    const handlePetUpdate = (updatedPet: Pet) => {
        setPets((prevPets) =>
            prevPets.map((pet) =>
                pet.id === updatedPet.id ? updatedPet : pet,
            ),
        );
        setSelectedPet(updatedPet);
    };

    const handleAdoptSuccess = () => {
        setOpenAdoptModal(false);
        setOpenThankYouModal(true);
        refreshPets(); // Refresh the pets list to remove the adopted pet
    };

    const handlePetDelete = async (petId: number, petName: string) => {
        const confirmed = window.confirm(
            `Are you sure you want to delete ${petName}? This action cannot be undone.`,
        );
        if (confirmed) {
            await fetch('/api/pets', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: petId }),
            });
            refreshPets();
        }
    };

    const filteredPets = pets.filter(
        (pet) =>
            pet.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
            pet.type.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    // Pagination
    const totalPages = Math.ceil(filteredPets.length / PETS_PER_PAGE);
    const startIndex = (currentPage - 1) * PETS_PER_PAGE;
    const endIndex = startIndex + PETS_PER_PAGE;
    const currentPets = filteredPets.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            const startPage = Math.max(
                1,
                currentPage - Math.floor(maxVisiblePages / 2),
            );
            const endPage = Math.min(
                totalPages,
                startPage + maxVisiblePages - 1,
            );

            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(i);
            }
        }

        return pageNumbers;
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="flex flex-col items-center justify-center gap-12 pt-12 pb-12">
            <div className="flex w-full max-w-310 flex-row items-center justify-between">
                <div className="flex flex-row items-center justify-center gap-2">
                    <a href="/">
                        <IoIosArrowRoundBack className="h-12 w-12 cursor-pointer hover:scale-110" />
                    </a>
                    <h1 className="text-5xl font-bold">ADOPT A PET</h1>
                </div>
                <div className="flex flex-row items-center justify-center gap-2">
                    <div className="border-main-gray flex w-100 flex-row items-center justify-start gap-2 rounded-sm border-2 bg-white px-4 py-[0.5rem] text-sm hover:cursor-pointer">
                        <FiSearch className="h-4 w-4" />
                        <input
                            type="text"
                            placeholder="Search Pets"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full border-none outline-none"
                        />
                    </div>
                    {isAdmin && (
                        <button
                            onClick={() => setOpenCreatePetModal(true)}
                            className=""
                        >
                            <FaPlus className="border-main-gray h-9 w-9 cursor-pointer rounded-sm border-2 bg-white p-2 hover:scale-110 hover:bg-gray-100" />
                        </button>
                    )}
                </div>
            </div>
            <div className="flex max-w-360 flex-wrap justify-center gap-8">
                {currentPets.length > 0 ? (
                    currentPets.map((pet) => (
                        <PetCard
                            key={pet.id}
                            pet={pet}
                            onClick={() => {
                                setSelectedPet(pet);
                                setOpenViewPetModal(true);
                            }}
                            onEdit={() => {
                                setSelectedPet(pet);
                                setOpenUpdatePetModal(true);
                            }}
                            onDelete={() => handlePetDelete(pet.id, pet.name)}
                        />
                    ))
                ) : (
                    <div className="flex h-60 w-full items-center justify-center">
                        <p className="text-xl text-gray-500">
                            {searchTerm
                                ? `No pets found matching "${searchTerm}"`
                                : 'No pets available'}
                        </p>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {filteredPets.length > PETS_PER_PAGE && (
                <div className="mt-8 flex items-center justify-center gap-2">
                    {/* Previous button */}
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`flex h-10 w-10 items-center justify-center rounded-lg border-2 transition-colors ${
                            currentPage === 1
                                ? 'border-main-gray cursor-not-allowed text-gray-400'
                                : 'border-main-gray hover:border-secondary-col hover:bg-secondary-col cursor-pointer text-gray-700'
                        }`}
                    >
                        <IoChevronBack className="h-5 w-5 hover:text-white" />
                    </button>

                    {/* Page numbers */}
                    {getPageNumbers().map((pageNum) => (
                        <button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            className={`flex h-10 w-10 items-center justify-center rounded-lg border-2 transition-colors ${
                                currentPage === pageNum
                                    ? 'border-secondary-col bg-secondary-col text-white'
                                    : 'border-main-gray hover:border-secondary-col hover:bg-secondary-col cursor-pointer text-gray-700 hover:text-white'
                            }`}
                        >
                            {pageNum}
                        </button>
                    ))}

                    {/* Next button */}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`flex h-10 w-10 items-center justify-center rounded-lg border-2 transition-colors ${
                            currentPage === totalPages
                                ? 'border-main-gray cursor-not-allowed text-gray-400'
                                : 'border-main-gray hover:border-secondary-col hover:bg-secondary-col cursor-pointer text-gray-700'
                        }`}
                    >
                        <IoChevronForward className="h-5 w-5 hover:text-white" />
                    </button>
                </div>
            )}

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
                <>
                    <div className="pointer-events-none fixed inset-0 z-[9999]">
                        <ConfettiFireworks />
                    </div>
                    <ThankYouModal
                        onClose={() => setOpenThankYouModal(false)}
                    />
                </>
            )}
        </div>
    );
}
