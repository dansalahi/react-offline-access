import axios from 'axios'

const baseUrl = 'https://jsonplaceholder.typicode.com'

export const getPosts = async () => {
  const response = await axios.get(`${baseUrl}/posts`)
  return response.data
}
