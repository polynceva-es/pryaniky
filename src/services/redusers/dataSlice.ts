import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HOST } from "../../const/host";
import { HEADERS } from "../../const/headers";

// Запрос для получения массива данных для таблицы (метод - GET)
export const getData = createAsyncThunk(
    "data/getData",
    async (token: string, { rejectWithValue }) => {
        try {
            const response = await fetch(`${HOST}/ru/data/v3/testmethods/docs/userdocs/get`, {
                method: 'GET',
                headers: { ...HEADERS, "x-auth": token }
            });
            if (!response.ok) {
                throw new Error(`Can't get data from server. Try later`)
            } else {
                const res = await response.json();
                return res;
            }
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

//Запрос для добавления записи (метод - POST)
// В случае успешного выполнения запроса ответ будет содержать созданную запись и иметь  HTTP STATUS CODE 200.
export const addData = createAsyncThunk(
    "data/addData",
    async ({ values, token }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${HOST}/ru/data/v3/testmethods/docs/userdocs/create`, {
                method: 'POST',
                headers: { ...HEADERS, "x-auth": token },
                body: JSON.stringify(values)
            });
            if (!response.ok) {
                throw new Error(`Can't add data`);
            } else {
                const res = await response.json();
                const newData = res.data;
                return newData;
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

//Запрос для удаления записи(метод - POST)
// В случае успешного выполнения запроса в ответе свойство error_code будет иметь значение 0.
export const deleteData = createAsyncThunk(
    "data/deleteData",
    async ({ id, token }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${HOST}/ru/data/v3/testmethods/docs/userdocs/delete/${id}`, {
                method: 'POST',
                headers: { ...HEADERS, "x-auth": token },
            });
            if (!response.ok) {
                throw new Error(`Can't delete data`);
            } else {
                const res = await response.json();
                return { res, id };
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

//Запрос для изменения записи(метод POST)
// В случае успешного выполнения запроса в ответе свойство error_code будет иметь значение 0, а свойство data будет содержать измененный объект.
export const updateData = createAsyncThunk(
    "data/updateData",
    async ({ values, id, token }, { rejectWithValue }) => {
        console.log(values)
        try {
            const response = await fetch(`${HOST}/ru/data/v3/testmethods/docs/userdocs/set/${id}`, {
                method: 'POST',
                headers: { ...HEADERS, "x-auth": token },
                body: JSON.stringify(values)
            });
            if (!response.ok) {
                throw new Error(`Can't add data`);
            } else {
                const res = await response.json();
                const updateData = res.data;
                return updateData;
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)
export interface dataItem {
    id: string,
    companySigDate: Date, //ISO
    companySignatureName: string,
    documentName: string,
    documentStatus: string,
    documentType: string,
    employeeNumber: string,
    employeeSigDate: Date, //ISO
    employeeSignatureName: string,
}

interface data {
    data: dataItem[],
    isLoading: boolean,
    error: string
}



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
            .addCase(getData.rejected, (state) => {
                state.isLoading = false;
                state.error = 'На сервере произошла ошибка получения данных'
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
            .addCase(addData.rejected, (state) => {
                state.isLoading = false;
                state.error = 'На сервере произошла ошибка добавления данных'
            })

            //deleteData
            .addCase(deleteData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = state.data.filter((el) => el.id !== action.payload.id);
                state.error = '';
            })
            .addCase(deleteData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteData.rejected, (state) => {
                state.isLoading = false;
                state.error = 'На сервере произошла ошибка удаления данных'
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
            .addCase(updateData.rejected, (state) => {
                state.isLoading = false;
                state.error = 'На сервере произошла ошибка обновления данных'
            })
    },
})


// export const { } = createSlice.actions;
export default dataSlice.reducer;