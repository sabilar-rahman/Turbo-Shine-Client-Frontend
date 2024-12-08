import { baseApi } from "../../api/baseApi";
import { TUser } from "../../../types"; // Assuming you have a TUser type defined

const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<{ data: TUser[] }, void>({
      query: () => ({
        url: "/auth/users",
        method: "GET",
      }),
      providesTags: ["Users"], // Optional: Add tags for cache invalidation
    }),
    updateUserRole: builder.mutation<void, { userId: string; role: string }>({
      query: ({ userId, role }) => ({
        url: `/auth/users/${userId}`,
        method: "PATCH",
        body: { role },
      }),
      invalidatesTags: ["Users"], // Invalidate user list to trigger a refetch
    }),
    
    updateUserInfo: builder.mutation<void, { userId: string; data: TUser[] }>({
      query: ({ userId, data }) => ({
        url: `/auth/${userId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Users"], // Invalidate user list to trigger a refetch
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
  useUpdateUserInfoMutation,
} = usersApi;