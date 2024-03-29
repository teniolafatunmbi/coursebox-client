import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import authService from './authService';

const initialState = {
    user: Cookies.get('user') ? JSON.parse(Cookies.get('user')!): {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    isAuthenticated: false,
    message: '',
};

// register student
export const signUp = createAsyncThunk(
    'auth/signup', 
    async (user: object, thunkAPI) => {
        try {
            return await authService.register(user);;
        } catch(error: any) {
            const message = (error.response && 
                error.response.data && 
                error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// login student and lecturer
export const login = createAsyncThunk(
    'auth/login', 
    async (user: object, thunkAPI) => {
        try {
            return await authService.login(user);
        } catch(error: any) { 
            const message = (error.response && 
                error.response.data && 
                error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const logout = createAsyncThunk(
    'auth/logout', 
    async () => {
        setAuthorized(false);
        return authService.logout();
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = '';
        },
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        setAuthorized: (state, action) => {
            state.isAuthenticated = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signUp.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
                Cookies.set('user', JSON.stringify(action.payload), { sameSite: 'strict', secure: true, expires:86400});
                state.isAuthenticated = true;
            })
            .addCase(signUp.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.user = {};
                state.message = JSON.stringify(action.payload);
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
                Cookies.set('user', JSON.stringify(action.payload), { sameSite: 'strict', secure: true, expires: 86400});
                state.isAuthenticated = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.user = {};
                state.message = JSON.stringify(action.payload);
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = {};
                state.isAuthenticated = false;
            })
    }
});
export const { reset, setUser, setAuthorized } = authSlice.actions;
export default authSlice.reducer;
