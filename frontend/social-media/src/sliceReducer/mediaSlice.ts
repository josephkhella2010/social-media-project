import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Media } from "../pages/helps/interfacesType";

interface InitType {
  mediaList: Media[];
  loading: boolean;
  error: string | null;
  message: string | null;
}

const initialState: InitType = {
  mediaList: [],
  loading: false,
  error: null,
  message: null,
};

const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {
    setMediaList: (state, action: PayloadAction<Media[]>) => {
      state.mediaList = action.payload;
      state.loading = false;
      state.error = null;
    },
    addMedia: (state, action: PayloadAction<Media>) => {
      state.mediaList.unshift(action.payload);
      state.loading = false;
      state.error = null;
    },
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    // ✅ No payload for GET request
    fetchMedia: (state) => {
      state.loading = true;
    },
    // ✅ Payload for POST should be File (not FormData)
    uploadMedia: (state, action: PayloadAction<FormData>) => {
      state.loading = true;
      console.log(action)
    },
    // delete
    deleteMedia:(state,action: PayloadAction<number|null>)=>{
      state.loading = true;
      state.mediaList = state.mediaList.filter((item) => item.id !== action.payload);
    },
    //fetch Delete
    fetchDelete:(state,action: PayloadAction<number|null>)=>{
      state.loading = true;
      console.log(action)
    }
  },
});

export const {
  setMediaList,
  addMedia,
  setLoading,
  setError,
  setMessage,
  fetchMedia,
  uploadMedia,
  deleteMedia,
  fetchDelete
} = mediaSlice.actions;

export default mediaSlice.reducer;
