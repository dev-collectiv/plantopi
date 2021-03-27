const urlBase = `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`;

export function apiRequest(method: string, option?: RequestInit): Promise<any> {
  return fetch(urlBase + method, option)
    .then((res) => (res.status <= 400 ? res : Promise.reject()))
    .then((res) => (res.status === 204 ? res : res.json()))
    .catch((e) => {
      console.log(e);
    });
}
 