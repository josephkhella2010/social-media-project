// src/sagas/userInformationSaga.ts

 import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  registerUserFail,
  setUserInformation,
  registerUserRequest,
  getUsersRequest,
  getUsersFail,
  getUsersInfo,
} from "../sliceReducer/userInformationSlice";
import { userInformationType } from "../pages/helps/interfacesType";
import { PayloadAction } from "@reduxjs/toolkit";
const Base_URL="http://localhost:5002"
// post function
function* postUserInformationSaga(
  action: PayloadAction<userInformationType>
): Generator {
  try {
    const userData = action.payload;
    const response = yield call(
      axios.post,
      `${Base_URL}/api/register`,
      userData
    );

    yield put(setUserInformation(response.data));
  }catch (error: unknown) {
    if (error instanceof Error) {
      console.log("Error during registration:", error.message);
      yield put(registerUserFail(error.message));
    } else {
      console.log("Unknown error occurred");
      yield put(registerUserFail("An unknown error occurred"));
    }
  }
}
// get function
function*getUsersInformationSaga():Generator{
try {
  const response = yield call(axios.get,`${Base_URL}/user`); 
  yield put(getUsersInfo(response.data))
    
}

catch (error: unknown) {
    if (error instanceof Error) {
      console.log("Error during registration:", error.message);
      yield put(getUsersFail(error.message))  } 
      else {
      console.log("Unknown error occurred");
      yield put(getUsersFail("An unknown error occurred"));
    }
  }

}


export function* watchUserInformationSaga() {
  yield takeLatest(registerUserRequest.type, postUserInformationSaga);
  yield takeLatest(getUsersRequest.type, getUsersInformationSaga);

} 
  