import storage from '../utils/storage';
const baseUrl = 'https://www.wlztrpa.com';
const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Token: '',
};

type HttpsProps = {
  url: string;
  params: {};
};

export const get = (props: HttpsProps) => {
  const paramsArray: string[] = [];
  storage
    .load({
      key: 'userInfo',
    })
    .then(value => {
      console.log('Storage load token to get : ' + value.token);
      // headers.Token = value;
      // @ts-ignore
      props.params.token = value.token;
    })
    .catch(error => {
      console.log('Err: ' + error);
    });

  Object.keys(props.params).forEach(key => {
    // @ts-ignore
    if (key) paramsArray.push(key + '=' + props.params[key]);
  });

  return new Promise((resolve, reject) => {
    fetch(baseUrl + props.url + '?' + paramsArray.join('&'), {
      method: 'GET',
      headers,
    })
      .then(responseData => {
        resolve(responseData.json());
      })
      .catch(err => {
        console.error('err', err);
        reject(err);
      });
  });
};
export const post = (props: HttpsProps, customContentType?: string) => {
  storage
    .load({
      key: 'userInfo',
    })
    .then(value => {
      console.log('Storage load token to post : ' + value.token);
      // headers.Token = value;
      // @ts-ignore
      props.params.token = value.token;
    })
    .catch(error => {
      console.log('Err: ' + error);
    });
  if (customContentType) {
    headers['Content-Type'] = customContentType;
  }
  return new Promise((resolve, reject) => {
    fetch(baseUrl + props.url, {
      method: 'POST',
      headers,
      body: JSON.stringify(props.params),
    })
      .then(responseData => {
        resolve(responseData.json());
      })
      .catch(err => {
        console.error('err', err);
        reject(err);
      });
  });
};
