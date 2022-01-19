import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const nftHeaders = {
  "x-rapidapi-host": "top-nft-sales.p.rapidapi.com",
  "x-rapidapi-key": "631570e28cmsh2ec40511b8fcacdp1805d0jsndb5145b88835",
};

const baseUrl = "https://top-nft-sales.p.rapidapi.com/sales";
const createRequest = (url) => ({ url, headers: nftHeaders });

export const nftApi = createApi({
  reducerPath: "nftApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getNft: builder.query({
      query: (nftTimePeriod) => createRequest(`/${nftTimePeriod}`),
    }),
  }),
});
export const { useGetNftQuery } = nftApi;
