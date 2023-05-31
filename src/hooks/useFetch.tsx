import { useEffect, useState } from 'react'

import { getValue, setValue } from 'services/offline'

export default function useFetch(key: string, request: any, enableCondition: boolean = true) {
  // console.log('use fetch component')

  const [data, setData] = useState([])

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      try {
        let fetchedData = null

        // Check if the network is offline
        const isOffline = !navigator.onLine

        if (isOffline) {
          // Retrieve data from offline storage
          fetchedData = await getValue(key)
          console.log('fetchedData (offline)', fetchedData)
        } else {
          // Fetch data from the API
          const responseData = await request()
          fetchedData = responseData // Assuming the response contains the actual data
          console.log('fetchedData (online)', fetchedData)

          // Store the fetched data in offline storage
          if (fetchedData) {
            await setValue(key, fetchedData)
          }
        }

        if (isMounted) {
          setData(fetchedData || [])
        }
      } catch (error) {
        console.error('Failed to fetch data:', error)
      }
    }

    if (enableCondition) {
      fetchData()
    }

    return () => {
      isMounted = false
    }
  }, [enableCondition, key, request])

  return { data }
}

// import { useQuery } from 'react-query'
// export default function useFetch(key: any, request: any, enableCondition: boolean = true) {
//   console.log('use fetch component')
//   const { data, isLoading, isFetched, isFetching } = useQuery(key, request, {
//     initialData: async () => {
//       const data = await getValue(key)
//       return data ? data : []
//     },
//     onSuccess: async data => {
//       console.log('on success', data)
//       await setValue(key, data)
//     },
//     enabled: enableCondition
//   })
//   return { data, isLoading, isFetched, isFetching }
// }

// export default function useFetch(key: any, request: any, enableCondition: boolean = true) {
//   console.log('useFetch component')
//   const [data, setData] = useState<any[]>([])
//   const { isLoading, isFetched, isFetching } = useQuery(key, request, {
//     initialData: getValue(key) || [],
//     onSuccess: async data => {
//       console.log('on success', data)
//       await setValue(key, data)
//       setData(await data)
//     },
//     enabled: enableCondition
//   })

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const value = await getValue(key)
//         setData(value || [])
//       } catch (error) {
//         console.error('Error retrieving value:', error)
//       }
//     }

//     fetchData()
//   }, [key])

//   return { data, isLoading, isFetched, isFetching }
// }
