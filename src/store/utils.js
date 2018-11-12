import Chance from 'chance';
import { upsertDevice } from './actions';

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
