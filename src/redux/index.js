// action types

import {
   API_CALL_REQUEST,
   API_CALL_SUCCESS,
   API_CALL_FAILURE,
   API_CALL_CHANGE,
   API_CALL_UPDATE,
   API_UPDATE_SUCCESS,
   API_UPDATE_FAILURE,
   API_CALL_GET,
   API_GET_SUCCESS,
   API_CALL_ADD
} from '../constants';

// reducer with initial state
const initialState = {
   fetching: false,
   server_data: {
      id: 0,
      profile: {},
      address: {},
      education: [{}],
      workHistory: [{}],
      skills: [{}]
   },
   activeIndex: {
      workHistory: 0,
      education: 0,
      skills: 0
   },
   error: null,
   success: null
};

export function reducer(state = initialState, action) {
   switch (action.type) {
      case API_CALL_REQUEST:
         return { ...state, error: null };
      case API_CALL_SUCCESS:
         console.log('API_CALL_SUCCESS', {
            ...state,
            server_data: action.server_data,
            activeIndex: { ...state.activeIndex, ...action.activeIndex }
         });
         return {
            ...state,
            server_data: action.server_data,
            activeIndex: { ...state.activeIndex, ...action.activeIndex }
         };
      case API_CALL_FAILURE:
         return { ...state, server_data: null, error: action.error };
      case API_CALL_UPDATE:
         return { ...state, fetching: true, error: null };
      //TODO: to be refactored
      case API_CALL_GET:
         return { ...state, fetching: true, error: null };
      case API_GET_SUCCESS:
         return { ...state, server_data: { ...state.server_data, ...action.server_data }, fetching: false };
      //----------------------
      case API_UPDATE_SUCCESS:
         return { ...state, fetching: false, success: true };
      case API_UPDATE_FAILURE:
         return { ...state, fetching: false, success: false, error: action.error };
      case API_CALL_CHANGE:
         if (action.index !== undefined) {
            let index = action.index;
            let jsonValue1 = {};
            jsonValue1[action.name] = action.value;

            let arrayValue = state.server_data[action.field];
            let obj = state.server_data[action.field][index];
            arrayValue[index] = { ...obj, ...jsonValue1 };
            let jsonValue = {};
            jsonValue[action.field] = arrayValue;
            return {
               ...state,
               server_data: {
                  ...state.server_data,
                  ...jsonValue
               }
            };
         } else {
            let jsonValue1 = {};
            jsonValue1[action.name] = action.value;
            let jsonValue = {};
            jsonValue[action.field] = { ...state.server_data[action.field], ...jsonValue1 };
            return {
               ...state,
               server_data: {
                  ...state.server_data,
                  ...jsonValue
               }
            };
         }
      case API_CALL_ADD:
         return { ...state, error: null };
      default:
         return state;
   }
}
