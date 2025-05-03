
/* 
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginUserType } from "../pages/helps/interfacesType";

interface InitialStateType {
  loginUser: loginUserType | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isLogged: boolean;
}

const initialState: InitialStateType = {
  loginUser: null,
  token: localStorage.getItem("token") || null, // Load token from localStorage
  loading: false,
  error: null,
  isLogged: !!localStorage.getItem("token"), // Set logged-in state based on token
};

const loginSlice = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {
    // ✅ Added missing action to trigger saga
    setLoginUserRequest: (state,_action: PayloadAction<loginUserType>) => {
      state.loading = true;
      state.error = null;
    },
    setLoginUser: (
      state,
      action: PayloadAction<{ user: loginUserType; token: string }>
    ) => {
      state.loginUser = action.payload.user;
      state.token = action.payload.token;
      state.isLogged = true;
      state.loading = false;
      localStorage.setItem("token", action.payload.token); // Store token
    },
    logoutUser: (state) => {
      state.loginUser = null;
      state.token = null;
      state.isLogged = false;
      state.loading = false;
      localStorage.removeItem("token"); // Remove token on logout
    },
    LoginFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setLoginUserRequest, setLoginUser, logoutUser, LoginFail } =
  loginSlice.actions;
export default loginSlice.reducer;
 */

/* import { createSlice, PayloadAction } from "@reduxjs/toolkit";
  interface User{
    username?: string,
    firstName?: string,
    lastName?: string,
    password?:string,
    email?:string,
    gender?:string,
    id?:number
  }

interface LoginState {
  user: User| null;
  token: string | null;
  isLogged: boolean;
  error: string | null;
}


 const initialState: LoginState = {
    user: JSON.parse(localStorage.getItem("user") || "{}"), 
  token: localStorage.getItem("token") || null,
  isLogged: !!localStorage.getItem("token"),
  error: null,
}; 
const loginSlice = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {
    setLoginUser: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLogged = true;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user)); // Save user
    },
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.isLogged = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user"); // Remove user
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    updateUserInfo: (state, action: PayloadAction<Partial<LoginState['user']>>) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export const { setLoginUser, logoutUser, setError,updateUserInfo } = loginSlice.actions;
export default loginSlice.reducer; */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  username?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  email?: string;
  gender?: string;
  id?: number;
}

interface LoginState {
  user: User | null;
  token: string | null;
  isLogged: boolean;
  error: string | null;
}

const savedUser = JSON.parse(localStorage.getItem("user") || "null"); // 👈 Fix: Use `null` instead of `{}`

const initialState: LoginState = {
  user: savedUser && Object.keys(savedUser).length ? savedUser : null, // 👈 Fix: Set to `null` if empty object
  token: localStorage.getItem("token") || null,
  isLogged: !!localStorage.getItem("token"),
  error: null,
};

const loginSlice = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {
    setLoginUser: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLogged = true;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.isLogged = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    updateUserInfo: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem("user", JSON.stringify(state.user)); // ✅ Sync with localStorage
      }
    },
  },
});

export const { setLoginUser, logoutUser, setError, updateUserInfo } = loginSlice.actions;
export default loginSlice.reducer;
