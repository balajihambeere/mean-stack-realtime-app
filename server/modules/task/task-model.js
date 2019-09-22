'use strict';

import mongoose from 'mongoose';

import { coreSchema } from '../../utils/core-schema';

const TaskSchema = coreSchema({
    name: {
        type: String,
        required: true
    },
    scheduleDate: {
        type: Date
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    projectId: {
        type: mongoose.Types.ObjectId,
        ref: 'Project',
        Index: true,
    },
    statusType: {
        type: String,
        enum: ['New', 'In-Progress', 'Cancelled', 'Completed'],
        default: 'New'
    },
});

const TaskModel = mongoose.model('Task', TaskSchema);

module.exports = { TaskModel };