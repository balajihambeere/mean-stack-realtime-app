'use strict';
import { TaskModel } from './task-model';
import { ProjectModel } from '../project/project-model';
import mongoose from 'mongoose';

import { successMessage, errorMessage } from '../../utils/response-message';
import {
    ADDED_TASK_SUCCESS, UPDATED_TASK_SUCCESS, FETCHED_TASK_SUCCESS,
    REMOVED_TASK_SUCCESS
} from '../../utils/constants';

const add = async (request, response) => {
    const { name, projectId, scheduleDate } = request.body;
    try {
        const newTask = new TaskModel({ name, projectId, scheduleDate });
        const result = await newTask.save();
        return response.formatter.ok(result, successMessage(ADDED_TASK_SUCCESS));
    } catch (error) {
        return response.formatter.serverError(errorMessage(error.message));
    }
};

const update = async (request, response) => {
    try {
        const result = await TaskModel.findOneAndUpdate({ _id: request.params.taskId }, request.body, { new: true });
        return response.formatter.ok(result, successMessage(UPDATED_TASK_SUCCESS));
    } catch (error) {
        return response.formatter.serverError(errorMessage(error.message));
    }
};

const getById = async (request, response) => {
    try {
        const result = await TaskModel.find({ _id: request.params.id });
        return response.formatter.ok(result, successMessage(FETCHED_TASK_SUCCESS));
    } catch (error) {
        return response.formatter.serverError(errorMessage(error.message));
    }
};

const getByProjectId = async (request, response) => {
    const query = [
        { $match: { _id: mongoose.Types.ObjectId(request.params.projectId) } },
        {
            $lookup:
            {
                from: 'tasks',
                localField: '_id',
                foreignField: 'projectId',
                as: 'taskList'
            }
        }
    ];
    try {
        const result = await ProjectModel.aggregate(query);
        //Access the list of valid values for an Enum field in a Mongoose.js Schema
        const statusTypes = TaskModel.schema.path('statusType').enumValues;
        return response.formatter.ok({ result, statusTypes }, successMessage(FETCHED_TASK_SUCCESS));
    } catch (error) {
        return response.formatter.serverError(errorMessage(error.message));
    }
};

const getAll = async (request, response) => {
    try {
        const result = await TaskModel.find({});
        return response.formatter.ok(result, successMessage(FETCHED_TASK_SUCCESS));
    } catch (error) {
        return response.formatter.serverError(errorMessage(error.message));
    }
};

const remove = async (request, response) => {
    try {
        const result = await TaskModel.deleteOne({ _id: request.params.taskId });
        return response.formatter.ok(result, successMessage(REMOVED_TASK_SUCCESS));
    } catch (error) {
        return response.formatter.serverError(errorMessage(error.message));
    }
};

module.exports = { add, update, getAll, getById, getByProjectId, remove };