'use strict';
import { UserModel } from '../user/user-model';
import { successMessage, errorMessage } from '../../utils/response-message';

import {
    UPDATED_PROFILE_SUCCESS, FETCHED_PROFILE_SUCCESS,
} from '../../utils/constants';

const getProfileById = async (request, response, next) => {
    try {
        const result = await UserModel.find({ _id: request.user._id }, { _id: 1, email: 1, profile: 1 });
        return response.formatter.ok(result, successMessage(FETCHED_PROFILE_SUCCESS));
    } catch (error) {
        return response.formatter.serverError(errorMessage(error.message));
    }
};

const updateProfile = async (request, response) => {
    const { _id, fullName, phone, city, country } = request.body;
    try {
        const result = await UserModel.findOneAndUpdate({ _id: _id },
            {
                '$set': {
                    'profile.fullName': fullName,
                    'profile.phone': phone,
                    'profile.city': city,
                    'profile.country': country
                }
            });
        return response.formatter.ok(result, successMessage(UPDATED_PROFILE_SUCCESS));
    } catch (error) {
        return response.formatter.serverError(errorMessage(error.message));
    }
};

module.exports = { getProfileById, updateProfile };