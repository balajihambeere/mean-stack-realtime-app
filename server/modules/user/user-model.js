'use strict';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { coreSchema } from '../../utils/core-schema';

export const UserSchema = coreSchema({
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    profile: {
        fullName: {
            type: String,
        },
        phone: {
            type: String,
        },
        avatar: {
            type: String,
        },
        city: {
            type: String,
        },
        country: {
            type: String,
        },
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

UserSchema.methods.comparePassword = (requestedPassword, password) => {
    return bcrypt.compareSync(requestedPassword, password);
};

const UserModel = mongoose.model('User', UserSchema);

module.exports = { UserModel };