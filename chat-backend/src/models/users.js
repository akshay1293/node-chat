const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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

UserSchema.pre('save', function (next) {
    const user = this;

    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, (hashErr, hash) => {
            if (hashErr) return next(hashErr);
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function (toCompare, done) {
    bcrypt.compare(toCompare, this.password, (err, isMatch) => {
        if (err) done(err);
        else done(err, isMatch);
    });
};
UserSchema.index({ handle: 'text' });

module.exports = mongoose.model('user', UserSchema);