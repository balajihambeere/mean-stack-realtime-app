'use strict';
import { ProjectModel } from '../project/project-model';
import { TaskModel } from '../task/task-model';
import { successMessage, errorMessage } from '../../utils/response-message';
const getStats = async (request, response) => {
    try {
        const result = {
            projects: await ProjectModel.countDocuments(),
            tasks: await TaskModel.countDocuments(),
            completed: await TaskModel.countDocuments({ statusType: 'Completed' }),
            inProgress: await TaskModel.countDocuments({ statusType: 'In-Progress' }),
            cancelled: await TaskModel.countDocuments({ statusType: 'Cancelled' })
        };
        return response.formatter.ok(result, successMessage('FETCHED_PROJECT_SUCCESS'));
    } catch (error) {
        return response.formatter.serverError(errorMessage(error.message));
    }
};

module.exports = { getStats };
