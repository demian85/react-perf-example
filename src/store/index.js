import { createStore } from 'redux';

import { actions } from './actions';
import { simulateChanges, createRandomDevices } from './utils';

const initialState = {
  devices: createRandomDevices(),
  columns: [
    {
      key: 'id',
      label: 'ID',
      width: 100,
    },
    {
      key: 'name',
      label: 'Name',
      width: 200,
    },
    {
      key: 'time',
      label: 'Time',
      width: 200,
    },
    {
      key: 'location',
      label: 'Location',
      width: 200,
    },
    // ...
  ],
  userPrefs: {
    lang: 'en-US',
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.UPSERT_DEVICE:
      const device = action.payload;
      const devices = { ...state.devices, [device.id]: device };
      return { ...state, devices }

    case actions.RESIZE_COLUMN:
      const { key, width } = action.payload;
      const columns = [ ...state.columns ];
      const columnIndex = state.columns.findIndex((col) => col.key === key);
      const column = columns[columnIndex];
      columns[columnIndex] = { ...column, width };
      return { ...state, columns };

    case actions.SET_USER_PREFS:
      const { lang } = action.payload;
      const userPrefs = { ...state.userPrefs, lang };
      return { ...state, userPrefs };

    default:
      return state;
  }
};

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

// simulate device updates
simulateChanges(store);

export default store;
