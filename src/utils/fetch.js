// Fetch.js
import { progressBarFetch, setOriginalFetch } from 'react-fetch-progressbar';

// Let react-fetch-progressbar know what the original fetch is.
setOriginalFetch(window.fetch);

/*
  Now override the fetch with progressBarFetch, so the ProgressBar
  knows how many requests are currently active.
*/
window.fetch = progressBarFetch;

const objectToQueryString = (obj) => {
  const kv = Object.keys(obj).map((key) => {
    const val = obj[key];
    let ret = '';

    if (typeof val !== 'undefined') {
      ret = `${encodeURIComponent(key)}=${encodeURIComponent(val)}`;
    }
    return ret;
  }).filter((k) => k);

  return (kv.length ? `?${kv.join('&')}` : '');
};
const generateErrorResponse = (message) => ({
  status: 'error',
  message,
});

async function request(url, params, method = 'GET') {
  let modUrl = url;
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (params) {
    if (method === 'GET') {
      modUrl += objectToQueryString(params);
    } else {
      options.body = JSON.stringify(params);
    }
  }

  const response = await fetch(modUrl, options);
  let result;

  try {
    result = await response.json();
  } catch {
    // Do Nothing
  }
  if (response.status !== 200) {
    return generateErrorResponse(result?.error || 'The server responded with an unexpected status.');
  }

  return result;
}

const get = (url, params) => request(url, params);
const post = (url, params) => request(url, params, 'POST');
const put = (url, params) => request(url, params, 'PUT');
const del = (url, params) => request(url, params, 'DELETE');

export default {
  get,
  post,
  put,
  del,
};
