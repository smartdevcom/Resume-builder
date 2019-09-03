import { takeLatest, call, put, takeEvery, delay, fork, select } from 'redux-saga/effects';
import axios from 'axios';
import {
   API_CALL_REQUEST,
   API_CALL_SUCCESS,
   API_CALL_FAILURE,
   SERVER_URL,
   POST_SERVER_URL,
   X_API_KEY,
   API_CALL_UPDATE,
   API_UPDATE_FAILURE,
   API_UPDATE_SUCCESS,
   API_CALL_GET,
   API_GET_SUCCESS,
   API_CALL_ADD
} from '../constants';

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherSaga() {
   const response = yield call(fetchServerData);

   const server_data = response.data;
   yield put({ type: API_CALL_SUCCESS, server_data });
   yield takeLatest(API_CALL_REQUEST, workerSaga);
   yield takeLatest(API_CALL_UPDATE, updateSaga);
   yield takeLatest(API_CALL_ADD, addDataSaga);

   //TODO: to be refactored
   yield takeLatest(API_CALL_GET, getSaga);
}

function fetchServerData() {
   return axios({
      method: 'get',
      url: SERVER_URL
   });
}

function fetchData(resource, params) {
   return axios({
      method: 'GET',
      headers: { 'x-api-key': X_API_KEY, 'Content-Type': 'application/json' },
      url: `${POST_SERVER_URL}/${resource}`,
      params: params
   });
}

function updateData(field, id, json) {
   if (id !== null) {
      return axios({
         method: 'patch',
         headers: { 'x-api-key': X_API_KEY, 'Content-Type': 'application/json' },
         url: `${POST_SERVER_URL}/${field}/${id}`,
         data: json
      });
   } else {
      return axios({
         method: 'patch',
         headers: { 'x-api-key': X_API_KEY, 'Content-Type': 'application/json' },
         url: `${POST_SERVER_URL}/${field}`,
         data: json
      });
   }
}

function* updateSaga(action) {
   try {
      const response = yield call(updateData, action.payload.field, action.payload.id, action.payload.json);
      // dispatch a success action to the store with the new dog
      yield put({ type: API_UPDATE_SUCCESS, success: true });
   } catch (error) {
      // dispatch a failure action to the store with the error
      yield put({ type: API_UPDATE_FAILURE, success: false, error });
   }
}
// worker saga: makes the api call when watcher saga sees the action
function* workerSaga() {
   try {
      const response = yield call(fetchServerData);
      const server_data = response.data;

      // dispatch a success action to the store with the new dog
      yield put({ type: API_CALL_SUCCESS, server_data });
   } catch (error) {
      // dispatch a failure action to the store with the error
      yield put({ type: API_CALL_FAILURE, error });
   }
}

function* getSaga(action) {
   try {
      const response = yield call(fetchData, action.payload.resource, action.payload.params);
      let server_data = {};
      server_data[action.payload.resource] = response.data;

      // dispatch a success action to the store with the new dog
      yield put({ type: API_GET_SUCCESS, server_data: server_data });
   } catch (error) {
      // dispatch a failure action to the store with the error
      yield put({ type: API_CALL_FAILURE, error });
   }
}

function* addDataSaga(action) {
   console.log(action);
   try {
      console.log('json', action.payload.json);
      const res = yield call(addData, action.payload.field, action.payload.json);
      console.log('res', res);
      const response = yield call(fetchServerData);
      console.log('response', response);
      const server_data = response.data;
      let obj = {};
      obj[action.payload.field] = action.payload.id - 1;
      // dispatch a success action to the store with the new dog
      yield put({ type: API_CALL_SUCCESS, server_data: server_data, activeIndex: obj });
      // console.log(response);
      // let server_data = {};
      // server_data[action.payload.field] = [response.data];
      // let obj = {};
      // obj[action.payload.field] = action.payload.id;

      // // dispatch a success action to the store with the new dog
      // yield put({ type: API_GET_SUCCESS, server_data: server_data, activeIndex: obj });
   } catch (error) {
      // dispatch a failure action to the store with the error
      yield put({ type: API_CALL_FAILURE, error });
   }
}

function addData(field, json) {
   return axios({
      method: 'post',
      headers: { 'x-api-key': X_API_KEY, 'Content-Type': 'application/json' },
      url: `${POST_SERVER_URL}/${field}`,
      data: json
   });
}
