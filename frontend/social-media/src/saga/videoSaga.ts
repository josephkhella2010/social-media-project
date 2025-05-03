import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  setError,
  setMediaList,
  setLoading,
  addMedia,
  setMessage,
  fetchMedia,
  uploadMedia,
} from "../sliceReducer/mediaSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { Media } from "../pages/helps/interfacesType";

const BASE_URL = "http://localhost:5002/api";

// Function to fetch media
function* getMediaSaga(action: PayloadAction<FormData>) {
  try {
    yield put(setLoading());

    const token = localStorage.getItem("token");
    if (!token) throw new Error("Unauthorized - No token");

    const response = yield call(axios.get, `${BASE_URL}/media`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Assuming response returns an array of Media objects
    const mediaList: Media[] = response.data.media;

    yield put(setMediaList(mediaList));
    yield put(setMessage("Media fetched successfully!"));
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message || error.message || "Failed to fetch media";
    console.error("Error fetching media:", errorMessage);
    yield put(setError(errorMessage));
  }
}

// Function to upload media
function* postMediaSaga(action: PayloadAction<FormData>) {
  try {
    yield put(setLoading());

    const token = localStorage.getItem("token");
    if (!token) throw new Error("Unauthorized - No token");

    const response = yield call(
      axios.post,
      `${BASE_URL}/media`,
      action.payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Assuming the response returns a single Media object
    const newMedia: Media = response.data.media;

    yield put(addMedia(newMedia));
    yield put(setMessage("Media uploaded successfully!"));
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message || error.message || "Failed to upload media";
    console.error("Error uploading media:", errorMessage);
    yield put(setError(errorMessage));
  }
}

// Watcher saga
export function* watchMediaSaga() {
  yield takeLatest(fetchMedia.type, getMediaSaga);
  yield takeLatest(uploadMedia.type, postMediaSaga);
}
