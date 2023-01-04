import { TIMEOUT_SEC, API_URL } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(() => {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const AJAX = async (url, uploadData = null, method = 'POST', auth = '') => {
  try {
    const res = uploadData
      ? await Promise.race([
          fetch(`${API_URL}${url}`, {
            method: method,
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json;charset=UTF-8',
              Authorization: auth,
            },
            [uploadData === 'true' ? 'get' : 'body']:
              uploadData === 'true' ? '' : JSON.stringify(uploadData),
          }),
          timeout(TIMEOUT_SEC),
        ])
      : await Promise.race([fetch(`${API_URL}${url}`), timeout(TIMEOUT_SEC)]);

    if (res.status >= 200 && res.status <= 299) {
      return await res.json();
    } else {
      throw res;
    }
  } catch (err) {
    throw err;
  }
};

export default AJAX;
