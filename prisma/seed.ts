import {
    getAdoptions,
    getPets,
    getReviews,
    resetStaticData,
} from '../lib/static-store';

async function main() {
    resetStaticData();

    console.log('Static seed loaded.');
    console.log(`Pets: ${getPets().length}`);
    console.log(`Reviews: ${getReviews().length}`);
    console.log(`Adoptions: ${getAdoptions().length}`);
}

main().catch((error) => {
    console.error('Static seed failed:', error);
    process.exitCode = 1;
});
