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
// Данные передаются в JSON формате:
// { 
//     "companySigDate": "2022-12-23T11:19:27.017Z\t", 
//     "companySignatureName": "test", 
//     "documentName": "test", 
//     "documentStatus": "test", 
//     "documentType": "test", 
//     "employeeNumber": "test", 
//     "employeeSigDate": "2022-12-23T11:19:27.017Z\t", 
//     "employeeSignatureName": "test" 
// }
// В случае успешного выполнения запроса ответ будет содержать созданную запись и иметь  HTTP STATUS CODE 200.
export const addData = createAsyncThunk(
    "data/addData",
    async ({ values, token }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${HOST}/ru/data/v3/testmethods/docs/userdocs/create`, {
                method: 'POST',
                headers: { ...HEADERS, "x-auth": token },
                body: JSON.stringify({ values })
            });
            if (!response.ok) {
                throw new Error(`Can't add data`);
            } else {
                const res = await response.json();
                return res;
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
                return {res, id};
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

//Запрос для изменения записи(метод POST)
// Где id – это id записи, который получен с данными
// Передаваемые данные аналогичны тем, что передаются при создании записи.
// В случае успешного выполнения запроса в ответе свойство error_code будет иметь значение 0, а свойство data будет содержать измененный объект.
export const updateData = createAsyncThunk(
    "data/updateData",
    async ({ values, id, token }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${HOST}/ru/data/v3/testmethods/docs/userdocs/set/${id}`, {
                method: 'POST',
                headers: { ...HEADERS, "x-auth": token },
                body: JSON.stringify({ values })
            });
            if (!response.ok) {
                throw new Error(`Can't add data`);
            } else {
                const res = await response.json();
                return res;
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)
export interface dataItem {
    id: string,
    companySigDate: string,
    companySignatureName: string,
    documentName: string,
    documentStatus: string,
    documentType: string,
    employeeNumber: string,
    employeeSigDate: string,
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
                state.data = action.payload.data
            })
            .addCase(getData.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getData.rejected, (state, action) => {
                state.isLoading = false;
            })

            //addData
            .addCase(addData.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(addData.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(addData.rejected, (state, action) => {
                state.isLoading = false;
            })

            //deleteData
            .addCase(deleteData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = state.data.filter((el)=> el.id !== action.payload.id );
            })
            .addCase(deleteData.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(deleteData.rejected, (state, action) => {
                state.isLoading = false;
            })
            //updateData
            .addCase(updateData.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(updateData.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(updateData.rejected, (state, action) => {
                state.isLoading = false;
            })
    },
})


// export const { } = createSlice.actions;
export default dataSlice.reducer;