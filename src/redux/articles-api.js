import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { KEY, BASE_URL } from 'constants/themoviedb';

export const articlesApi = createApi({
  reducerPath: 'articles',
  
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Articles'],
  endpoints(build) {
    return {
      getAllArticles: build.query({
        query: () => ({
          url: '/trending/movie/day',
          method: 'get',
          params: { api_key: KEY },
        }),
        providesTags: ['Articles'],
      }),
    };
  },
});

export const { useGetAllArticlesQuery } = articlesApi;
