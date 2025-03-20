import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HOST } from "../../const/host";
import { HEADERS } from "../../const/headers";

export interface dataItemWithoutId {
    companySigDate: string, //ISO
    companySignatureName: string,
    documentName: string,
    documentStatus: string,
    documentType: string,
    employeeNumber: string,
    employeeSigDate: string, //ISO
    employeeSignatureName: string,
  }

export interface dataItem {
    id: string,
    companySigDate: string, //ISO
    companySignatureName: string,
    documentName: string,
    documentStatus: string,
    documentType: string,
    employeeNumber: string,
    employeeSigDate: string, //ISO
    employeeSignatureName: string,
}

interface data {
    data: dataItem[],
    isLoading: boolean,
    error: string
}

interface addDataProps {
    values: dataItemWithoutId,
    token: string | null
}
interface deleteDataProps {
    id: string,
    token: string | null
}
interface updateDataProps {
    values: dataItemWithoutId,
    id: string,
    token: string | null
}


// Запрос для получения массива данных для таблицы (метод - GET)
export const getData = createAsyncThunk(
    "data/getData",
    async (token: string | null, { rejectWithValue }) => {
        try {
            const response = await fetch(`${HOST}/ru/data/v3/testmethods/docs/userdocs/get`, {
                method: 'GET',
                headers: { ...HEADERS, "x-auth": token! }
            });
            if (!response.ok) {
                throw new Error(`Can't get data from server. Try later`)
            } else {
                const res = await response.json();
                if (res.error_code !== 0) {
                    throw new Error(res.error_code)
                }
                return res;
            }
        } catch (error) {
            if (error instanceof Error)
            return rejectWithValue(error.message)
        }
    }
)

//Запрос для добавления записи (метод - POST)
export const addData = createAsyncThunk(
    "data/addData",
    async ({ values, token }:addDataProps, { rejectWithValue }) => {
        try {
            const response = await fetch(`${HOST}/ru/data/v3/testmethods/docs/userdocs/create`, {
                method: 'POST',
                headers: { ...HEADERS, "x-auth": token! },
                body: JSON.stringify(values)
            });
            if (!response.ok) {
                throw new Error(`Can't add data`);
            } else {
                const res = await response.json();
                if (res.error_code !== 0) {
                    throw new Error(res.error_code)
                }
                const newData = res.data;
                return newData;
            }
        } catch (error) {
            if (error instanceof Error)
            return rejectWithValue(error.message);
        }
    }
)

//Запрос для удаления записи(метод - POST)
export const deleteData = createAsyncThunk(
    "data/deleteData",
    async ({ id, token }:deleteDataProps, { rejectWithValue }) => {
        try {
            const response = await fetch(`${HOST}/ru/data/v3/testmethods/docs/userdocs/delete/${id}`, {
                method: 'POST',
                headers: { ...HEADERS, "x-auth": token! },
            });
            if (!response.ok) {
                throw new Error(`Can't delete data`);
            } else {
                const res = await response.json();
                if (res.error_code !== 0) {
                    throw new Error(res.error_code)
                }
                return { res, id };
            }
        } catch (error) {
            if (error instanceof Error)
            return rejectWithValue(error.message);
        }
    }
)

//Запрос для изменения записи(метод POST)
export const updateData = createAsyncThunk(
    "data/updateData",
    async ({ values, id, token }: updateDataProps, { rejectWithValue }) => {
        try {
            const response = await fetch(`${HOST}/ru/data/v3/testmethods/docs/userdocs/set/${id}`, {
                method: 'POST',
                headers: { ...HEADERS, "x-auth": token! },
                body: JSON.stringify(values)
            });
            if (!response.ok) {
                throw new Error(`Can't add data`);
            } else {
                const res = await response.json();
                if (res.error_code !== 0) {
                    throw new Error(res.error_code)
                }
                const updateData = res.data;
                return updateData;
            }
        } catch (error) {
            if (error instanceof Error)
            return rejectWithValue(error.message);
        }
    }
)
const initialState: data = {
    data: [],
    isLoading: false,
    error: '',
}

const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //getData
            .addCase(getData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload.data;
                state.error = '';
            })
            .addCase(getData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getData.rejected, (state, action) => {
                state.isLoading = false;
                const error_code = action.payload;
                if (error_code == 2004) {
                    state.error = 'Произошла ошибка авторизации. Выйдете и авторизуйтесь заново'
                } else {
                    state.error = 'На сервере произошла ошибка получения данных'
                }
            })

            //addData
            .addCase(addData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data.push(action.payload);
                state.error = '';
            })
            .addCase(addData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addData.rejected, (state, action) => {
                state.isLoading = false;
                const error_code = action.payload;
                if (error_code == 2004) {
                    state.error = 'Произошла ошибка авторизации. Выйдете и авторизуйтесь заново'
                } else {
                    state.error = 'На сервере произошла ошибка добавления данных'
                }
            })

            //deleteData
            .addCase(deleteData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = state.data.filter((el) => el.id !== action.payload!.id);
                state.error = '';
            })
            .addCase(deleteData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteData.rejected, (state, action) => {
                state.isLoading = false;
                const error_code = action.payload;
                if (error_code == 2004) {
                    state.error = 'Произошла ошибка авторизации. Выйдете и авторизуйтесь заново'
                } else {
                    state.error = 'На сервере произошла ошибка удаления данных'
                }
            })
            //updateData
            .addCase(updateData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = '';
                state.data = state.data.filter((el) => el.id !== action.payload.id);
                state.data.push(action.payload)
            })
            .addCase(updateData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateData.rejected, (state, action) => {
                state.isLoading = false;
                const error_code = action.payload;
                if (error_code == 2004) {
                    state.error = 'Произошла ошибка авторизации. Выйдете и авторизуйтесь заново'
                } else {
                    state.error = 'На сервере произошла ошибка обновления данных'
                }
            })
    },
})


// export const { } = createSlice.actions;
export default dataSlice.reducer;