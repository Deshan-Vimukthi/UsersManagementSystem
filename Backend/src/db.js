const mongoose = require('mongoose');


const MONGO_URI = 'database_url'; // Replace with your MongoDB connection URI

const connectDB = async () => {
   // connecting database
    // database has network access to any ip address
    mongoose.connect(MONGO_URI, {
    })
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.error(err));

}

module.exports = connectDB;
