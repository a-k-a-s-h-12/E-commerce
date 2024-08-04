import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../features/constants";

const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    logout: build.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    register: build.mutation({
      query: (data) => ({
        url: USERS_URL,
        method: "POST",
        body: data,
      }),
    }),
    profile: build.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    getUsers: build.query({
      query: () => ({
        url: `${USERS_URL}`,
        method: "GET",
      }),
      providesTags: ["User"],
      keepUnusedDataFor: 5,
    }),
    deleteUser: build.mutation({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    getUserDetails: build.query({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: "GET",
      }),
    }),
    updateUser: build.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.userId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useProfileMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} = usersApiSlice;
