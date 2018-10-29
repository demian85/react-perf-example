import Chance from 'chance';
import { actions } from './store';

const chance = new Chance();

export function createRandomDevices(n = 50) {
  const devices = {};

  for (let i = 0; i < n; i++) {
    const device = getDevice();
    devices[device.id] = device;
  }

  return devices;
}

export function simulateChanges(store) {
  setInterval(() => {
    store.dispatch({
      type: actions.UPSERT_DEVICE,
      payload: getDevice(),
    })
  }, 1000);
}

function getDevice() {
  const id = chance.integer({ min: 1, max: 50 });
  const name = chance.word({ length: 5 });
  const location = `${chance.latitude()}, ${chance.longitude()}`;
  const active = chance.bool({likelihood: 70});
  return { id, name, location, active }
}