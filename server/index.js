
const express = require('express');
require('dotenv').config();
const app = express();
const { createUsers, createUserSkills, fetchUsers, fetchSkills, fetchSkillsById } = require('./db');

const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(require('morgan')('dev'));

app.get('/api/users', async (req, res, next) => {
    try {
        const users = await fetchUsers();
        res.send(users);

    }
    catch (error) {
        next(error);
    }
});

app.post('/api/users', async (req, res, next) => {
    try {
        const users = await createUsers(req.body.name, req.body.password);
        res.send(users);
    }
    catch (error) {
        next(error);
    }
});

app.put('/api/users/:id', async (req, res, next) => {
    try {
        const users = await updateUsers(req.params.id, req.body.name, req.body.password);
        res.send(users);
    }
    catch (error) {
        next(error);
    }
});

app.delete('/api/users/:id', async (req, res, next) => {
    try {
        const users = await deleteUsers(req.params.id);
        res.send(users);
    }
    catch (error) {
        next(error);
    }
});



app.post('/api/users/:userid/skills/:id/skills', async (req, res, next) => {
    try {
        const userSkills = await createUserSkills(req.params.id, req.body.skill);
        res.send(userSkills);
    }
    catch (error) {
        next(error);
    }
}
);
app.get('/api/skills', async (req, res, next) => {
    try {
        const skills = await fetchSkills();
        res.send(skills);
    }
    catch (error) {
        next(error);
    }
});

app.get('/api/users/:id/skills', async (req, res, next) => {
    try {
        const skills = await fetchSkillsById(req.params.id);
        res.send(skills);
    }
    catch (error) {
        next(error);
    }
}
);

app.post('/api/users/:id/skills', async (req, res, next) => {
    try {
        const skills = await createSkills(req.params.id, req.body.skill);
        res.send(skills);
    }
    catch (error) {
        next(error);
    }
});

app.put('/api/users/:id/skills', async (req, res, next) => {
    try {
        const skills = await updateSkills(req.params.id, req.body.skill);
        res.send(skills);
    }
    catch (error) {
        next(error);
    }
});


const init = async () => {
    try {
        console.log('Hello from index.js');
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    }
    catch (error) {
        console.error('Error connecting to the database: ', error);
    }
};


init();