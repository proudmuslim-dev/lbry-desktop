export function parseQueryParams(queryString) {
  if (queryString === '') return {};
  const parts = queryString
    .split('?')
    .pop()
    .split('&')
    .map(p => p.split('='));

  const params = {};
  parts.forEach(array => {
    const [first, second] = array;
    params[first] = second;
  });
  return params;
}

export function toQueryString(params) {
  if (!params) return '';

  const parts = [];
  Object.keys(params).forEach(key => {
    if (Object.prototype.hasOwnProperty.call(params, key) && params[key]) {
      parts.push(`${key}=${params[key]}`);
    }
  });

  return parts.join('&');
}

export function updateQueryParam(uri, key, value) {
  const re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i');
  const separator = uri.indexOf('?') !== -1 ? '&' : '?';
  if (uri.match(re)) {
    return uri.replace(re, '$1' + key + '=' + value + '$2');
  } else {
    return uri + separator + key + '=' + value;
  }
}
