import { Map } from 'immutable';
import { FETCH_UPDATES_SUCCESS } from '../actions/updatesActionTypes';
import { updatesNormalizer } from '../schema/updates';


export const updatesReducer = (state = Map([]), action) => {
  switch (action.type) {
    case FETCH_UPDATES_SUCCESS:
      // Normalize the updates data
      let normalizedData = updatesNormalizer(action.data).updates;
      return state.merge(normalizedData);
    default:
      return state;
  }
};