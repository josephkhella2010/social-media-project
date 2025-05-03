/* 
  import { call, put, takeLatest } from "redux-saga/effects";
  import axios from "axios";
  import {
    setLoading,
    setError,
    setFriend,
    fetchFriend,
    setFilterFriend
  } from "../sliceReducer/showFriendSlice";
  import { friendsType } from "../pages/helps/interfacesType";
  
  const API_BASE_URL = "http://localhost:5002/api";
  
  // ✅ Fix: Correct response type definition
  interface ResponseType {
    data: {
      friend: friendsType[]; // ✅ Fix: Match backend response structure
    };
  }
  
  // ✅ Fixed Saga
  function* getFriend() {
    try {
      const token = localStorage.getItem("token");
  
      yield put(setLoading());
  
      if (!token) {
        console.log("No token found");
        yield put(setError("No token found"));
        return;
      }
  
      // ✅ Fix: TypeScript type now matches the backend response
      const response: ResponseType = yield call(
        axios.get,
        `${API_BASE_URL}/friend/friends`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
  
      //console.log("Fetched friends:", response.data.friend); // ✅ Debugging log
  
      // ✅ Fix: Extract `friend` from the object
      yield put(setFriend(response.data.friend)); 
      yield put(setFilterFriend(null));
    } catch (error: any) {
      console.error("Error fetching friends:", error.message);
      yield put(setError(error.message));
    } finally {
      yield put(setLoading());
    }
  }
  
  // ✅ Watcher Saga
  export function* watchGetFriend(){
    yield takeLatest(fetchFriend.type, getFriend);
  }
  
 */
  import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  setLoading,
  setError,
  setFriend,
  fetchFriend,
  setFilterFriend
} from "../sliceReducer/showFriendSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { friendsType } from "../pages/helps/interfacesType";

const API_BASE_URL = "http://localhost:5002/api";

// Correct response type definition
interface ResponseType {
  data: {
    friends: friendsType[];  // Expecting a `friends` array in response
  };
}

// Get friends of a user
function* getFriend(action: PayloadAction<number>) {
  try {
    const token = localStorage.getItem("token");
    const userId = action.payload;  // Get userId from the dispatched action

    yield put(setLoading());  // Set loading state

    if (!token) {
      console.log("No token found");
      yield put(setError("No token found"));
      return;
    }

    // API call to fetch friends for a specific user
    const response: ResponseType = yield call(
      axios.get,
      `${API_BASE_URL}/friend/friends/${userId}`, // Pass userId to the backend
      {
        headers: { Authorization: `Bearer ${token}` },
        
      }
    );
console.log(response.data)
    // Dispatch the action to set the friends' list in the state
    yield put(setFriend(response.data.friends));

    // Clear any filters after fetching the data
    yield put(setFilterFriend(null));

  } catch (error: any) {
    console.error("Error fetching friends:", error.message);
    yield put(setError(error.message));
  } finally {
    yield put(setLoading());  // Ensure loading state is set to false after completion
  }
}

// Watcher Saga: watch for `fetchFriend` action to trigger `getFriend`
export function* watchGetFriend() {
  yield takeLatest(fetchFriend.type, getFriend);
}
