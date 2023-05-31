import { Posts } from './components/posts'
// import { QueryClient, QueryClientProvider } from 'react-query'
// import { ReactQueryDevtools } from 'react-query/devtools'
// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 60 * 1000 * 5,
//       retry: 3,
//       retryDelay: 5000
//     }
//   }
// })

function App() {
  return (
    // <QueryClientProvider client={queryClient}>
    <div className='App'>
      <h1>React APP</h1>
      <h2 style={{ color: `${navigator.onLine ? 'green' : 'red'}` }}>{navigator.onLine ? 'ONLINE' : 'OFFLINE'}</h2>
      <Posts />
    </div>
    // <ReactQueryDevtools initialIsOpen />
    // </QueryClientProvider>
  )
}

export default App
