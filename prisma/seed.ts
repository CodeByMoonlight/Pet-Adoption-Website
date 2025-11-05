import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding...');

    // Clear existing data
    await prisma.pet.deleteMany();
    await prisma.review.deleteMany();
    await prisma.adopt.deleteMany();

    // Reset auto-increment values
    await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name = 'Pet';`;
    await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name = 'Review';`;
    await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name = 'Adopt';`;
    console.log('Auto-increment values reset');

    // Create sample pets
    const pets = await Promise.all([
        prisma.pet.create({
            data: {
                name: 'Luna',
                breed: 'Persian Cat',
                sex: 'Female',
                age: 4,
                location: 'San Francisco, CA',
                description:
                    'Luna is a calm and affectionate Persian cat who enjoys curling up in sunny windows and watching the world go by. She thrives in peaceful spaces and loves gentle company. Her soft, luxurious fur requires regular grooming, but she rewards her humans with quiet purrs and gentle head nudges.',
                image: '/images/cat-1.png',
                traits: 'Calm,Gentle,Affectionate,Quiet,Indoor,Loyal,Observant,Soft-hearted',
                primaryCol: '#CE566D',
                accentCol: '#FFEEF1',
            },
        }),
        prisma.pet.create({
            data: {
                name: 'Milo',
                breed: 'Siamese Cat',
                sex: 'Male',
                age: 2,
                location: 'Austin, TX',
                description:
                    'Milo is a playful Siamese cat with striking blue eyes and a curious mind. He enjoys exploring high places and following his humans from room to room. Intelligent and social, Milo quickly forms strong bonds and loves interactive playtime with toys that challenge his sharp reflexes and problem-solving nature.',
                image: '/images/cat-2.png',
                traits: 'Playful,Curious,Intelligent,Social,Energetic,Vocal,Loyal,Adventurous',
                primaryCol: '#5885AF',
                accentCol: '#E8F2FF',
            },
        }),
        prisma.pet.create({
            data: {
                name: 'Cleo',
                breed: 'Maine Coon',
                sex: 'Female',
                age: 5,
                location: 'Portland, OR',
                description:
                    'Cleo is a majestic Maine Coon with a fluffy tail and a big heart. Despite her regal appearance, she’s down-to-earth and loves gentle attention. She enjoys lounging on soft blankets, chirping softly when happy, and curling near you while you read. Cleo is loyal, calm, and perfect for families seeking a gentle companion.',
                image: '/images/cat-3.png',
                traits: 'Loyal,Gentle,Patient,Calm,Affectionate,Independent,Graceful,Intelligent',
                primaryCol: '#7E5A36',
                accentCol: '#FFF3E5',
            },
        }),
        prisma.pet.create({
            data: {
                name: 'Oliver',
                breed: 'British Shorthair',
                sex: 'Male',
                age: 3,
                location: 'Chicago, IL',
                description:
                    'Oliver is a dignified British Shorthair with a plush gray coat and a calm personality. He enjoys quiet afternoons and short play sessions. A true gentleman, he’s not overly demanding but deeply enjoys companionship. He’s content sitting nearby, observing, and softly purring as he keeps you company during your daily routine.',
                image: '/images/cat-4.png',
                traits: 'Calm,Composed,Quiet,Observant,Independent,Affectionate,Patient,Clean',
                primaryCol: '#8896A0',
                accentCol: '#E8ECF0',
            },
        }), 
        prisma.pet.create({
            data: {
                name: 'Nala',
                breed: 'Bengal Cat',
                sex: 'Female',
                age: 2,
                location: 'Seattle, WA',
                description:
                    'Nala is an energetic Bengal cat with striking spotted fur and a confident personality. She loves climbing, chasing laser dots, and exploring every corner of her home. Always curious, she forms strong bonds with active owners who can match her enthusiasm. Nala brings life, laughter, and endless excitement to her surroundings.',
                image: '/images/cat-5.png',
                traits: 'Energetic,Confident,Curious,Playful,Agile,Social,Smart,Adventurous',
                primaryCol: '#C49245',
                accentCol: '#FFF4E1',
            },
        }),
        prisma.pet.create({
            data: {
                name: 'Max',
                breed: 'Golden Retriever',
                sex: 'Male',
                age: 5,
                location: 'Denver, CO',
                description:
                    'Max is a cheerful Golden Retriever who loves meeting new friends and going on outdoor adventures. His playful energy is balanced with patience and loyalty. Whether fetching a ball or relaxing by your side, Max radiates warmth and affection, making him a perfect family dog who thrives on companionship and love.',
                image: '/images/dog-1.png',
                traits: 'Friendly,Loyal,Playful,Gentle,Affectionate,Obedient,Patient,Outgoing',
                primaryCol: '#E2A84A',
                accentCol: '#FFF5DE',
            },
        }),
        prisma.pet.create({
            data: {
                name: 'Bella',
                breed: 'Labrador Retriever',
                sex: 'Female',
                age: 4,
                location: 'Atlanta, GA',
                description:
                    'Bella is a loving Labrador Retriever who adores swimming, long walks, and spending time with people. She’s full of enthusiasm and has a heart as big as her smile. Intelligent and eager to please, Bella learns commands quickly and enjoys helping out, making her an ideal companion for families and first-time pet owners.',
                image: '/images/dog-2.png',
                traits: 'Affectionate,Energetic,Loyal,Smart,Social,Obedient,Playful,Kind',
                primaryCol: '#C88B50',
                accentCol: '#FFF1E0',
            },
        }),
        prisma.pet.create({
            data: {
                name: 'Rocky',
                breed: 'German Shepherd',
                sex: 'Male',
                age: 6,
                location: 'Dallas, TX',
                description:
                    'Rocky is a disciplined and intelligent German Shepherd who values structure and purpose. He excels in learning commands, protecting his home, and bonding deeply with his family. Despite his strong and confident exterior, Rocky is incredibly gentle with those he trusts, always alert, loyal, and ready to lend a helping paw.',
                image: '/images/dog-3.png',
                traits: 'Loyal,Protective,Smart,Brave,Strong,Obedient,Focused,Trustworthy',
                primaryCol: '#6B5234',
                accentCol: '#FBEFE1',
            },
        }),
        prisma.pet.create({
            data: {
                name: 'Daisy',
                breed: 'Beagle',
                sex: 'Female',
                age: 3,
                location: 'Orlando, FL',
                description:
                    'Daisy is a curious Beagle with a love for adventure and an unmatched sense of smell. She enjoys exploring parks, following scents, and being part of the family’s daily activities. With her cheerful personality and expressive eyes, Daisy brings laughter and warmth wherever she goes, making her a joy to have around.',
                image: '/images/dog-4.png',
                traits: 'Curious,Playful,Happy,Social,Lively,Intelligent,Friendly,Active',
                primaryCol: '#B56E3A',
                accentCol: '#FFF3E5',
            },
        }),
        prisma.pet.create({
            data: {
                name: 'Charlie',
                breed: 'Corgi',
                sex: 'Male',
                age: 2,
                location: 'Boston, MA',
                description:
                    'Charlie is an outgoing Corgi with a big personality and short little legs that never stop moving. He’s always ready for playtime, especially fetch or short runs in the park. His expressive face and fluffy coat make him irresistible, and his loyalty ensures he never strays far from his favorite humans, always eager to please.',
                image: '/images/dog-5.png',
                traits: 'Playful,Loyal,Funny,Outgoing,Smart,Cheerful,Brave,Affectionate',
                primaryCol: '#D4794E',
                accentCol: '#FFF0E6',
            },
        }),
    ]);

    // Create sample reviews
    const reviews = await Promise.all([
        prisma.review.create({
            data: {
                name: 'Laura Jane',
                petName: 'Luna',
                img: '/images/review-1.png',
                rating: 4,
                review:
                    'Luna has been a wonderful addition to our family. She is so calm and loving, and her gentle nature brings so much peace to our home.',
            },
        }),
        prisma.review.create({
            data: {
                name: 'Michael Torres',
                petName: 'Buddy',
                img: '/images/review-2.png',
                rating: 5,
                review:
                    'Buddy is full of energy and always ready to play fetch. He instantly bonded with my kids and brings joy to everyone he meets.',
            },
        }),
        prisma.review.create({
            data: {
                name: 'Chloe Ramirez',
                petName: 'Whiskers',
                img: '/images/review-3.png',
                rating: 4,
                review:
                    'Whiskers is incredibly playful and affectionate. He loves to nap by the window and cuddle during movie nights.',
            },
        }),
        prisma.review.create({
            data: {
                name: 'Daniel Cruz',
                petName: 'Bella',
                img: '/images/review-4.png',
                rating: 5,
                review:
                    'Bella is such a sweetheart! She’s gentle, friendly, and has adjusted perfectly to our apartment life. Highly recommend adopting her breed.',
            },
        }),
        prisma.review.create({
            data: {
                name: 'Samantha Lee',
                petName: 'Rocky',
                img: '/images/review-5.png',
                rating: 3,
                review:
                    'Rocky took a little time to warm up, but now he’s incredibly loyal and fun to have around. Great companion for morning runs.',
            },
        }),
        prisma.review.create({
            data: {
                name: 'Andrew Parker',
                petName: 'Milo',
                img: '/images/review-6.png',
                rating: 5,
                review:
                    'Milo is absolutely adorable and easy to train. He quickly learned commands and has been the friendliest dog in our neighborhood.',
            },
        }),
        prisma.review.create({
            data: {
                name: 'Julia Fernandez',
                petName: 'Coco',
                img: '/images/review-7.png',
                rating: 4,
                review:
                    'Coco is so gentle and sweet. She loves curling up next to us while we read or watch TV. Perfect for anyone wanting a calm companion.',
            },
        }),
        prisma.review.create({
            data: {
                name: 'Ethan Brooks',
                petName: 'Daisy',
                img: '/images/review-8.png',
                rating: 5,
                review:
                    'Daisy has the kindest personality. She gets along with our other pets and brings a lot of warmth and laughter into our home.',
            },
        }),
        prisma.review.create({
            data: {
                name: 'Grace Mitchell',
                petName: 'Max',
                img: '/images/review-9.png',
                rating: 4,
                review:
                    'Max is full of life and always ready for an adventure. He’s smart, active, and loves going on long walks every morning.',
            },
        }),
        prisma.review.create({
            data: {
                name: 'Ryan Collins',
                petName: 'Nala',
                img: '/images/review-10.png',
                rating: 5,
                review:
                    'Nala has been the most affectionate and loyal companion. She loves attention and always greets us with excitement and tail wags.',
            },
        }),
    ]);

    // Create sample adoptions
    const adoptions = await Promise.all([
        prisma.adopt.create({
            data: {
                name: 'Laura Jane',
                petId: 1,
                address: '123 Main St, San Francisco, CA',
                email: 'laura.jane@example.com',
                phoneNo: '555-1234',
                reason: 'Looking for a calm companion.',
            },
        }),
        prisma.adopt.create({
            data: {
                name: 'John Doe',
                petId: 4,
                address: '456 Oak St, Los Angeles, CA',
                email: 'john.doe@example.com',
                phoneNo: '555-5678',
                reason: 'Looking for a playful companion.',
            },
        }),
        prisma.adopt.create({
            data: {
                name: 'Emily Smith',
                petId: 6,
                address: '789 Pine St, Los Angeles, CA',
                email: 'emily.smith@example.com',
                phoneNo: '555-9012',
                reason: 'Looking for a friendly companion.',
            },
        }),
    ]);

    console.log(`Seeded ${pets.length} pets:`);
    pets.forEach((pet) => console.log(`  - ${pet.name} (${pet.breed})`));
    reviews.forEach((review) =>
        console.log(`  - Review by ${review.name} for ${review.petName}`)
    );
    adoptions.forEach((adopt) =>
        console.log(`  - Adoption by ${adopt.name} for pet ID ${adopt.petId}`)
    );
}

main()
    .catch((e) => {
        console.error('Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
