const User = require('./src/model/user');
const bcrypt = require('bcryptjs');
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const connectDB = require('./src/db');
const crypto = require("crypto");
const mongoose = require('mongoose');

connectDB().then();

// Initialize Express app
const app = express();
const PORT = 5050;
app.use(express.json());

// JWT Secret Key
const generateSecretKey = () => {
    return crypto.randomBytes(32).toString('hex');
}
const secretKey = generateSecretKey(); // Replace with your own secret key

// This encryption does not used cause frontend error
const saltRounds = 10; // Adjust based on security needs
const adminHashedPassword = bcrypt.hash('adminpassword', saltRounds);

// API for login with JWT authentication
app.post('/api/login', (req, res) => {
    //email and password send through the body.
    try{
        let email = req.body.email;
        let hashedPassword = req.body.password;
        console.log(email);
        console.log(hashedPassword);
        // this is hard corded Admin login this can be develop to get userType from database
        if (email === 'admin@gmail.com' && hashedPassword === 'adminpassword') {
            const user = { email: 'admin@gmail.com' }; // You can add more user details here if needed
            const accessToken = jwt.sign(user, secretKey);
            res.json({ token : {accessToken}, user_type : "admin" });
            console.log("AccessToken was generated!");
            console.log({accessToken});
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    }catch (e) {
        res.status(401).json({ message: 'Invalid credentials' });
        console.log(e.message);
    }

});

// API for an ADMIN to add a USER
app.post('/api/add_user', async(req, res) => {
    //get email from req.body
    if (req.body.user_email !== 'admin@gmail.com') {
        return res.status(401).json({ message: 'Unauthorized in post' });
    }
    console.log(req.body.basic_info.first_name);
    // rest of req.body.data use to create user
    const user = new User({
        type:req.body.type,
        status:req.body.status,
        basic_info:{
            id: req.body.basic_info.id,
            first_name:req.body.basic_info.first_name,
            last_name:req.body.basic_info.last_name,
            dob:req.body.basic_info.dob,
            gender:req.body.basic_info.gender
        },
        contact_info:{
            mobile_number:req.body.contact_info.mobile_number,
            email:req.body.contact_info.email
        },
        auth_info:{
            password:req.body.auth_info.password
        }
    });

    try {
        // try to save user
        const newUser = user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// API for retrieving all USERS except ADMIN
app.get('/api/users', async (req, res) => {

    if (req.query.user_email !== 'admin@gmail.com') {
        return res.status(401).json({ message: 'Unauthorized  in get' });
    }

    try {
        //getting every users. its can filter using filter in User.find({field_name:'value'})
        const users = await User.find({ });
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


//can create new get API to get user by name or email or something. use User.find({field_name:'value'}) in it and quary to get field value.


// Comfirming that database connection opened
mongoose.connection.once('open', () => {
    console.log(`MongoDB is Connected`);

})
// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));