const mongoose = require('mongoose');


const MONGO_URI = 'mongodb+srv://deshanvimukthi976:SZrNzGqnSjLunP87@cluster0.hotklnh.mongodb.net/Users?retryWrites=true&w=majority'; // Replace with your MongoDB connection URI

const connectDB = async () => {
   // connecting database
    // database has network access to any ip address
    mongoose.connect(MONGO_URI, {
    })
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.error(err));

}

module.exports = connectDB;
