const BASE_URL = `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`;

export function apiRequest(method: string, option?: RequestInit): Promise<any> {
  return fetch(BASE_URL + method, option)
    .then((res) => {
      if (res.status >= 400) Promise.reject();
      else if (res.status === 204) return res;
      else return res.json();
    })
    .catch((error) => {
      console.log(error);
    });
}
