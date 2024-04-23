const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['ADMIN', 'USER'], // Enforce valid user types
    },
    status: {
        type: String,
        required: true,
        enum: ['ACTIVE', 'INACTIVE','ONBOARD'], // Enforce valid statuses
    },
    basic_info: {
        id:{
            type: String,
            required: false,
        },
        first_name: {
            type: String,
            required: true,
        },
        last_name: {
            type: String,
            required: false,
        },
        dob: {
            type: Date,
            required: false,
        },
        gender: {
            type: String,
            required: false,
            enum: ['MALE', 'FEMALE'],
        },
    },
    contact_info: {
        mobile_number: {
            type: String,
            required: false,
            unique: true, // Ensure unique mobile numbers
        },
        email: {
            type: String,
            required: false,
            unique: true, // Ensure unique emails
        },
    },
    auth_info: {
        password: {
            type: String,
            required: false,
        },
    },
});

module.exports = mongoose.model('User', userSchema);
