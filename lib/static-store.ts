type BaseRecord = {
    id: number;
    createdAt: string;
};

export type PetRecord = BaseRecord & {
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
    isLiked: boolean;
};

export type ReviewRecord = BaseRecord & {
    name: string;
    petName: string;
    img: string;
    rating: number;
    review: string;
};

export type AdoptRecord = BaseRecord & {
    petId: number;
    name: string;
    address: string;
    email: string;
    phoneNo: string;
    reason: string;
};

type PetInput = {
    type: string;
    age: number;
    name: string;
    breed: string;
    sex: string;
    location: string;
    description: string;
    primaryCol: string;
    accentCol: string;
    traits: string | string[];
    image?: string;
    isLiked?: boolean;
};

type PetUpdateInput = Partial<Omit<PetInput, 'traits'>> & {
    traits?: string | string[];
};

type ReviewInput = {
    name: string;
    petName: string;
    rating: number;
    review?: string;
    img?: string;
};

type AdoptInput = {
    petId: number;
    name: string;
    address: string;
    email: string;
    phoneNo: string;
    reason?: string;
};

const toIsoTime = (offsetMinutes: number) =>
    new Date(Date.now() - offsetMinutes * 60_000).toISOString();

const normalizeTraits = (traits: string | string[]) =>
    Array.isArray(traits) ? traits.join(',') : traits;

const createInitialPets = (): PetRecord[] => [
    {
        id: 1,
        createdAt: toIsoTime(60),
        name: 'Luna',
        breed: 'Persian Cat',
        type: 'Cat',
        sex: 'Female',
        age: 4,
        location: 'San Francisco, CA',
        description:
            'Luna is a calm Persian cat who loves sunny windows and gentle company.',
        image: '/images/cat-1.png',
        traits: 'Calm,Gentle,Affectionate,Quiet,Indoor,Loyal,Observant,Soft-hearted',
        primaryCol: '#542C96',
        accentCol: '#E2D7F4',
        isLiked: false,
    },
    {
        id: 2,
        createdAt: toIsoTime(58),
        name: 'Milo',
        breed: 'Siamese Cat',
        type: 'Cat',
        sex: 'Male',
        age: 2,
        location: 'Austin, TX',
        description:
            'Milo is playful, curious, and happiest when he can follow you from room to room.',
        image: '/images/cat-2.png',
        traits: 'Playful,Curious,Intelligent,Social,Energetic,Vocal,Loyal,Adventurous',
        primaryCol: '#43597F',
        accentCol: '#FFFFFF',
        isLiked: false,
    },
    {
        id: 3,
        createdAt: toIsoTime(56),
        name: 'Cleo',
        breed: 'Maine Coon',
        type: 'Cat',
        sex: 'Female',
        age: 5,
        location: 'Portland, OR',
        description:
            'Cleo is a gentle Maine Coon with a fluffy tail and a big heart.',
        image: '/images/cat-3.png',
        traits: 'Loyal,Gentle,Patient,Calm,Affectionate,Independent,Graceful,Intelligent',
        primaryCol: '#5D4E04',
        accentCol: '#FBF1D0',
        isLiked: false,
    },
    {
        id: 4,
        createdAt: toIsoTime(54),
        name: 'Oliver',
        breed: 'British Shorthair',
        type: 'Cat',
        sex: 'Male',
        age: 3,
        location: 'Chicago, IL',
        description:
            'Oliver has a calm personality and enjoys quiet afternoons near his people.',
        image: '/images/cat-4.png',
        traits: 'Calm,Composed,Quiet,Observant,Independent,Affectionate,Patient,Clean',
        primaryCol: '#304F38',
        accentCol: '#DFECE2',
        isLiked: false,
    },
    {
        id: 5,
        createdAt: toIsoTime(52),
        name: 'Nala',
        breed: 'Bengal Cat',
        type: 'Cat',
        sex: 'Female',
        age: 2,
        location: 'Seattle, WA',
        description:
            'Nala is energetic, confident, and always ready for an adventure.',
        image: '/images/cat-5.png',
        traits: 'Energetic,Confident,Curious,Playful,Agile,Social,Smart,Adventurous',
        primaryCol: '#87320D',
        accentCol: '#FCE6DE',
        isLiked: false,
    },
    {
        id: 6,
        createdAt: toIsoTime(50),
        name: 'Max',
        breed: 'Golden Retriever',
        type: 'Dog',
        sex: 'Male',
        age: 5,
        location: 'Denver, CO',
        description:
            'Max is a cheerful Golden Retriever who loves meeting new friends and going outside.',
        image: '/images/dog-1.png',
        traits: 'Friendly,Loyal,Playful,Gentle,Affectionate,Obedient,Patient,Outgoing',
        primaryCol: '#324E58',
        accentCol: '#DEEAED',
        isLiked: false,
    },
    {
        id: 7,
        createdAt: toIsoTime(48),
        name: 'Bella',
        breed: 'Labrador Retriever',
        type: 'Dog',
        sex: 'Female',
        age: 4,
        location: 'Atlanta, GA',
        description:
            'Bella loves swimming, long walks, and being part of family life.',
        image: '/images/dog-2.png',
        traits: 'Affectionate,Energetic,Loyal,Smart,Social,Obedient,Playful,Kind',
        primaryCol: '#473A5A',
        accentCol: '#E5E0EB',
        isLiked: false,
    },
    {
        id: 8,
        createdAt: toIsoTime(46),
        name: 'Rocky',
        breed: 'German Shepherd',
        type: 'Dog',
        sex: 'Male',
        age: 6,
        location: 'Dallas, TX',
        description:
            'Rocky is disciplined, intelligent, and deeply loyal to the people he trusts.',
        image: '/images/dog-3.png',
        traits: 'Loyal,Protective,Smart,Brave,Strong,Obedient,Focused,Trustworthy',
        primaryCol: '#940A23',
        accentCol: '#FDE3E7',
        isLiked: false,
    },
    {
        id: 9,
        createdAt: toIsoTime(44),
        name: 'Daisy',
        breed: 'Beagle',
        type: 'Dog',
        sex: 'Female',
        age: 3,
        location: 'Orlando, FL',
        description:
            'Daisy is curious, cheerful, and always ready to explore the next scent trail.',
        image: '/images/dog-4.png',
        traits: 'Curious,Playful,Happy,Social,Lively,Intelligent,Friendly,Active',
        primaryCol: '#684D08',
        accentCol: '#FBF1D0',
        isLiked: false,
    },
    {
        id: 10,
        createdAt: toIsoTime(42),
        name: 'Charlie',
        breed: 'Corgi',
        type: 'Dog',
        sex: 'Male',
        age: 2,
        location: 'Boston, MA',
        description:
            'Charlie is an outgoing Corgi with a big personality and a love for playtime.',
        image: '/images/dog-5.png',
        traits: 'Playful,Loyal,Funny,Outgoing,Smart,Cheerful,Brave,Affectionate',
        primaryCol: '#8A0A0A',
        accentCol: '#FBD0D0',
        isLiked: false,
    },
    {
        id: 11,
        createdAt: toIsoTime(40),
        name: 'Mochi',
        breed: 'British Shorthair',
        type: 'Cat',
        sex: 'Male',
        age: 3,
        location: 'Los Angeles, CA',
        description:
            'Mochi loves soft pillows, feather toys, and cozy naps near his favorite human.',
        image: '/images/cat-6.png',
        traits: 'Playful,Loyal,Curious,Affectionate,Quiet,Indoor,Laid-back,Gentle',
        primaryCol: '#4A443F',
        accentCol: '#E8E5E3',
        isLiked: false,
    },
    {
        id: 12,
        createdAt: toIsoTime(38),
        name: 'Oreo',
        breed: 'Tuxedo Cat',
        type: 'Cat',
        sex: 'Male',
        age: 1,
        location: 'New York, NY',
        description:
            'Oreo is curious, energetic, and always ready to explore a new space.',
        image: '/images/cat-10.png',
        traits: 'Energetic,Curious,Playful,Cheerful,Brave,Loyal,Smart,Fun-loving',
        primaryCol: '#94001B',
        accentCol: '#FFE0E6',
        isLiked: false,
    },
];

const createInitialReviews = (): ReviewRecord[] => [
    {
        id: 1,
        createdAt: toIsoTime(30),
        name: 'Ava Chen',
        petName: 'Luna',
        img: '/images/review-1.jpg',
        rating: 5,
        review: 'The process was smooth and we felt supported the entire way.',
    },
    {
        id: 2,
        createdAt: toIsoTime(28),
        name: 'Marcus Lee',
        petName: 'Max',
        img: '/images/review-2.jpg',
        rating: 5,
        review: 'Max settled in quickly and brought a lot of energy to our home.',
    },
    {
        id: 3,
        createdAt: toIsoTime(26),
        name: 'Sofia Patel',
        petName: 'Daisy',
        img: '/images/review-3.jpg',
        rating: 4,
        review: 'We loved how easy it was to browse and connect with the team.',
    },
    {
        id: 4,
        createdAt: toIsoTime(24),
        name: 'Jordan Kim',
        petName: 'Mochi',
        img: '/images/review-4.jpg',
        rating: 5,
        review: 'Mochi is now the center of attention in our apartment.',
    },
    {
        id: 5,
        createdAt: toIsoTime(22),
        name: 'Emily Rivera',
        petName: 'Bella',
        img: '/images/review-5.jpg',
        rating: 5,
        review: 'Bella has been amazing with our kids and fits right in.',
    },
    {
        id: 6,
        createdAt: toIsoTime(20),
        name: 'Noah Brown',
        petName: 'Oreo',
        img: '/images/review-6.jpg',
        rating: 4,
        review: 'A clean interface and a fast adoption flow made everything simple.',
    },
];

const createInitialAdoptions = (): AdoptRecord[] => [];

let pets: PetRecord[] = createInitialPets();
let reviews: ReviewRecord[] = createInitialReviews();
let adoptions: AdoptRecord[] = createInitialAdoptions();

const nextId = (records: BaseRecord[]) =>
    records.length > 0 ? Math.max(...records.map((record) => record.id)) + 1 : 1;

const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value)) as T;

export const resetStaticData = () => {
    pets = createInitialPets();
    reviews = createInitialReviews();
    adoptions = createInitialAdoptions();
};

export const getPets = () => clone([...pets].sort((a, b) => b.createdAt.localeCompare(a.createdAt)));

export const createPet = (input: PetInput) => {
    const pet: PetRecord = {
        id: nextId(pets),
        createdAt: new Date().toISOString(),
        name: input.name,
        breed: input.breed,
        type: input.type,
        sex: input.sex,
        age: input.age,
        location: input.location,
        description: input.description,
        image: input.image ?? '',
        traits: normalizeTraits(input.traits),
        primaryCol: input.primaryCol,
        accentCol: input.accentCol,
        isLiked: input.isLiked ?? false,
    };

    pets = [pet, ...pets];
    return clone(pet);
};

export const updatePet = (petId: number, input: PetUpdateInput) => {
    const currentPet = pets.find((pet) => pet.id === petId);

    if (!currentPet) {
        return null;
    }

    const updatedPet: PetRecord = {
        ...currentPet,
        ...input,
        type: input.type ?? currentPet.type,
        age: input.age ?? currentPet.age,
        name: input.name ?? currentPet.name,
        breed: input.breed ?? currentPet.breed,
        sex: input.sex ?? currentPet.sex,
        location: input.location ?? currentPet.location,
        description: input.description ?? currentPet.description,
        image: input.image ?? currentPet.image,
        traits: input.traits ? normalizeTraits(input.traits) : currentPet.traits,
        primaryCol: input.primaryCol ?? currentPet.primaryCol,
        accentCol: input.accentCol ?? currentPet.accentCol,
        isLiked: input.isLiked ?? currentPet.isLiked,
    };

    pets = pets.map((pet) => (pet.id === petId ? updatedPet : pet));
    return clone(updatedPet);
};

export const deletePet = (petId: number) => {
    const existingCount = pets.length;
    pets = pets.filter((pet) => pet.id !== petId);
    adoptions = adoptions.filter((adopt) => adopt.petId !== petId);
    return pets.length !== existingCount;
};

export const getReviews = () => clone([...reviews].sort((a, b) => b.createdAt.localeCompare(a.createdAt)));

export const createReview = (input: ReviewInput) => {
    const review: ReviewRecord = {
        id: nextId(reviews),
        createdAt: new Date().toISOString(),
        name: input.name,
        petName: input.petName,
        img: input.img ?? '',
        rating: input.rating,
        review: input.review ?? '',
    };

    reviews = [review, ...reviews];
    return clone(review);
};

export const getAdoptions = () => clone([...adoptions].sort((a, b) => b.createdAt.localeCompare(a.createdAt)));

export const createAdoption = (input: AdoptInput) => {
    const adoption: AdoptRecord = {
        id: nextId(adoptions),
        createdAt: new Date().toISOString(),
        petId: input.petId,
        name: input.name,
        address: input.address,
        email: input.email,
        phoneNo: input.phoneNo,
        reason: input.reason ?? '',
    };

    adoptions = [adoption, ...adoptions];
    return clone(adoption);
};

export const fileToDataUrl = async (file: File) => {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const mimeType = file.type || 'application/octet-stream';
    return `data:${mimeType};base64,${buffer.toString('base64')}`;
};
