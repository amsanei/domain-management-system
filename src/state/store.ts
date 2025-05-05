import { configureStore } from "@reduxjs/toolkit";
import { domainsApiSlice } from "./domains/domainsApiSlice";
import themeReducer from "./theme/themeSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    [domainsApiSlice.reducerPath]: domainsApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(domainsApiSlice.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
