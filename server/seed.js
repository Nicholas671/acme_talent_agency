console.log('Hello from seed.js');

const { client, createTables } = require('./db');

const seed = async () => {
    try {
        await client.connect();
        console.log('Connected to the database!');
        await createTables();
        console.log('Tables created!');
    } catch (error) {
        console.error('Error seeding the database: ', error);
    }
}