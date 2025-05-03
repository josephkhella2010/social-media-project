/*  import {call,put, takeLatest } from 'redux-saga/effects';
import axios from "axios"
import { LoginFail, setLoginUser, setLoginUserRequest } from '../sliceReducer/loginSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { loginUserType } from '../pages/helps/interfacesType';
const BASE_URL="http://localhost:5000"
 function* loginInfoSaga(action: PayloadAction<loginUserType>): Generator{
    try {
        const loginData=action.payload
        const response= yield call(axios.post,`${BASE_URL}/api/login`,loginData)
        yield put(setLoginUser( response.data.user))
        
    } 
    catch (error: unknown) {
        if (error instanceof Error) {
          console.log("Error during registration:", error.message);
          yield put(LoginFail(error.message));
        } else {
          console.log("Unknown error occurred");
          yield put(LoginFail("An unknown error occurred"));
        }
      }
 
} 
    
export function* watchLoginInfo(){
yield takeLatest(setLoginUserRequest.type,loginInfoSaga)
}
 
 */
/////
/* import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  LoginFail,
  setLoginUser,
  setLoginUserRequest,
} from "../sliceReducer/loginSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { loginUserType } from "../pages/helps/interfacesType";

const BASE_URL = "http://localhost:5000";

function* loginInfoSaga(action: PayloadAction<loginUserType>) {
  try {
    yield put(setLoginUserRequest(action.payload)); // ✅ Now properly defined in slice

    const loginData = action.payload;

    // ✅ Call API to log in and get JWT token
    const response: { data: { user: loginUserType; token: string } } = yield call(
      axios.post,
      `${BASE_URL}/api/login`,
      loginData
    );

    // ✅ Extract token from response
    const { user, token } = response.data;

    // ✅ Store token in localStorage for persistence
    localStorage.setItem("token", token);

    // ✅ Dispatch user data & token to Redux
    yield put(setLoginUser({ user, token }));
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error during login:", error.message);
      yield put(LoginFail(error.message));
    } else {
      console.log("Unknown error occurred");
      yield put(LoginFail("An unknown error occurred"));
    }
  }
}

export function* watchLoginInfo() {
  yield takeLatest(setLoginUserRequest.type, loginInfoSaga);
}
 */