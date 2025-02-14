console.log('Hello from seed.js');

const { client, createTables, createUsers, createSkills } = require('./db');

const seed = async () => {
    try {
        await client.connect();

        await createTables();
        console.log('Tables created!');
        console.log('Seeding the database...');
        const [moe, ethyl, lucy] = await Promise.all([
            createUsers('moe', 'stooge'),
            createUsers('ethyl', 'mertz'),
            createUsers('lucy', 'ricardo')
        ]);
        console.log('Users created!');
        console.log('Creating skills...');
        const [juggling, singing, stomping, baking] = await Promise.all([
            createSkills('juggling'),
            createSkills('singing'),
            createSkills('stomping'),
            createSkills('baking')
        ]);

    } catch (error) {
        console.error('Error seeding the database: ', error);
    }
}
seed();