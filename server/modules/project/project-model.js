'use strict';

import mongoose from 'mongoose';

import { coreSchema } from '../../utils/core-schema';

const ProjectSchema = coreSchema({
    name: {
        type: String,
    },
    createdDate: {
        type: Date,
        default: Date.now,
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        Index: true,
        required: true,
    }
});

const ProjectModel = mongoose.model('Project', ProjectSchema);

module.exports = { ProjectModel };