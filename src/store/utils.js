import Chance from 'chance';
import { upsertDevice, resizeColumn } from './actions';

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
    store.dispatch(
      upsertDevice(getDevice())
    );
  }, 1000);

  setInterval(() => {
    const columns = store.getState().columns;
    const index = chance.integer({ min: 0, max: columns.length - 1 });
    const key = columns[index].key;
    store.dispatch(
      resizeColumn(key, chance.integer({ min: 100, max: 300 }))
    );
  }, 4000);
}

function getDevice() {
  const id = chance.integer({ min: 1, max: 50 });
  const name = chance.word({ length: 5 });
  const location = `${chance.latitude()}, ${chance.longitude()}`;
  const time = new Date().toLocaleTimeString();
  const active = chance.bool({likelihood: 70});
  return { id, name, location, time, active }
}
