const pg = require('pg');
require('dotenv').config();

const client = new pg.Client(process.env.DATABASE_URL);

client.connect()
    .then(() => console.log('Connected to the database!'))
    .catch(err => console.error('Connection error', err.stack));

const createTables = async () => {
    try {
        const SQL = `
         DROP TABLE IF EXISTS user_skills;
            DROP TABLE IF EXISTS users;
            DROP TABLE IF EXISTS skills;
            CREATE TABLE users (
                id UUID PRIMARY KEY,
                username VARCHAR(64) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL
            )
            CREATE TABLE skills (
                id UUID PRIMARY KEY,
                name VARCHAR(64) UNIQUE NOT NULL);
            CREATE TABLE user_skills (
            id UUID PRIMARY KEY,
            user_id UUID REFERENCES users(id) NOT NULL,
            skill_id UUID REFERENCES skills(id) NOT NULL
            CONSTRAINT unique_user_skills UNIQUE(user_id, skill_id)
            );
             `
        await client.query(SQL);
    } catch (error) {
        console.error('Error creating tables: ', error);
    }
};





module.exports = {
    client,
    createTables
};