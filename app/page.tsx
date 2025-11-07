'use client';

// Components
import Image from 'next/image';
import PetCard from './components/PetCard';
import ReviewCard from './components/ReviewCard';
import AdoptModal from './components/AdoptModal';
import ReviewModal from './components/ReviewModal';
import CreatePetModal from './components/CreatePetModal';
import UpdatePetModal from './components/UpdatePetModal';
import ViewPetModal from './components/ViewPetModal';
import ThankYouModal from './components/ThankYouModal';
import { ConfettiFireworks } from '@/components/ui/confetti';

// Hooks
import { useEffect, useState } from 'react';

// Types
import { Adopt } from '@prisma/client';

// Icons
import { IoPaw } from 'react-icons/io5';
import { FaGithub } from 'react-icons/fa';

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

type Review = {
    id: number;
    name: string;
    petName: string;
    img: string;
    rating: number;
    review: string;
};

export default function Home() {
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
    const [reviews, setReviews] = useState<Review[]>([]);
    const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
    const [adoptedData, setAdoptedData] = useState<Adopt[]>([]);

    // Loading and Navbar States
    const [loading, setLoading] = useState(true);
    const [activeSection, setActiveSection] = useState('home');
    const [showNavbar, setShowNavbar] = useState(true);

    // Effects//
    // Show/hide navbar on scroll and track active section
    useEffect(() => {
        let lastScrollY = window.scrollY;
        const handleScroll = () => {
            if (window.scrollY > lastScrollY) {
                setShowNavbar(false);
            } else {
                setShowNavbar(true);
            }
            lastScrollY = window.scrollY;

            // Track active section based on scroll position
            const sections = ['home', 'pets', 'about', 'reviews'];
            const sectionElements = sections
                .map((section) => document.getElementById(section))
                .filter(Boolean);

            let currentSection = 'home';
            for (let i = sectionElements.length - 1; i >= 0; i--) {
                const element = sectionElements[i];
                if (element && element.offsetTop <= window.scrollY + 200) {
                    currentSection = sections[i];
                    break;
                }
            }
            setActiveSection(currentSection);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Fetch Pets and Adopted Data
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

    // Fetch Reviews
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

    // Functions //
    // Functions Related to Pets
    const handlePetUpdate = (updatedPet: Pet) => {
        setPets((prevPets) =>
            prevPets.map((pet) =>
                pet.id === updatedPet.id ? updatedPet : pet,
            ),
        );
        setSelectedPet(updatedPet);
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
        setOpenThankYouModal(true);
        refreshPets(); // Refresh the pets list to remove the adopted pet
    };

    // Functions Related to Navigation
    // Scroll to section function
    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    // Scroll to top function
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <nav
                className={`navbar fixed top-0 right-0 left-0 z-10 mx-5! flex flex-row items-center justify-between rounded-2xl bg-white/60 p-3 backdrop-blur-sm transition-transform duration-300 ${showNavbar ? 'translate-y-5' : '-translate-y-full'}`}
            >
                <div
                    className="flex w-44 flex-row items-center gap-2 hover:cursor-pointer"
                    onClick={scrollToTop}
                >
                    <IoPaw className="text-main-black h-8 w-8 p-1" />
                    <p className="text-xl font-bold">FurEverHome</p>
                </div>
                <div className="flex flex-row gap-8">
                    <div
                        className={`nav-item ${activeSection === 'home' ? '!text-secondary-accent font-bold' : ''}`}
                        onClick={() => scrollToSection('home')}
                    >
                        HOME
                    </div>
                    <div
                        className={`nav-item ${activeSection === 'pets' ? '!text-secondary-accent font-bold' : ''}`}
                        onClick={() => scrollToSection('pets')}
                    >
                        PETS
                    </div>
                    <div
                        className={`nav-item ${activeSection === 'about' ? '!text-secondary-accent font-bold' : ''}`}
                        onClick={() => scrollToSection('about')}
                    >
                        ABOUT
                    </div>
                    <div
                        className={`nav-item ${activeSection === 'reviews' ? '!text-secondary-accent font-bold' : ''}`}
                        onClick={() => scrollToSection('reviews')}
                    >
                        REVIEWS
                    </div>
                </div>
                <div className="flex w-44 flex-row justify-end gap-2">
                    <a
                        href="https://github.com/CodeByMoonlight/Pet-Adoption-Website"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaGithub className="icons" />
                    </a>
                    <a
                        href="https://www.facebook.com/pawsphilippines/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <IoPaw className="icons" />
                    </a>
                </div>
            </nav>
            <main className="flex flex-col items-center justify-center gap-36">
                {/* Hero*/}
                <div
                    id="home"
                    className="bg-tertiary-light relative flex h-180 w-full flex-row items-center justify-center pb-20 pl-20"
                >
                    <img
                        src="/images/transition.svg"
                        alt="transition_img"
                        className="absolute top-36 left-0 z-0 h-full w-full object-cover md:top-40 lg:top-46"
                    />
                    <div className="relative z-10 w-164">
                        <div className="flex flex-col gap-4">
                            <h1 className="text-6xl leading-18 font-bold">
                                Together, We Can Give Every Animal a{' '}
                                <div className="text-secondary-col flex flex-row items-center gap-4">
                                    FurEverHome
                                    <IoPaw className="text-main-black h-8 w-8 rotate-36" />
                                </div>
                            </h1>
                            <p className="text-xl leading-snug">
                                Behind every pair of hopeful eyes is a story
                                ready to change your life. Discover pets looking
                                for love and make your home a place filled with
                                warmth, joy, and endless pawprints.
                            </p>
                        </div>
                        <button
                            className="btn"
                            onClick={() => scrollToSection('pets')}
                        >
                            View Pets
                        </button>
                    </div>
                    <div className="relative h-150 w-160">
                        <Image
                            src="/images/hero.gif"
                            alt="hero"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>

                {/* Pet*/}
                <div
                    id="pets"
                    className="flex flex-col items-center gap-8 pt-24"
                >
                    <div className="section-header">
                        <div className="section-title">
                            <IoPaw className="icons" />
                            <h1>PETS</h1>
                            <IoPaw className="icons" />
                        </div>
                        <p>
                            Meet our wonderful pets! Each one has a unique charm
                            and is ready to bring joy, warmth, and companionship
                            into your life.
                        </p>
                    </div>
                    <div className="flex max-w-360 flex-wrap justify-center gap-8">
                        {pets.slice(0, 8).map((pet) => (
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
                                onDelete={() =>
                                    handlePetDelete(pet.id, pet.name)
                                }
                            />
                        ))}
                    </div>
                    <a href="/pets" className="btn">
                        View More
                    </a>
                </div>

                {/* About*/}
                <div
                    id="about"
                    className="bg-tertiary-light flex w-full flex-row items-center justify-center gap-12 py-8"
                >
                    <div className="section-header">
                        <div className="section-title">
                            <IoPaw className="icons" />
                            <h1>ABOUT</h1>
                            <IoPaw className="icons" />
                        </div>
                        <p>
                            We're more than just an adoption center, we're a
                            compassionate community built on love, care, and
                            second chances. Together, we create a space where
                            people and pets can connect, heal, and grow as
                            family.
                        </p>
                        <button
                            onClick={() => scrollToSection('reviews')}
                            className="btn"
                        >
                            Check Reviews
                        </button>
                    </div>
                    <div className="relative h-140 w-160">
                        <Image
                            src="/images/about.png"
                            alt="about"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>

                {/* Review*/}
                <div id="reviews" className="flex flex-col gap-8">
                    <div className="section-header">
                        <div className="section-title">
                            <IoPaw className="icons" />
                            <h1>REVIEWS</h1>
                            <IoPaw className="icons" />
                        </div>
                        <p>
                            Every adoption creates a story worth sharing. Here
                            are a few of our favorites.
                        </p>
                    </div>
                    <div className="flex max-w-381 flex-col gap-12 overflow-hidden pb-12">
                        {/* First row - scrolls left */}
                        <div className="carousel-row">
                            <div className="carousel-left flex gap-8">
                                {reviews.slice(0, 5).map((review) => (
                                    <ReviewCard
                                        key={review.id}
                                        review={review}
                                    />
                                ))}
                                {reviews.slice(0, 5).map((review) => (
                                    <ReviewCard
                                        key={`dup-1-${review.id}`}
                                        review={review}
                                    />
                                ))}
                                {reviews.slice(0, 5).map((review) => (
                                    <ReviewCard
                                        key={`dup-2-${review.id}`}
                                        review={review}
                                    />
                                ))}
                            </div>
                        </div>
                        {/* Second row - scrolls right */}
                        <div className="carousel-row">
                            <div className="carousel-right flex gap-8">
                                {reviews.slice(5, 10).map((review) => (
                                    <ReviewCard
                                        key={review.id}
                                        review={review}
                                    />
                                ))}
                                {reviews.slice(5, 10).map((review) => (
                                    <ReviewCard
                                        key={`dup-1-${review.id}`}
                                        review={review}
                                    />
                                ))}
                                {reviews.slice(5, 10).map((review) => (
                                    <ReviewCard
                                        key={`dup-2-${review.id}`}
                                        review={review}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/*Review*/}
                <div className="bg-tertiary-light relative flex w-full flex-row items-center justify-center gap-12 p-40 pt-48">
                    <div className="text-brown-col absolute bottom-28 left-24">
                        <IoPaw className="h-20 w-20 rotate-320" />
                        <IoPaw className="h-36 w-36 rotate-45" />
                    </div>
                    <div className="flex flex-col items-center justify-center gap-4">
                        <h1 className="text-center text-6xl font-bold">
                            Let's Celebrate Happy Tails Together!
                        </h1>
                        <p className="w-240 text-center text-xl">
                            Every adoption story is special. By sharing your
                            experience, you help future adopters understand the
                            joy and fulfillment that comes with giving a pet a
                            second chance. Let your story be the reason someone
                            else chooses to adopt, not shop!
                        </p>
                        <button
                            onClick={() => setOpenReviewModal(true)}
                            className="btn w-fit"
                        >
                            Leave A Review
                        </button>
                    </div>
                    <div className="text-brown-col absolute top-20 right-20">
                        <IoPaw className="h-36 w-36 rotate-45" />
                        <IoPaw className="h-20 w-20 rotate-320" />
                    </div>
                </div>
            </main>
            <footer className="right-0 bottom-0 left-0 z-50 flex w-full flex-row items-center justify-between bg-white/50 px-2 py-3 backdrop-blur-sm">
                <div
                    className="flex w-44 flex-row items-center gap-2 hover:cursor-pointer"
                    onClick={scrollToTop}
                >
                    <IoPaw className="text-main-black h-8 w-8 p-1" />
                    <p className="text-xl font-bold">FurEverHome</p>
                </div>
                <p className="font-medium">
                    © 2025 FurEverHome | All rights reserved.
                </p>
            </footer>

            {/* Modals */}

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
                    onPetUpdate={handlePetUpdate}
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
