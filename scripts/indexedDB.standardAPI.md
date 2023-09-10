```
let db;
const request = indexedDB.open(name);


request.onerror = (errorEvent) => {

};

request.onsuccess = (event) => {
  db = event.target.result;
};

```
