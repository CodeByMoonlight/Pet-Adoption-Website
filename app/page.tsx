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
import AudioPlayer from './components/AudioPlayer';
import Loading from './components/Loading';
import ScrollReveal from './components/ScrollReveal';

// Hooks
import { useEffect, useState } from 'react';

// Types
import { Adopt } from '@prisma/client';

// Icons
import { IoPaw } from 'react-icons/io5';
import { FaGithub } from 'react-icons/fa';
import { HiMenuAlt3 } from 'react-icons/hi';
import { IoClose } from 'react-icons/io5';

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
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Handle mobile menu navigation
    const handleMobileNavClick = (sectionId: string) => {
        scrollToSection(sectionId);
        setIsMobileMenuOpen(false);
    };

    // Functions Related to Loading
    // Check if this is the first visit in this session
    const [showLoading, setShowLoading] = useState(() => {
        if (typeof window !== 'undefined') {
            return !sessionStorage.getItem('hasSeenLoading');
        }
        return true;
    });

    const handleLoadingComplete = () => {
        setShowLoading(false);
        // Mark that loading has been seen in this session
        if (typeof window !== 'undefined') {
            sessionStorage.setItem('hasSeenLoading', 'true');
        }
    };

    if (loading) return <div></div>;

    return (
        <div>
            {showLoading && (
                <Loading
                    isDataLoading={loading}
                    onComplete={handleLoadingComplete}
                />
            )}
            <nav
                className={`navbar fixed top-0 right-0 left-0 z-10 mx-2! flex flex-row items-center justify-between rounded-2xl bg-white/60 p-2 backdrop-blur-sm transition-transform duration-300 sm:mx-5! sm:p-3 ${showNavbar ? 'translate-y-2 sm:translate-y-5' : '-translate-y-full'}`}
            >
                <div
                    className="flex flex-row items-center gap-1 hover:cursor-pointer sm:w-44 sm:gap-2"
                    onClick={scrollToTop}
                >
                    <IoPaw className="text-main-black h-6 w-6 p-1 sm:h-8 sm:w-8" />
                    <p className="text-sm font-bold sm:text-xl">FurEverHome</p>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden flex-row gap-8 text-base md:flex">
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

                {/* Desktop Social Links */}
                <div className="hidden w-44 flex-row justify-end gap-2 md:flex">
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

                {/* Mobile Hamburger Menu */}
                <button
                    className="rounded-lg p-2 transition-colors hover:bg-gray-100 md:hidden"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <HiMenuAlt3 className="text-main-black h-6 w-6" />
                </button>
            </nav>

            {/* Mobile Side Navigation */}
            {isMobileMenuOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-40 bg-black/50 md:hidden"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />

                    {/* Side Menu */}
                    <div className="fixed top-0 right-0 z-50 h-full w-64 transform bg-white shadow-xl transition-transform duration-300 ease-in-out md:hidden">
                        <div className="flex h-full flex-col">
                            {/* Header */}
                            <div className="flex items-center justify-between border-b border-gray-200 p-4">
                                <div className="flex items-center gap-2">
                                    <IoPaw className="text-main-black h-6 w-6" />
                                    <p className="text-lg font-bold">
                                        FurEverHome
                                    </p>
                                </div>
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="rounded-lg p-2 transition-colors hover:bg-gray-100"
                                    aria-label="Close menu"
                                >
                                    <IoClose className="text-main-black h-6 w-6" />
                                </button>
                            </div>

                            {/* Navigation Links */}
                            <nav className="flex flex-col gap-2 p-4">
                                <button
                                    className={`nav-item rounded-lg px-4 py-3 text-left ${activeSection === 'home' ? 'bg-secondary-light !text-secondary-accent font-bold' : 'hover:bg-gray-100'}`}
                                    onClick={() => handleMobileNavClick('home')}
                                >
                                    HOME
                                </button>
                                <button
                                    className={`nav-item rounded-lg px-4 py-3 text-left ${activeSection === 'pets' ? 'bg-secondary-light !text-secondary-accent font-bold' : 'hover:bg-gray-100'}`}
                                    onClick={() => handleMobileNavClick('pets')}
                                >
                                    PETS
                                </button>
                                <button
                                    className={`nav-item rounded-lg px-4 py-3 text-left ${activeSection === 'about' ? 'bg-secondary-light !text-secondary-accent font-bold' : 'hover:bg-gray-100'}`}
                                    onClick={() =>
                                        handleMobileNavClick('about')
                                    }
                                >
                                    ABOUT
                                </button>
                                <button
                                    className={`nav-item rounded-lg px-4 py-3 text-left ${activeSection === 'reviews' ? 'bg-secondary-light !text-secondary-accent font-bold' : 'hover:bg-gray-100'}`}
                                    onClick={() =>
                                        handleMobileNavClick('reviews')
                                    }
                                >
                                    REVIEWS
                                </button>
                            </nav>

                            {/* Social Links */}
                            <div className="mt-auto border-t border-gray-200 p-4">
                                <div className="flex gap-4">
                                    <a
                                        href="https://github.com/CodeByMoonlight/Pet-Adoption-Website"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-secondary-accent flex items-center gap-2 transition-colors"
                                    >
                                        <FaGithub className="h-6 w-6" />
                                        <span className="text-sm">GitHub</span>
                                    </a>
                                    <a
                                        href="https://www.facebook.com/pawsphilippines/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-secondary-accent flex items-center gap-2 transition-colors"
                                    >
                                        <IoPaw className="h-6 w-6" />
                                        <span className="text-sm">PAWS</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
            <main className="flex flex-col items-center justify-center gap-16 overflow-hidden sm:gap-24 lg:gap-36">
                {/* Hero*/}
                <div
                    id="home"
                    className="bg-tertiary-light relative flex h-auto w-full flex-col items-center justify-center gap-8 px-4 py-16 sm:px-8 sm:py-20 lg:h-180 lg:flex-row lg:pb-36 lg:pl-20"
                >
                    <img
                        src="/images/transition.svg"
                        alt="transition_img"
                        className="absolute top-20 left-0 z-0 h-full w-full object-cover sm:top-28 md:top-36 lg:top-46"
                    />
                    <div className="relative z-10 order-2 w-full max-w-2xl px-4 sm:px-0 lg:order-1 lg:w-164">
                        <div className="flex flex-col gap-3 sm:gap-4">
                            <h1 className="text-3xl leading-tight font-bold sm:text-4xl md:text-5xl lg:text-6xl lg:leading-18">
                                Together, We Can Give Every Animal a{' '}
                                <div className="text-secondary-col flex flex-row items-center gap-2 sm:gap-4">
                                    FurEverHome
                                    <IoPaw className="text-main-black h-6 w-6 rotate-36 sm:h-8 sm:w-8" />
                                </div>
                            </h1>
                            <p className="text-sm leading-relaxed sm:text-base md:text-lg lg:text-xl lg:leading-snug">
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
                    <div className="relative order-1 h-64 w-64 sm:h-96 sm:w-96 md:h-120 md:w-120 lg:order-2 lg:h-150 lg:w-160">
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
                    className="flex flex-col items-center gap-6 px-4 pt-12 sm:gap-8 sm:pt-16 lg:pt-24"
                >
                    <ScrollReveal direction="fade" duration={1000}>
                        <div className="section-header">
                            <div className="section-title text-4xl sm:text-5xl lg:text-6xl">
                                <IoPaw className="icons h-10 w-10 sm:h-12 sm:w-12" />
                                <h1>PETS</h1>
                                <IoPaw className="icons h-10 w-10 sm:h-12 sm:w-12" />
                            </div>
                            <p className="text-base sm:w-[31.25rem] sm:text-lg">
                                Meet our wonderful pets! Each one has a unique
                                charm and is ready to bring joy, warmth, and
                                companionship into your life.
                            </p>
                        </div>
                    </ScrollReveal>
                    <div className="flex max-w-360 flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8">
                        {pets.slice(0, 8).map((pet, index) => (
                            <ScrollReveal
                                key={pet.id}
                                direction="up"
                                duration={600}
                                delay={index * 100}
                            >
                                <PetCard
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
                            </ScrollReveal>
                        ))}
                    </div>
                    <a href="/pets" className="btn">
                        View More
                    </a>
                </div>

                {/* About*/}
                <div
                    id="about"
                    className="bg-tertiary-light flex w-full flex-col items-center justify-center gap-8 px-4 py-8 sm:gap-10 sm:px-8 lg:flex-row lg:gap-12"
                >
                    <ScrollReveal
                        direction="fade"
                        duration={1000}
                        className="order-2 lg:order-1"
                    >
                        <div className="section-header">
                            <div className="section-title text-4xl sm:text-5xl lg:text-6xl">
                                <IoPaw className="icons h-10 w-10 sm:h-12 sm:w-12" />
                                <h1>ABOUT</h1>
                                <IoPaw className="icons h-10 w-10 sm:h-12 sm:w-12" />
                            </div>
                            <p className="text-base sm:w-[31.25rem] sm:text-lg">
                                We're more than just an adoption center, we're a
                                compassionate community built on love, care, and
                                second chances. Together, we create a space
                                where people and pets can connect, heal, and
                                grow as family.
                            </p>
                            <button
                                onClick={() => scrollToSection('reviews')}
                                className="btn"
                            >
                                Check Reviews
                            </button>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal
                        direction="fade"
                        duration={1000}
                        className="order-1 lg:order-2"
                    >
                        <div className="relative h-72 w-72 sm:h-120 sm:w-120 lg:h-140 lg:w-130 xl:w-160">
                            <Image
                                src="/images/about.png"
                                alt="about"
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-contain"
                                priority
                            />
                        </div>
                    </ScrollReveal>
                </div>

                {/* Review*/}
                <div id="reviews" className="flex flex-col gap-6 px-4 sm:gap-8">
                    <ScrollReveal direction="fade" duration={1000}>
                        <div className="section-header">
                            <div className="section-title text-4xl sm:text-5xl lg:text-6xl">
                                <IoPaw className="icons h-10 w-10 sm:h-12 sm:w-12" />
                                <h1>REVIEWS</h1>
                                <IoPaw className="icons h-10 w-10 sm:h-12 sm:w-12" />
                            </div>
                            <p className="w-[18.75rem] text-base sm:w-[31.25rem] sm:text-lg">
                                Every adoption creates a story worth sharing.
                                Here are a few of our favorites.
                            </p>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal direction="fade" duration={1000}>
                        <div className="flex w-screen flex-col gap-8 overflow-hidden pb-8 sm:gap-12 sm:pb-12 xl:max-w-381">
                            {/* First row - scrolls left */}
                            <div className="carousel-row">
                                <div className="carousel-left flex gap-4 sm:gap-8">
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
                                <div className="carousel-right flex gap-4 sm:gap-8">
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
                    </ScrollReveal>
                </div>

                {/*Review*/}
                <div className="bg-tertiary-light relative flex w-full flex-row items-center justify-center gap-12 px-4 py-12 sm:px-8 sm:py-16 lg:py-20 xl:p-40 xl:pt-48">
                    <div className="text-brown-col absolute bottom-20 left-12 hidden sm:bottom-28 sm:left-24 xl:block">
                        <IoPaw className="h-16 w-16 rotate-320 sm:h-20 sm:w-20" />
                        <IoPaw className="h-28 w-28 rotate-45 sm:h-36 sm:w-36" />
                    </div>
                    <ScrollReveal direction="fade" duration={1000}>
                        <div className="flex w-full flex-col items-center justify-center gap-3 sm:gap-4">
                            <h1 className="text-center text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
                                Let's Celebrate Happy Tails Together!
                            </h1>
                            <p className="w-full px-4 text-center text-sm sm:text-base md:text-lg lg:w-240 lg:px-0 lg:text-xl">
                                Every adoption story is special. By sharing your
                                experience, you help future adopters understand
                                the joy and fulfillment that comes with giving a
                                pet a second chance. Let your story be the
                                reason someone else chooses to adopt, not shop!
                            </p>
                            <button
                                onClick={() => setOpenReviewModal(true)}
                                className="btn w-fit"
                            >
                                Leave A Review
                            </button>
                        </div>
                    </ScrollReveal>
                    <div className="text-brown-col absolute top-12 right-12 hidden sm:top-20 sm:right-20 xl:block">
                        <IoPaw className="h-28 w-28 rotate-45 sm:h-36 sm:w-36" />
                        <IoPaw className="h-16 w-16 rotate-320 sm:h-20 sm:w-20" />
                    </div>
                </div>
            </main>
            <footer className="right-0 bottom-0 left-0 z-50 flex w-full flex-row items-center justify-between bg-white/50 px-2 py-2 backdrop-blur-sm sm:px-4 sm:py-3">
                <div
                    className="flex w-28 flex-row items-center gap-1 hover:cursor-pointer sm:w-44 sm:gap-2"
                    onClick={scrollToTop}
                >
                    <IoPaw className="text-main-black h-6 w-6 p-1 sm:h-8 sm:w-8" />
                    <p className="text-sm font-bold sm:text-xl">FurEverHome</p>
                </div>
                <p className="text-right text-xs font-medium sm:text-base">
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

            <AudioPlayer />
        </div>
    );
}
