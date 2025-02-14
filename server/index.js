const { client } = require('./db');

const init = () => {
    try {


    }
    catch (error) {
        console.error('Error connecting to the database: ', error);
    }
};

init();