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

export const get = async (props: HttpsProps) => {
  const paramsArray: string[] = [];
  await storage
    .load({
      key: 'userInfo',
    })
    .then(value => {
      console.log('Storage load token to get : ' + value.token);
      headers.Token = value.token;
      // @ts-ignore
      // props.params.token = value.token;
    })
    .catch(error => {
      console.log('Err: ' + error);
    });

  Object.keys(props.params).forEach(key => {
    // @ts-ignore
    if (key) paramsArray.push(key + '=' + props.params[key]);
  });
  console.log('get finnal Url is : ' + baseUrl + props.url + '?' + paramsArray.join('&'));
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
export const post = async (props: HttpsProps, customContentType?: string) => {
  await storage
    .load({
      key: 'userInfo',
    })
    .then(value => {
      console.log('Storage load token to post : ' + value.token);
      headers.Token = value.token;
      // @ts-ignore
      // props.params.token = value.token;
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
      // @ts-ignore
      body: customContentType ? props.params : JSON.stringify(props.params),
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
