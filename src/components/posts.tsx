import useFetch from '../hooks/useFetch'
import { getPosts } from '../services/api'

export const Posts = () => {
  const { data } = useFetch('posts', getPosts, true)
  return (
    <>
      <h1>List of Posts</h1>
      {data &&
        data?.map((post: any) => {
          return (
            <div key={post.id}>
              <h5>{post.title}</h5>
            </div>
          )
        })}
    </>
  )
}
