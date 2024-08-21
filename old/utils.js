export function fetchData(url, callback) {
    fetch(url)
      .then(response => response.ok ? response.json() : Promise.reject('Network error'))
      .then(data => callback(data))
      .catch(console.error);
}