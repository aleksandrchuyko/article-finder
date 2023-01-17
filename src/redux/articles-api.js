import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { KEY, BASE_URL } from 'constants/themoviedb';
// import axios from 'axios';

// const axiosBaseQuery =
//   ({ baseUrl } = { baseUrl: '' }) =>
//   async ({ url, method, data, params }) => {
//     try {
//       const result = await axios({ url: baseUrl + url, method, data, params });
//       return { data: result.data };
//     } catch (axiosError) {
//       let err = axiosError;
//       return {
//         error: {
//           status: err.response?.status,
//           data: err.response?.data || err.message,
//         },
//       };
//     }
//   };

export const articlesApi = createApi({
  reducerPath: 'articles',
  // baseQuery: axiosBaseQuery({
  //   baseUrl: 'https://630de8b7109c16b9abf041c4.mockapi.io/api/v1',
  // }),
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
