import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HOST } from "../../const/host";
import { HEADERS } from "../../const/headers";


interface loginProps {
    login: string,
    password: string
}

// Войти в аккаунт
export const login = createAsyncThunk(
    "auth/login",
    async ({ login, password }: loginProps, { rejectWithValue }) => {
        try {
            const response = await fetch(`${HOST}/ru/data/v3/testmethods/docs/login`, {
                method: 'POST',
                headers: HEADERS,
                body: JSON.stringify({
                    username: login,
                    password: password
                })
            })
            if (!response.ok) {
                throw new Error(`Can't login`)
            } else {
                const res = await response.json();
                localStorage.setItem('auth-token', res.data.token);
                return res;
            }
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

interface auth {
    isLogin: boolean,
    isLoading: boolean,
    error: string
}

const initialState: auth = {
    isLogin: localStorage.getItem("auth-token") ? true : false,
    isLoading: false,
    error: '',
}


const authSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        logOut: (state)=> {
            localStorage.removeItem("auth-token");
            state.isLogin = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state) => {
                state.isLoading = false;
                state.isLogin = true;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.rejected, (state) => {
                state.isLoading = false;
                state.isLogin = false;
                state.error = 'Произошла ошибка авторизации';
            })
    },
})


export const { logOut } = authSlice.actions;
export default authSlice.reducer;