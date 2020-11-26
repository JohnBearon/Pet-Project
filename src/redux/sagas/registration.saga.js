import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* registerUser(action) {
  try {
    // clear any existing error on the registration page
    yield put({ type: 'CLEAR_REGISTRATION_ERROR' });

    // passes the username and password from the payload to the server
    yield axios.post('/api/user/register', action.payload.user);

    // automatically log a user in after registration
    yield put({ type: 'LOGIN', payload: action.payload.user });

    // set to 'login' mode so they see the login screen
    yield put({ type: 'SET_TO_LOGIN_MODE' });
    // after registration or after they log out

    //worked before turning server on and off
    yield put({ type: 'POST_PET', payload: action.payload.pet });
  } catch (error) {
    console.log('Error with user registration:', error);
    yield put({ type: 'REGISTRATION_FAILED' });
  }
}

function* registrationSaga() {
  yield takeLatest('REGISTER', registerUser);
}

export default registrationSaga;
