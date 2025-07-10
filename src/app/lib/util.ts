export function getRecipientContactTrace() {
  const _location = localStorage.getItem('address');
  const _lat = localStorage.getItem('lat');
  const _lon = localStorage.getItem('lon');
  const _device: any = JSON.parse(localStorage.getItem('device'));
  let _latLong = null;
  if (!isNullOrUndefined(_lat) && _lat !== 'null' && !isNullOrUndefined(_lon) && _lon !== 'null') {
    _latLong = _lat + '-' + _lon;
  }
  const _browser = JSON.parse(localStorage.getItem('browser'));
  const _os = JSON.parse(localStorage.getItem('os'));

  return {
    ip: null,
    location: _location,
    deviceName:
      !isNullOrUndefined(_device) && JSON.stringify(_device) !== JSON.stringify({})
        ? _device.vendor + '-' + _device.model + '-' + _device.type
        : null,
    deviceId: null,
    timeTrace: null,
    type: null,
    latLong: _latLong,
    browser:
      !isNullOrUndefined(_browser) && JSON.stringify(_browser) !== JSON.stringify({})
        ? _browser.name + '-' + _browser.version + '-' + _browser.major
        : null,
    osVersion: !isNullOrUndefined(_os) && JSON.stringify(_os) !== JSON.stringify({}) ? _os.name + '-' + _os.version : null,
  };
}