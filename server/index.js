const { client } = require('./db');

const init = async () => {
    try {
        console.log('Hello from index.js');
    }
    catch (error) {
        console.error('Error connecting to the database: ', error);
    }
};


init();