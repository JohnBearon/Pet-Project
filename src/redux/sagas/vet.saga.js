import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* vetSaga() {
  yield takeLatest('GET_VET', getVet);
  yield takeLatest('GET_VET_DETAIL', getVetDetail);
  yield takeLatest('POST_VET', postVet);
  yield takeLatest('PUT_VET', putVet);
  yield takeLatest('DELETE_VET', deleteVet);
}

function* getVet(action) {
  try {
    const response = yield axios.get(`/api/vet`);
    yield put({
      type: 'SET_VET',
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: 'ERROR_MSG',
      payload: 'There was a problem with VET GET',
    });
  }
}

function* getVetDetail(action) {
  try {
    const response = yield axios.get(`/api/vet/details/${action.payload}`);
    yield put({
      type: 'SET_VET_DETAIL',
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: 'ERROR_MSG',
      payload: 'There was a problem with VET GET',
    });
  }
}

function* postVet(action) {
  try {
    yield axios.post(`/api/vet/${action.payload.id}`, action.payload);
    yield put({ type: 'GET_VET', payload: action.payload.id });
    yield put({ type: 'GET_VET_DETAIL', payload: action.payload.id });
  } catch (err) {
    console.log('ERROR POSTING  Vet:', err, action.payload.id);
  }
}

function* putVet(action) {
  try {
    console.log('in put', action.payload);
    yield axios.put(`/api/vet/editVet/${action.payload.id}`, action.payload);
    yield put({ type: 'GET_VET_DETAIL', payload: action.payload.petId });
  } catch (error) {
    console.log('Error in put food', error);
  }
}

function* deleteVet(action) {
  try {
    yield axios.delete(`/api/vet/${action.payload.id}`);
    yield put({ type: 'GET_VET' });
    yield put({ type: 'GET_VET_DETAIL', payload: action.payload.petId });
  } catch (err) {
    console.log('error deleting vet:', action.payload);
  }
}

export default vetSaga;
