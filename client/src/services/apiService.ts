const urlBase = 'http://localhost:3001'; //TODO .env

export function apiRequest(method: string, option?: RequestInit): Promise<any> {
  // TODO no any
  return fetch(urlBase + method, option)
    .then((res) => (res.status <= 400 ? res : Promise.reject()))
    .then((res) => (res.status === 204 ? res : res.json()))
    .catch((e) => {
      console.log(e);
    });
}
