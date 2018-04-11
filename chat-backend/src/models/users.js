const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,

    },
    handle: {
        type: String,
        required: true,
        trim: true,
        unique: true,

    },
    password: {

        type: String,
        required: true,
        trim: true
    },

    online: {
        type: Boolean,
    }
});

UserSchema.index({ handle: 'text' });

module.exports = mongoose.model('user', UserSchema);