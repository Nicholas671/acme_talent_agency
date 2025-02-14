const pg = require('pg');
require('dotenv').config();

const client = new pg.Client(process.env.DATABASE_URL);



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


createUsers = async (username, password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 5);
        const SQL = `INSERT INTO users(id, username, password) VALUES($1, $2, $3) RETURNING *;
        `;
        const { rows } = await client.query(SQL, [uuid(), username, hashedPassword]);
        return rows[0];
    } catch (error) {
        console.error('Error creating users: ', error);
    }
};

const createSkills = async (skillName) => {
    try {
        const SQL = `INSERT INTO skills(id, name) VALUES($1, $2) RETURNING *;
        `;
        const { rows } = await client.query(SQL, [uuid(), skillName]);
        return rows[0];
    } catch (error) {
        console.error('Error creating skills: ', error);
    }

}

const createUserSkills = async (userId, skillId) => {
    try {
        const SQL = `INSERT INTO user_skills(id, user_id, skill_id) VALUES($1, $2, $3) RETURNING *;
        `;
        const { rows } = await client.query(SQL, [uuid(), userId, skillId]);
        return rows[0];
    } catch (error) {
        console.error('Error creating user skills: ', error);
    }
}

const fetchUsers = async () => {
    try {
        const SQL = `SELECT * FROM users;
        `;
        const { rows } = await client.query(SQL);
        return rows;
    } catch (error) {
        console.error('Error fetching users: ', error);
    }
};

const fetchUsersById = async (id) => {
    try {
        const SQL = `SELECT * FROM users WHERE id = $1;
        `;
        const { rows } = await client.query(SQL, [id]);
        return rows;
    } catch (error) {
        console.error('Error fetching user by id: ', error);
    }
};

fetchSkills = async () => {
    try {
        const SQL = `SELECT * FROM skills;
        `;
        const { rows } = await client.query(SQL);
        return rows;
    } catch (error) {
        console.error('Error fetching skills: ', error);
    }
};
fetchSkillsById = async (userId) => {
    try {
        const SQL = `SELECT skills.* FROM skills
        JOIN user_skills ON skills.id = user_skills.skill_id
        WHERE user_skills.user_id = $1;
        `;
        const { rows } = await client.query(SQL, [userId]);
        return rows;
    } catch (error) {
        console.error('Error fetching skills by user id: ', error);
    }
};


module.exports = {
    client,
    createTables,
    createUsers,
    createSkills,
    createUserSkills,
    fetchUsers,
    fetchUsersById,
    fetchSkillsById,
    fetchSkills,
};