const baseUrl = 'https://www.wlztrpa.com';
const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

type HttpsProps = {
  url: string;
  params?: {};
};

export const get = (props: HttpsProps) => {
  const paramsArray: string[] = [];
  if (props.params) {
    Object.keys(props.params).forEach(key => {
      // @ts-ignore
      if (key) paramsArray.push(key + '=' + props.params[key]);
    });
  }
  return new Promise((resolve, reject) => {
    fetch(baseUrl + props.url + '?' + paramsArray.join('&'), {
      method: 'GET',
      headers,
    })
      .then(responseData => {
        resolve(responseData);
      })
      .catch(err => {
        console.error('err', err);
        reject(err);
      });
  });
};
export const post = (props: HttpsProps) => {
  return new Promise((resolve, reject) => {
    fetch(baseUrl + props.url, {
      method: 'POST',
      headers,
      body: JSON.stringify(props.params),
    })
      .then(responseData => {
        resolve(responseData);
      })
      .catch(err => {
        console.error('err', err);
        reject(err);
      });
  });
};
