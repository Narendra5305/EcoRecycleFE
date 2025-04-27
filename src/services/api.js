// services/api.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://ecorecyclebe-production.up.railway.app/'; 

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl ,prepareHeaders: (headers) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      headers.set('Authorization', `Bearer ${user.token}`);
    }
    return headers;
    },
  }),
  endpoints: (builder) => ({
    
    register: builder.mutation({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
    }),
    login: builder.mutation({
      query: (loginData) => ({
        url: '/auth/login',
        method: 'POST',
        body: loginData,
      }),
    }),
    createSlot: builder.mutation({
      query: (slotData) => ({
        url: '/slots/create',
        method: 'POST',
        body: slotData,
      }),
    }),
    getAvailableSlots: builder.query({
      query: (filters) => ({
        url: '/slots/available',
        params: filters,
      }),
    }),
    bookSlot: builder.mutation({
      query: (slotId) => ({
        url: `/slots/book/${slotId}`,
        method: 'POST',
      }),
    }),
    searchVendors: builder.query({
      query: (filters) => ({
        url: '/vendors/search',
        params: filters,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useCreateSlotMutation,
  useGetAvailableSlotsQuery,
  useBookSlotMutation,
  useSearchVendorsQuery,
} = api;
