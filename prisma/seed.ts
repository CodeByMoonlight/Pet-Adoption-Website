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
                type: 'Cat',
                sex: 'Female',
                age: 4,
                location: 'San Francisco, CA',
                description:
                    'Luna is a calm and affectionate Persian cat who enjoys curling up in sunny windows and watching the world go by. She thrives in peaceful spaces and loves gentle company. Her soft, luxurious fur requires regular grooming, but she rewards her humans with quiet purrs and gentle head nudges.',
                image: '/images/cat-1.png',
                traits: 'Calm,Gentle,Affectionate,Quiet,Indoor,Loyal,Observant,Soft-hearted',
                primaryCol: '#542C96',
                accentCol: '#E2D7F4',
            },
        }),
        prisma.pet.create({
            data: {
                name: 'Milo',
                breed: 'Siamese Cat',
                type: 'Cat',
                sex: 'Male',
                age: 2,
                location: 'Austin, TX',
                description:
                    'Milo is a playful Siamese cat with striking blue eyes and a curious mind. He enjoys exploring high places and following his humans from room to room. Intelligent and social, Milo quickly forms strong bonds and loves interactive playtime with toys that challenge his sharp reflexes and problem-solving nature.',
                image: '/images/cat-2.png',
                traits: 'Playful,Curious,Intelligent,Social,Energetic,Vocal,Loyal,Adventurous',
                primaryCol: '#43597F',
                accentCol: '#FFFFFF',
            },
        }),
        prisma.pet.create({
            data: {
                name: 'Cleo',
                breed: 'Maine Coon',
                type: 'Cat',
                sex: 'Female',
                age: 5,
                location: 'Portland, OR',
                description:
                    'Cleo is a majestic Maine Coon with a fluffy tail and a big heart. Despite her regal appearance, she’s down-to-earth and loves gentle attention. She enjoys lounging on soft blankets, chirping softly when happy, and curling near you while you read. Cleo is loyal, calm, and perfect for families seeking a gentle companion.',
                image: '/images/cat-3.png',
                traits: 'Loyal,Gentle,Patient,Calm,Affectionate,Independent,Graceful,Intelligent',
                primaryCol: '#5D4E04',
                accentCol: '#FBF1D0',
            },
        }),
        prisma.pet.create({
            data: {
                name: 'Oliver',
                breed: 'British Shorthair',
                type: 'Cat',
                sex: 'Male',
                age: 3,
                location: 'Chicago, IL',
                description:
                    'Oliver is a dignified British Shorthair with a plush gray coat and a calm personality. He enjoys quiet afternoons and short play sessions. A true gentleman, he’s not overly demanding but deeply enjoys companionship. He’s content sitting nearby, observing, and softly purring as he keeps you company during your daily routine.',
                image: '/images/cat-4.png',
                traits: 'Calm,Composed,Quiet,Observant,Independent,Affectionate,Patient,Clean',
                primaryCol: '#304F38',
                accentCol: '#DFECE2',
            },
        }), 
        prisma.pet.create({
            data: {
                name: 'Nala',
                breed: 'Bengal Cat',
                type: 'Cat',
                sex: 'Female',
                age: 2,
                location: 'Seattle, WA',
                description:
                    'Nala is an energetic Bengal cat with striking spotted fur and a confident personality. She loves climbing, chasing laser dots, and exploring every corner of her home. Always curious, she forms strong bonds with active owners who can match her enthusiasm. Nala brings life, laughter, and endless excitement to her surroundings.',
                image: '/images/cat-5.png',
                traits: 'Energetic,Confident,Curious,Playful,Agile,Social,Smart,Adventurous',
                primaryCol: '#87320D',
                accentCol: '#FCE6DE',
            },
        }),
        prisma.pet.create({
            data: {
                name: 'Max',
                breed: 'Golden Retriever',
                type: 'Dog',
                sex: 'Male',
                age: 5,
                location: 'Denver, CO',
                description:
                    'Max is a cheerful Golden Retriever who loves meeting new friends and going on outdoor adventures. His playful energy is balanced with patience and loyalty. Whether fetching a ball or relaxing by your side, Max radiates warmth and affection, making him a perfect family dog who thrives on companionship and love.',
                image: '/images/dog-1.png',
                traits: 'Friendly,Loyal,Playful,Gentle,Affectionate,Obedient,Patient,Outgoing',
                primaryCol: '#324E58',
                accentCol: '#DEEAED',
            },
        }),
        prisma.pet.create({
            data: {
                name: 'Bella',
                breed: 'Labrador Retriever',
                type: 'Dog',
                sex: 'Female',
                age: 4,
                location: 'Atlanta, GA',
                description:
                    'Bella is a loving Labrador Retriever who adores swimming, long walks, and spending time with people. She’s full of enthusiasm and has a heart as big as her smile. Intelligent and eager to please, Bella learns commands quickly and enjoys helping out, making her an ideal companion for families and first-time pet owners.',
                image: '/images/dog-2.png',
                traits: 'Affectionate,Energetic,Loyal,Smart,Social,Obedient,Playful,Kind',
                primaryCol: '#473A5A',
                accentCol: '#E5E0EB',
            },
        }),
        prisma.pet.create({
            data: {
                name: 'Rocky',
                breed: 'German Shepherd',
                type: 'Dog',
                sex: 'Male',
                age: 6,
                location: 'Dallas, TX',
                description:
                    'Rocky is a disciplined and intelligent German Shepherd who values structure and purpose. He excels in learning commands, protecting his home, and bonding deeply with his family. Despite his strong and confident exterior, Rocky is incredibly gentle with those he trusts, always alert, loyal, and ready to lend a helping paw.',
                image: '/images/dog-3.png',
                traits: 'Loyal,Protective,Smart,Brave,Strong,Obedient,Focused,Trustworthy',
                primaryCol: '#940A23',
                accentCol: '#FDE3E7',
            },
        }),
        prisma.pet.create({
            data: {
                name: 'Daisy',
                breed: 'Beagle',
                type: 'Dog',
                sex: 'Female',
                age: 3,
                location: 'Orlando, FL',
                description:
                    'Daisy is a curious Beagle with a love for adventure and an unmatched sense of smell. She enjoys exploring parks, following scents, and being part of the family’s daily activities. With her cheerful personality and expressive eyes, Daisy brings laughter and warmth wherever she goes, making her a joy to have around.',
                image: '/images/dog-4.png',
                traits: 'Curious,Playful,Happy,Social,Lively,Intelligent,Friendly,Active',
                primaryCol: '#684D08',
                accentCol: '#FBF1D0',
            },
        }),
        prisma.pet.create({
            data: {
                name: 'Charlie',
                breed: 'Corgi',
                type: 'Dog',
                sex: 'Male',
                age: 2,
                location: 'Boston, MA',
                description:
                    'Charlie is an outgoing Corgi with a big personality and short little legs that never stop moving. He’s always ready for playtime, especially fetch or short runs in the park. His expressive face and fluffy coat make him irresistible, and his loyalty ensures he never strays far from his favorite humans, always eager to please.',
                image: '/images/dog-5.png',
                traits: 'Playful,Loyal,Funny,Outgoing,Smart,Cheerful,Brave,Affectionate',
                primaryCol: '#8A0A0A',
                accentCol: '#FBD0D0',
            },
        }),
        prisma.pet.create({
            data: {
                name: 'Mochi',
                breed: 'British Shorthair',
                type: 'Cat',
                sex: 'Male',
                age: 3,
                location: 'Los Angeles, CA',
                description:
                    'Mochi is a chubby British Shorthair who loves lounging on soft pillows and chasing feather toys. He enjoys quiet afternoons and is always up for a cozy nap near his favorite human.',
                image: '/images/cat-6.png',
                traits: 'Playful,Loyal,Curious,Affectionate,Quiet,Indoor,Laid-back,Gentle',
                primaryCol: '#4A443F',
                accentCol: '#E8E5E3',
            },
        }),
        prisma.pet.create({
            data: {
                name: 'Nala',
                breed: 'Siamese Cat',
                type: 'Cat',
                sex: 'Female',
                age: 2,
                location: 'Austin, TX',
                description:
                    'Nala is a smart and talkative Siamese who loves attention and conversation. She forms strong bonds with her humans and enjoys following them around the house.',
                image: '/images/cat-7.png',
                traits: 'Vocal,Intelligent,Loyal,Active,Social,Affectionate,Graceful,Alert',
                primaryCol: '#004299',
                accentCol: '#CCE2FF',
            },
        }),
        prisma.pet.create({
            data: {
                name: 'Milo',
                breed: 'Ragdoll',
                type: 'Cat',
                sex: 'Male',
                age: 5,
                location: 'Seattle, WA',
                description:
                    'Milo is a gentle Ragdoll with a soft, silky coat and a relaxed personality. He loves being held and will melt into your arms for hours of cuddles.',
                image: '/images/cat-8.png',
                traits: 'Gentle,Loving,Relaxed,Quiet,Trusting,Affectionate,Indoor,Patient',
                primaryCol: '#842E06',
                accentCol: '#FAE2D6',
            },
        }),
        prisma.pet.create({
            data: {
                name: 'Cleo',
                breed: 'Maine Coon',
                type: 'Cat',
                sex: 'Female',
                age: 4,
                location: 'Chicago, IL',
                description:
                    'Cleo is a majestic Maine Coon with a playful spirit and a kind heart. She enjoys exploring high places and loves interactive toys that keep her busy.',
                image: '/images/cat-9.png',
                traits: 'Playful,Curious,Confident,Friendly,Social,Brave,Smart,Alert',
                primaryCol: '#754600',
                accentCol: '#FFF1DB',
            },
        }),
        prisma.pet.create({
            data: {
                name: 'Oreo',
                breed: 'Tuxedo Cat',
                type: 'Cat',
                sex: 'Male',
                age: 1,
                location: 'New York, NY',
                description:
                    'Oreo is a curious little Tuxedo cat who loves exploring new spaces and climbing on furniture. He’s full of energy and enjoys being the center of attention.',
                image: '/images/cat-10.png',
                traits: 'Energetic,Curious,Playful,Cheerful,Brave,Loyal,Smart,Fun-loving',
                primaryCol: '#94001B',
                accentCol: '#FFE0E6',
            },
        }),
        prisma.pet.create({
            data: {
                name: 'Buddy',
                breed: 'Golden Retriever',
                type: 'Dog',
                sex: 'Male',
                age: 5,
                location: 'Denver, CO',
                description:
                    'Buddy is a cheerful Golden Retriever who loves outdoor adventures and meeting new people. His happy energy and loyalty make him the perfect family dog.',
                image: '/images/dog-6.png',
                traits: 'Friendly,Active,Loyal,Playful,Outgoing,Affectionate,Obedient,Cheerful',
                primaryCol: '#6D4417',
                accentCol: '#F8EAD8',
            },
        }),
        prisma.pet.create({
            data: {
                name: 'Luna',
                breed: 'Siberian Husky',
                type: 'Dog',
                sex: 'Female',
                age: 3,
                location: 'Portland, OR',
                description:
                    'Luna is a beautiful Husky with striking blue eyes and a love for the outdoors. She enjoys long walks, snow play, and spending time with her favorite humans.',
                image: '/images/dog-7.png',
                traits: 'Energetic,Brave,Independent,Loyal,Alert,Playful,Adventurous,Smart',
                primaryCol: '#254D74',
                accentCol: '#DCE7F4',
            },
        }),
        prisma.pet.create({
            data: {
                name: 'Rocky',
                breed: 'Beagle',
                type: 'Dog',
                sex: 'Male',
                age: 2,
                location: 'Miami, FL',
                description:
                    'Rocky is a curious and joyful Beagle who loves exploring new scents and greeting everyone with his wagging tail. He’s happiest when he’s part of the fun.',
                image: '/images/dog-8.png',
                traits: 'Curious,Happy,Playful,Loyal,Social,Smart,Alert,Active',
                primaryCol: '#644A07',
                accentCol: '#FCF2DA',
            },
        }),
        prisma.pet.create({
            data: {
                name: 'Daisy',
                breed: 'Corgi',
                type: 'Dog',
                sex: 'Female',
                age: 4,
                location: 'Dallas, TX',
                description:
                    'Daisy is a cheerful Corgi with short legs and a big personality. She loves belly rubs, short walks, and being the center of attention wherever she goes.',
                image: '/images/dog-9.png',
                traits: 'Playful,Cheerful,Affectionate,Loyal,Curious,Social,Brave,Smart',
                primaryCol: '#00367D',
                accentCol: '#E0EEFF',
            },
        }),
        prisma.pet.create({
            data: {
                name: 'Max',
                breed: 'German Shepherd',
                type: 'Dog',
                sex: 'Male',
                age: 6,
                location: 'Phoenix, AZ',
                description:
                    'Max is a loyal German Shepherd who is protective yet gentle with his loved ones. He’s highly intelligent and thrives with both mental and physical activity.',
                image: '/images/dog-10.png',
                traits: 'Loyal,Protective,Smart,Brave,Strong,Alert,Confident,Calm',
                primaryCol: '#7F2F0A',
                accentCol: '#FAE2D6',
            },
        }),
                prisma.pet.create({
            data: {
                name: 'Luna',
                breed: 'Persian Cat',
                type: 'Cat',
                sex: 'Female',
                age: 4,
                location: 'San Francisco, CA',
                description:
                    'Luna is a calm and affectionate Persian cat who enjoys curling up in sunny windows and watching the world go by. She thrives in peaceful spaces and loves gentle company. Her soft, luxurious fur requires regular grooming, but she rewards her humans with quiet purrs and gentle head nudges.',
                image: '/images/cat-1.png',
                traits: 'Calm,Gentle,Affectionate,Quiet,Indoor,Loyal,Observant,Soft-hearted',
                primaryCol: '#542C96',
                accentCol: '#E2D7F4',
            },
        }),
        prisma.pet.create({
            data: {
                name: 'Milo',
                breed: 'Siamese Cat',
                type: 'Cat',
                sex: 'Male',
                age: 2,
                location: 'Austin, TX',
                description:
                    'Milo is a playful Siamese cat with striking blue eyes and a curious mind. He enjoys exploring high places and following his humans from room to room. Intelligent and social, Milo quickly forms strong bonds and loves interactive playtime with toys that challenge his sharp reflexes and problem-solving nature.',
                image: '/images/cat-2.png',
                traits: 'Playful,Curious,Intelligent,Social,Energetic,Vocal,Loyal,Adventurous',
                primaryCol: '#43597F',
                accentCol: '#FFFFFF',
            },
        }),
        prisma.pet.create({
            data: {
                name: 'Cleo',
                breed: 'Maine Coon',
                type: 'Cat',
                sex: 'Female',
                age: 5,
                location: 'Portland, OR',
                description:
                    'Cleo is a majestic Maine Coon with a fluffy tail and a big heart. Despite her regal appearance, she’s down-to-earth and loves gentle attention. She enjoys lounging on soft blankets, chirping softly when happy, and curling near you while you read. Cleo is loyal, calm, and perfect for families seeking a gentle companion.',
                image: '/images/cat-3.png',
                traits: 'Loyal,Gentle,Patient,Calm,Affectionate,Independent,Graceful,Intelligent',
                primaryCol: '#5D4E04',
                accentCol: '#FBF1D0',
            },
        }),
        prisma.pet.create({
            data: {
                name: 'Oliver',
                breed: 'British Shorthair',
                type: 'Cat',
                sex: 'Male',
                age: 3,
                location: 'Chicago, IL',
                description:
                    'Oliver is a dignified British Shorthair with a plush gray coat and a calm personality. He enjoys quiet afternoons and short play sessions. A true gentleman, he’s not overly demanding but deeply enjoys companionship. He’s content sitting nearby, observing, and softly purring as he keeps you company during your daily routine.',
                image: '/images/cat-4.png',
                traits: 'Calm,Composed,Quiet,Observant,Independent,Affectionate,Patient,Clean',
                primaryCol: '#304F38',
                accentCol: '#DFECE2',
            },
        }), 
        prisma.pet.create({
            data: {
                name: 'Nala',
                breed: 'Bengal Cat',
                type: 'Cat',
                sex: 'Female',
                age: 2,
                location: 'Seattle, WA',
                description:
                    'Nala is an energetic Bengal cat with striking spotted fur and a confident personality. She loves climbing, chasing laser dots, and exploring every corner of her home. Always curious, she forms strong bonds with active owners who can match her enthusiasm. Nala brings life, laughter, and endless excitement to her surroundings.',
                image: '/images/cat-5.png',
                traits: 'Energetic,Confident,Curious,Playful,Agile,Social,Smart,Adventurous',
                primaryCol: '#87320D',
                accentCol: '#FCE6DE',
            },
        }),
        prisma.pet.create({
            data: {
                name: 'Max',
                breed: 'Golden Retriever',
                type: 'Dog',
                sex: 'Male',
                age: 5,
                location: 'Denver, CO',
                description:
                    'Max is a cheerful Golden Retriever who loves meeting new friends and going on outdoor adventures. His playful energy is balanced with patience and loyalty. Whether fetching a ball or relaxing by your side, Max radiates warmth and affection, making him a perfect family dog who thrives on companionship and love.',
                image: '/images/dog-1.png',
                traits: 'Friendly,Loyal,Playful,Gentle,Affectionate,Obedient,Patient,Outgoing',
                primaryCol: '#324E58',
                accentCol: '#DEEAED',
            },
        }),
        prisma.pet.create({
            data: {
                name: 'Bella',
                breed: 'Labrador Retriever',
                type: 'Dog',
                sex: 'Female',
                age: 4,
                location: 'Atlanta, GA',
                description:
                    'Bella is a loving Labrador Retriever who adores swimming, long walks, and spending time with people. She’s full of enthusiasm and has a heart as big as her smile. Intelligent and eager to please, Bella learns commands quickly and enjoys helping out, making her an ideal companion for families and first-time pet owners.',
                image: '/images/dog-2.png',
                traits: 'Affectionate,Energetic,Loyal,Smart,Social,Obedient,Playful,Kind',
                primaryCol: '#473A5A',
                accentCol: '#E5E0EB',
            },
        }),
        prisma.pet.create({
            data: {
                name: 'Rocky',
                breed: 'German Shepherd',
                type: 'Dog',
                sex: 'Male',
                age: 6,
                location: 'Dallas, TX',
                description:
                    'Rocky is a disciplined and intelligent German Shepherd who values structure and purpose. He excels in learning commands, protecting his home, and bonding deeply with his family. Despite his strong and confident exterior, Rocky is incredibly gentle with those he trusts, always alert, loyal, and ready to lend a helping paw.',
                image: '/images/dog-3.png',
                traits: 'Loyal,Protective,Smart,Brave,Strong,Obedient,Focused,Trustworthy',
                primaryCol: '#940A23',
                accentCol: '#FDE3E7',
            },
        }),
        prisma.pet.create({
            data: {
                name: 'Daisy',
                breed: 'Beagle',
                type: 'Dog',
                sex: 'Female',
                age: 3,
                location: 'Orlando, FL',
                description:
                    'Daisy is a curious Beagle with a love for adventure and an unmatched sense of smell. She enjoys exploring parks, following scents, and being part of the family’s daily activities. With her cheerful personality and expressive eyes, Daisy brings laughter and warmth wherever she goes, making her a joy to have around.',
                image: '/images/dog-4.png',
                traits: 'Curious,Playful,Happy,Social,Lively,Intelligent,Friendly,Active',
                primaryCol: '#684D08',
                accentCol: '#FBF1D0',
            },
        }),
        prisma.pet.create({
            data: {
                name: 'Charlie',
                breed: 'Corgi',
                type: 'Dog',
                sex: 'Male',
                age: 2,
                location: 'Boston, MA',
                description:
                    'Charlie is an outgoing Corgi with a big personality and short little legs that never stop moving. He’s always ready for playtime, especially fetch or short runs in the park. His expressive face and fluffy coat make him irresistible, and his loyalty ensures he never strays far from his favorite humans, always eager to please.',
                image: '/images/dog-5.png',
                traits: 'Playful,Loyal,Funny,Outgoing,Smart,Cheerful,Brave,Affectionate',
                primaryCol: '#8A0A0A',
                accentCol: '#FBD0D0',
            },
        }),
        prisma.pet.create({
            data: {
                name: 'Mochi',
                breed: 'British Shorthair',
                type: 'Cat',
                sex: 'Male',
                age: 3,
                location: 'Los Angeles, CA',
                description:
                    'Mochi is a chubby British Shorthair who loves lounging on soft pillows and chasing feather toys. He enjoys quiet afternoons and is always up for a cozy nap near his favorite human.',
                image: '/images/cat-6.png',
                traits: 'Playful,Loyal,Curious,Affectionate,Quiet,Indoor,Laid-back,Gentle',
                primaryCol: '#4A443F',
                accentCol: '#E8E5E3',
            },
        }),
        prisma.pet.create({
            data: {
                name: 'Nala',
                breed: 'Siamese Cat',
                type: 'Cat',
                sex: 'Female',
                age: 2,
                location: 'Austin, TX',
                description:
                    'Nala is a smart and talkative Siamese who loves attention and conversation. She forms strong bonds with her humans and enjoys following them around the house.',
                image: '/images/cat-7.png',
                traits: 'Vocal,Intelligent,Loyal,Active,Social,Affectionate,Graceful,Alert',
                primaryCol: '#004299',
                accentCol: '#CCE2FF',
            },
        }),
        prisma.pet.create({
            data: {
                name: 'Milo',
                breed: 'Ragdoll',
                type: 'Cat',
                sex: 'Male',
                age: 5,
                location: 'Seattle, WA',
                description:
                    'Milo is a gentle Ragdoll with a soft, silky coat and a relaxed personality. He loves being held and will melt into your arms for hours of cuddles.',
                image: '/images/cat-8.png',
                traits: 'Gentle,Loving,Relaxed,Quiet,Trusting,Affectionate,Indoor,Patient',
                primaryCol: '#842E06',
                accentCol: '#FAE2D6',
            },
        }),
        prisma.pet.create({
            data: {
                name: 'Cleo',
                breed: 'Maine Coon',
                type: 'Cat',
                sex: 'Female',
                age: 4,
                location: 'Chicago, IL',
                description:
                    'Cleo is a majestic Maine Coon with a playful spirit and a kind heart. She enjoys exploring high places and loves interactive toys that keep her busy.',
                image: '/images/cat-9.png',
                traits: 'Playful,Curious,Confident,Friendly,Social,Brave,Smart,Alert',
                primaryCol: '#754600',
                accentCol: '#FFF1DB',
            },
        }),
        prisma.pet.create({
            data: {
                name: 'Oreo',
                breed: 'Tuxedo Cat',
                type: 'Cat',
                sex: 'Male',
                age: 1,
                location: 'New York, NY',
                description:
                    'Oreo is a curious little Tuxedo cat who loves exploring new spaces and climbing on furniture. He’s full of energy and enjoys being the center of attention.',
                image: '/images/cat-10.png',
                traits: 'Energetic,Curious,Playful,Cheerful,Brave,Loyal,Smart,Fun-loving',
                primaryCol: '#94001B',
                accentCol: '#FFE0E6',
            },
        }),
        prisma.pet.create({
            data: {
                name: 'Buddy',
                breed: 'Golden Retriever',
                type: 'Dog',
                sex: 'Male',
                age: 5,
                location: 'Denver, CO',
                description:
                    'Buddy is a cheerful Golden Retriever who loves outdoor adventures and meeting new people. His happy energy and loyalty make him the perfect family dog.',
                image: '/images/dog-6.png',
                traits: 'Friendly,Active,Loyal,Playful,Outgoing,Affectionate,Obedient,Cheerful',
                primaryCol: '#6D4417',
                accentCol: '#F8EAD8',
            },
        }),
        prisma.pet.create({
            data: {
                name: 'Luna',
                breed: 'Siberian Husky',
                type: 'Dog',
                sex: 'Female',
                age: 3,
                location: 'Portland, OR',
                description:
                    'Luna is a beautiful Husky with striking blue eyes and a love for the outdoors. She enjoys long walks, snow play, and spending time with her favorite humans.',
                image: '/images/dog-7.png',
                traits: 'Energetic,Brave,Independent,Loyal,Alert,Playful,Adventurous,Smart',
                primaryCol: '#254D74',
                accentCol: '#DCE7F4',
            },
        }),
        prisma.pet.create({
            data: {
                name: 'Rocky',
                breed: 'Beagle',
                type: 'Dog',
                sex: 'Male',
                age: 2,
                location: 'Miami, FL',
                description:
                    'Rocky is a curious and joyful Beagle who loves exploring new scents and greeting everyone with his wagging tail. He’s happiest when he’s part of the fun.',
                image: '/images/dog-8.png',
                traits: 'Curious,Happy,Playful,Loyal,Social,Smart,Alert,Active',
                primaryCol: '#644A07',
                accentCol: '#FCF2DA',
            },
        }),
        prisma.pet.create({
            data: {
                name: 'Daisy',
                breed: 'Corgi',
                type: 'Dog',
                sex: 'Female',
                age: 4,
                location: 'Dallas, TX',
                description:
                    'Daisy is a cheerful Corgi with short legs and a big personality. She loves belly rubs, short walks, and being the center of attention wherever she goes.',
                image: '/images/dog-9.png',
                traits: 'Playful,Cheerful,Affectionate,Loyal,Curious,Social,Brave,Smart',
                primaryCol: '#00367D',
                accentCol: '#E0EEFF',
            },
        }),
        prisma.pet.create({
            data: {
                name: 'Max',
                breed: 'German Shepherd',
                type: 'Dog',
                sex: 'Male',
                age: 6,
                location: 'Phoenix, AZ',
                description:
                    'Max is a loyal German Shepherd who is protective yet gentle with his loved ones. He’s highly intelligent and thrives with both mental and physical activity.',
                image: '/images/dog-10.png',
                traits: 'Loyal,Protective,Smart,Brave,Strong,Alert,Confident,Calm',
                primaryCol: '#7F2F0A',
                accentCol: '#FAE2D6',
            },
        }),
    ]);

    // Create sample reviews
    const reviews = await Promise.all([
        prisma.review.create({
            data: {
                name: 'Laura Jane',
                petName: 'Luna',
                img: '/images/review-1.jpg',
                rating: 4,
                review:
                    'Luna has been a wonderful addition to our family. She is so calm and loving, and her gentle nature brings so much peace to our home.',
            },
        }),
        prisma.review.create({
            data: {
                name: 'Michael Torres',
                petName: 'Buddy',
                img: '/images/review-2.jpg',
                rating: 5,
                review:
                    'Buddy is full of energy and always ready to play fetch. He instantly bonded with my kids and brings joy to everyone he meets.',
            },
        }),
        prisma.review.create({
            data: {
                name: 'Chloe Ramirez',
                petName: 'Whiskers',
                img: '/images/review-3.jpg',
                rating: 4,
                review:
                    'Whiskers is incredibly playful and affectionate. He loves to nap by the window and cuddle during movie nights.',
            },
        }),
        prisma.review.create({
            data: {
                name: 'Daniel Cruz',
                petName: 'Bella',
                img: '/images/review-4.jpg',
                rating: 5,
                review:
                    'Bella is such a sweetheart! She’s gentle, friendly, and has adjusted perfectly to our apartment life. Highly recommend adopting her breed.',
            },
        }),
        prisma.review.create({
            data: {
                name: 'Samantha Lee',
                petName: 'Rocky',
                img: '/images/review-5.jpg',
                rating: 3,
                review:
                    'Rocky took a little time to warm up, but now he’s incredibly loyal and fun to have around. Great companion for morning runs.',
            },
        }),
        prisma.review.create({
            data: {
                name: 'Andrew Parker',
                petName: 'Milo',
                img: '/images/review-6.jpg',
                rating: 5,
                review:
                    'Milo is absolutely adorable and easy to train. He quickly learned commands and has been the friendliest dog in our neighborhood.',
            },
        }),
        prisma.review.create({
            data: {
                name: 'Julia Fernandez',
                petName: 'Coco',
                img: '/images/review-7.jpg',
                rating: 4,
                review:
                    'Coco is so gentle and sweet. She loves curling up next to us while we read or watch TV. Perfect for anyone wanting a calm companion.',
            },
        }),
        prisma.review.create({
            data: {
                name: 'Ethan Brooks',
                petName: 'Daisy',
                img: '/images/review-8.jpg',
                rating: 5,
                review:
                    'Daisy has the kindest personality. She gets along with our other pets and brings a lot of warmth and laughter into our home.',
            },
        }),
        prisma.review.create({
            data: {
                name: 'Grace Mitchell',
                petName: 'Max',
                img: '/images/review-9.jpg',
                rating: 4,
                review:
                    'Max is full of life and always ready for an adventure. He’s smart, active, and loves going on long walks every morning.',
            },
        }),
        prisma.review.create({
            data: {
                name: 'Ryan Collins',
                petName: 'Nala',
                img: '/images/review-10.jpg',
                rating: 5,
                review:
                    'Nala has been the most affectionate and loyal companion. She loves attention and always greets us with excitement and tail wags.',
            },
        }),
    ]);

    console.log(`Seeded ${pets.length} pets:`);
    pets.forEach((pet) => console.log(`  - ${pet.name} (${pet.breed})`));
    reviews.forEach((review) =>
        console.log(`  - Review by ${review.name} for ${review.petName}`)
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
