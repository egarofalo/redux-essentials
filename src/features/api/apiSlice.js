// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define our single API slice object
export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: 'api',
  // All of our requests will have URLs starting with '/fakeApi'
  baseQuery: fetchBaseQuery({ baseUrl: '/fakeApi' }),
  // The "endpoints" represent operations and requests for this server
  endpoints: (builder) => ({
    // The `getPosts` endpoint is a "query" operation that returns data
    getPosts: builder.query({
      // The URL for the request is '/fakeApi/posts'
      query: () => '/posts',
    }),
    getPost: builder.query({
      query: (postId) => `/posts/${postId}`,
    }),
  }),
})

// RTK Query's React integration will automatically generate React hooks for every endpoint we define!
// Those hooks encapsulate the process of triggering a request when a component mounts,
// and re-rendering the component as the request is processed and data is available.
// We can export those hooks out of this API slice file for use in our React components.
// The hooks are automatically named based on a standard convention:
// - use, the normal prefix for any React hook
// - The name of the endpoint, capitalized
// - The type of the endpoint, Query or Mutation

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useGetPostsQuery, useGetPostQuery } = apiSlice
