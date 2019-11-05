import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  REQUEST_PROFILE,
  RECEIVE_PROFILE,
  FAILURE_PROFILE,
  REQUEST_PROFILE_UPDATE,
  FAILURE_UPDATE,
  UPDATE_USER_SUCCESS,
  DELETE_PROFILE,
} from '../actionTypes';
import { apiInitialized } from 'services/api';
import { getOtherUserProfile, getUserLoggedInProfile, updateProfile } from 'services/profiles';
import { selectProfile } from '../selectors/users';

const updateProfileFromUser = updateProfile(apiInitialized);

export const loginSuccess = loggedInUser => {
  return {
    type: LOGIN_SUCCESS,
    payload: loggedInUser,
  };
};

export const loginFailure = () => {
  return {
    type: LOGIN_FAILURE,
    payload: null,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
    payload: null,
  };
};

export const requestProfile = () => {
  return {
    type: REQUEST_PROFILE,
  };
};

export const receiveProfile = fetchedProfile => {
  return {
    type: RECEIVE_PROFILE,
    payload: fetchedProfile,
  };
};

export const failureProfile = error => {
  return {
    type: FAILURE_PROFILE,
    payload: error,
  };
};

export const updateProfileSuccess = () => {
  return {
    type: UPDATE_USER_SUCCESS,
  };
};

const fetchProfile = userInfo => {
  return async dispatch => {
    const onSuccess = profile => {
      return dispatch(receiveProfile(profile));
    };
    const onError = error => {
      return dispatch(failureProfile(error));
    };

    dispatch(requestProfile());
    try {
      const fetchedProfile = await (userInfo.isSelf
        ? getUserLoggedInProfile()
        : getOtherUserProfile(userInfo.userID));
      return onSuccess(fetchedProfile);
    } catch (e) {
      return onError(e);
    }
  };
};

const shouldFetchProfile = (state, userInfo) => {
  const profileInStore = selectProfile(state);
  if (!Boolean(profileInStore)) {
    return true;
  }

  return profileInStore._id !== userInfo.userID;
};

export const fetchProfileIfNeeded = userInfo => {
  return (dispatch, getState) => {
    if (shouldFetchProfile(getState(), userInfo)) {
      return dispatch(fetchProfile(userInfo));
    }
  };
};

export const requestUpdateProfile = () => {
  return {
    type: REQUEST_PROFILE_UPDATE,
  };
};

export const failureUpdateProfile = error => {
  return {
    type: FAILURE_UPDATE,
    payload: error,
  };
};

export const updateUserProfile = user => {
  return async dispatch => {
    dispatch(requestUpdateProfile());

    try {
      await updateProfileFromUser({
        user,
      });
      return dispatch(updateProfileSuccess());
    } catch (e) {
      return dispatch(failureUpdateProfile(e));
    }
  };
};

export const deleteProfile = () => {
  return dispatch => dispatch({ type: DELETE_PROFILE });
};