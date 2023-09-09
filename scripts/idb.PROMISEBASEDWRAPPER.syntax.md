```
// OPEN A DB
const db = idb.openDB(name, version);

// Open a DB and handle upgrade

const db = idb.openDB(name, version, {
  upgrade(db, oldVersion, newVersion, tx(transationObject), event){}
  //-> more event based functions like `blocked`
})

// within upgrade function we can

// 1. create object store
//// no key
const objectStore = await db.createObjectStore(name)
//// with keypath
const objectStore = await db.createObjectStore(name, {keyPath: property_name})
//// with key generator
const objectStore = await db.createObjectStore(name, {autoIncrement: true})

// 2. delete a DB
await idb.deletedb(name)
// delete a DB and handle block
await idb.deletedb(name, {
  blocked(db){

  }
})

// QUICK TRANSACTIONS using the wrapper
// // new value/object
await db.add(storeName, value);
// // define a value/object in a store with a key
await db.put(storeName, value, key)
// // delete a value
await db.delete(storeName, key)
// // delete all the values
await db.clear(storeName)
// // get count of all the values/objects in a store
const count = await db.count(storeName)
// // get all values in a store
const values = await db.getAll(storeName)
// // Get one value by key
const value = await db.get(storeName, key)
```
