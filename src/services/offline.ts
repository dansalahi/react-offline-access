// ================================================ IndexedDB Implementation
const DB_NAME = 'myDatabase'
const OBJECT_STORE_NAME = 'dataStore'

// Open or create a database
const openDB = (dbName: string): Promise<IDBDatabase> => {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = window.indexedDB.open(dbName)

    request.onsuccess = event => {
      const db = (event.target as IDBOpenDBRequest).result
      resolve(db)
    }

    request.onerror = () => {
      reject(request.error)
    }

    request.onupgradeneeded = event => {
      const db = (event.target as IDBOpenDBRequest).result
      db.createObjectStore(OBJECT_STORE_NAME)
    }
  })
}

// get value
export const getValue = async (key: string): Promise<any | null> => {
  try {
    const db = await openDB(DB_NAME)

    const transaction = db.transaction(OBJECT_STORE_NAME, 'readonly')
    const objectStore = transaction.objectStore(OBJECT_STORE_NAME)
    const request = objectStore.get(key)

    console.log('GET: request', request)

    return new Promise<any | null>((resolve, reject) => {
      request.onsuccess = event => {
        const result = (event.target as IDBRequest).result
        if (result) {
          console.log('GET: result', result)
          resolve(result)
        } else {
          resolve(null)
        }
      }

      request.onerror = () => {
        reject(request.error)
      }
    })
  } catch (error) {
    console.error('Error retrieving value from IndexedDB:', error)
    return null
  }
}

export const setValue = async (key: string, value: any): Promise<void> => {
  try {
    const db = await openDB(DB_NAME)
    // console.log('db set value', db)
    const transaction = db.transaction(OBJECT_STORE_NAME, 'readwrite')
    const objectStore = transaction.objectStore(OBJECT_STORE_NAME)
    console.log('db', value, key)
    const request = objectStore.put(value, key) // Provide the key explicitly

    return new Promise<void>((resolve, reject) => {
      request.onsuccess = () => {
        resolve()
      }

      request.onerror = () => {
        reject(request.error)
      }
    })
  } catch (error) {
    console.error('Error storing value in IndexedDB:', error)
    throw error
  }
}

// ================================================ Local Storage Implementation
// const BASE_DATA_KEY = 'REQUEST_'

// export const getValue = (key: string) => {
//   // Get the data from localStorage
//   const data = localStorage.getItem(BASE_DATA_KEY + key)
//   if (data) {
//     return JSON.parse(data)
//   }
//   return null
// }

// export const setValue = (key: string, value: any) => {
//   // Store the data in localStorage for offline access
//   localStorage.setItem(BASE_DATA_KEY + key, JSON.stringify(value))
// }
