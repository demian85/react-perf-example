export function updateUserLanguage(lang) {
  return { 
    type: actions.SET_USER_PREFS, 
    payload: { lang }
  };
}

export function upsertDevice(device) {
  return {
    type: actions.UPSERT_DEVICE,
    payload: device,
  };
}

export function resizeColumn(key, width) {
  return {
    type: actions.RESIZE_COLUMN,
    payload: { key, width },
  };
}

export const actions = {
  UPSERT_DEVICE: 'device/upsert',
  RESIZE_COLUMN: 'column/resize',
  SET_USER_PREFS: 'user/set_prefs',
};