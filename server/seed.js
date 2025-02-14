console.log('Hello from seed.js');

const { client, createTables, createUsers } = require('./db');

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

    } catch (error) {
        console.error('Error seeding the database: ', error);
    }
}
seed();