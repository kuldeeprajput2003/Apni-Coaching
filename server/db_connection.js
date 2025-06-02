const mongoose = require('mongoose');

async function DBConnection(url) {
    try {
        mongoose.connect(url)
        .then(() => {
            console.log('Connected to the database successfully');
        })
        .catch((error) => {
            console.log('Error connecting to the database:', error);
        });
        
    } catch (error) {
        console.log('Error connecting to the database:', error);        
    }
    
}

module.exports = DBConnection;