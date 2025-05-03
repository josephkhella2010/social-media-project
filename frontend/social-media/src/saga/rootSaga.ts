import {all,fork} from "redux-saga/effects";
import { watchUserInformationSaga } from "./userInformationSaga";
import { watchMediaSaga } from "./mediaSaga";
import { watchGetFriend } from "./friendSaga";
export default function* rootSaga(){
    yield all([ fork(watchUserInformationSaga),fork(watchMediaSaga),fork( watchGetFriend)])
}