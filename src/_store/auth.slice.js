import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { history, fetchWrapper } from '_helpers';

// create slice

const name = 'auth';
const initialState = createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, reducers, extraReducers });

// exports

export const authActions = { ...slice.actions, ...extraActions };
export const authReducer = slice.reducer;

// implementation

function createInitialState() {
    return {
        // initialize state from local storage to enable user to stay logged in
        user: JSON.parse(localStorage.getItem('user')),
        error: null
    }
}

function createReducers() {
    return {
        signout
    };

    function signout(state) {
        state.user = null;
        localStorage.removeItem('user');
        history.navigate('/signin');
    }
}

function createExtraActions() {
    const baseUrl = `${process.env.REACT_APP_API_URL}/auth`;

    return {
        signin: signin(),
        signup: signup(),
    };    

    function signin() {
        return createAsyncThunk(
            `${name}/signin`,
            async ({ username, password, provider }) => await fetchWrapper.post(`${baseUrl}/signin`, { username, password, provider })
        );
    }

    function signup() {
        return createAsyncThunk(
            `${name}/signup`,
            async ({ username, password, email, firstname, lastname, provider }) => await fetchWrapper.post(`${baseUrl}/signup`, { username, password, email, firstname, lastname, provider })
        );
    }
}

function createExtraReducers() {
    return {
        ...signin(),
        ...signup()
    };

    function signin() {
        var { pending, fulfilled, rejected } = extraActions.signin;
        return {
            [pending]: (state) => {
                state.error = null;
            },
            [fulfilled]: (state, action) => {
                const user = action.payload;
                
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                state.user = user;
                // get return url from location state or default to home page
                const { from } = history.location.state || '/' ;
                
                history.location = from || '/'  ;
            },
            [rejected]: (state, action) => {
                state.error = action.error;
            }
        };
    }

    function signup() {
        var { pending, fulfilled, rejected } = extraActions.signup;
        return {
            [pending]: (state) => {
                state.error = null;
            },
            [fulfilled]: (state, action) => {
                const user = action.payload;
                
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                state.user = user;
                // get return url from location state or default to home page
                const { from } = history.location.state || '/' ;
                
                history.location = from || '/'  ;
            },
            [rejected]: (state, action) => {
                state.error = action.error;
            }
        };
    }
}
