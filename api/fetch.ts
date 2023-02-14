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
  return new Promise((resolve, reject) => {
    fetch(baseUrl + props.url, {
      method: 'get',
      headers,
      body: JSON.stringify(props.params),
    })
      .then(responseData => {
        resolve(responseData);
      })
      .catch(err => {
        console.log('err', err);
        reject(err);
      });
  });
};
export const post = (props: HttpsProps) => {
  return new Promise((resolve, reject) => {
    fetch(baseUrl + props.url, {
      method: 'get',
      headers,
      body: JSON.stringify(props.params),
    })
      .then(responseData => {
        resolve(responseData);
      })
      .catch(err => {
        // console.log('err', err);
        reject(err);
      });
  });
};
