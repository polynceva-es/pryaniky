import { configureStore } from "@reduxjs/toolkit";
import dataReduser from "../services/redusers/dataSlice";
import authreduser from "../services/redusers/authSlice"; 

export const store = configureStore({
    reducer: {
        data: dataReduser,
        auth: authreduser,
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch