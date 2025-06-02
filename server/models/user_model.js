const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    college: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['student', 'admin'],
        default: 'student'
    },
    subscribed: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },

}, { timestamps: true });

const User = mongoose.model('user', userSchema);

module.exports = User;
