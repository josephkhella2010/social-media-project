/* import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  setError,
  fetchMedia,
  uploadMedia,
  setLoading,
  setMediaList,
  addMedia,
  setMessage,
} from '../sliceReducer/mediaSlice';
import { Media } from '../../types/interfacesType';
import { PayloadAction } from '@reduxjs/toolkit';

const BASE_URL = 'http://localhost:5002/api';

// ✅ Get media list
function* getMediaSaga() {
  try {
    yield put(setLoading());
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Unauthorized - No token');

    const response = yield call(axios.get, `${BASE_URL}/media`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const mediaList: Media[] = response.data.media;
    yield put(setMediaList(mediaList));
  } catch (error: any) {
    yield put(setError(error.message || 'Failed to fetch media'));
  }
}

// ✅ Upload media
function* postMediaSaga(action: PayloadAction<FormData>) {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Unauthorized - No token");

    const response = yield call(axios.post, "http://localhost:5002/api/media/upload", action.payload, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    yield put(addMedia(response.data.media));
  } catch (error: any) {
    console.error("❌ Error uploading media:", error.message);
    yield put(setError(error.message || "Failed to upload media"));
  }
}

// ✅ Watcher Saga
export function* watchMediaSaga() {
  yield takeLatest(fetchMedia.type, getMediaSaga);
  yield takeLatest(uploadMedia.type, postMediaSaga);
}
 */


import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  setError,
  fetchMedia,
  uploadMedia,
  setLoading,
  setMediaList,
  addMedia,
  setMessage,
  deleteMedia,
  fetchDelete
} from '../sliceReducer/mediaSlice';
import { PayloadAction } from '@reduxjs/toolkit';


const API_BASE_URL = 'http://localhost:5002/api';

// ✅ Fetch media
function* getMediaSaga() {
  try {
    yield put(setLoading())
    const token = localStorage.getItem('token');
    const response = yield call(axios.get, `${API_BASE_URL}/media`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    yield put(setMediaList(response.data.media));
  } catch (error) {
    console.error('❌ Error fetching media:', error);
    yield put(setError(error.response?.data?.msg || 'Failed to fetch media'));
  }
}

// ✅ Upload media
function*  postMediaSaga(action: any) {
  try {
    yield put(setLoading())
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('file', action.payload.file);
    formData.append('comment', action.payload.comment);

    const response = yield call(axios.post, `http://localhost:5002/api/media/upload`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });

    yield put(addMedia(response.data.media));
  } catch (error:any) {
    console.error('❌ Error uploading media:', error);
    yield put(setError(error.response?.data?.msg || 'Failed to upload media'));
  }
}
function* deleteMediaSaga(action: PayloadAction<number|null>){
   try {
    yield put(setLoading())
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }
  
        console.log("Token:", token);
  
        const response = yield call(axios.delete,
          `http://localhost:5002/api/media/delete/${action.payload}`,
          {
            headers: {
              Authorization: `Bearer ${token}` // Fix: Use "Bearer" instead of "Bear"
            }
          }
        );
        yield put(deleteMedia(response.data))
      } catch (error:any) {
        yield put(setError(error.response?.data?.msg || 'Failed to upload media'));
      }
}

export function* watchMediaSaga() {
  yield takeLatest(fetchMedia.type, getMediaSaga);
  yield takeLatest(uploadMedia.type, postMediaSaga);
  yield takeLatest(fetchDelete.type, deleteMediaSaga);
  
}
