import Chance from 'chance';
import { upsertDevice, resizeColumn } from './actions';

const chance = new Chance();

export function createRandomDevices(n = 50) {
  const devices = {};

  for (let i = 0; i < n; i++) {
    const device = getDevice(n);
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
      resizeColumn(key, chance.integer({ min: 150, max: 300 }))
    );
  }, 4000);
}

export function onRenderCallback(id, phase, actualDuration, baseDuration, startTime, commitTime, interactions) {
  document.querySelector('#renderTime').textContent = `${id} render time: ${actualDuration.toFixed(1)}ms`
}

function getDevice(max = 50) {
  const id = chance.integer({ min: 1, max });
  const name = chance.word({ length: 5 });
  const location = `${chance.latitude()}, ${chance.longitude()}`;
  const time = new Date().toLocaleTimeString();
  const active = chance.bool({likelihood: 70});
  return { id, name, location, time, active }
}
