import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Domain, DomainFormFieldType } from "../../types";

export const domainsApiSlice = createApi({
  reducerPath: "domains",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://6797aa2bc2c861de0c6d964c.mockapi.io",
  }),
  endpoints: (builder) => {
    return {
      getDomains: builder.query<Domain[], void>({
        query: () => "/domain",
      }),
      getDomain: builder.query({
        query: (id: number) => "/domain/" + id,
      }),
      createDomain: builder.mutation({
        query: (data) => ({
          url: "domain",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            createdDate: Date.now() / 1000,
            domain: data.domain,
            status: data.status,
            isActive: data.isActive,
          }),
        }),
      }),
      updateDomain: builder.mutation({
        query: ({ domainId, newData }: { domainId: number; newData: DomainFormFieldType }) => ({
          url: "/domain/" + domainId,
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            domain: newData.domain,
            status: newData.status,
            isActive: newData.isActive,
          }),
        }),
      }),
      destroyDomain: builder.mutation({
        query: (id: number) => ({
          url: "/domain/" + id,
          method: "DELETE",
        }),
      }),
    };
  },
});

export const {
  useGetDomainsQuery,
  useGetDomainQuery,
  useCreateDomainMutation,
  useUpdateDomainMutation,
  useDestroyDomainMutation,
} = domainsApiSlice;
