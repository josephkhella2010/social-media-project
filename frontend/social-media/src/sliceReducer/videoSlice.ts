/* 
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the types
interface Media {
  id: string;
  filename: string;
  filetype: string;
  mediaUrl: string;
  comment?:string
}

interface VideoState {
  mediaList: Media[];
  loading: boolean;
  error: string | null;
  message: string | null;
}

const initialState: VideoState = {
  mediaList: [],
  loading: false,
  error: null,
  message: null,
};

const videoSlice = createSlice({
  name: "video",
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
    fetchMedia: (state) => {
      state.loading = true;
    },
    uploadMedia: (state, action: PayloadAction<FormData>) => {
      state.loading = true;
      console.log(action)
    },
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
} = videoSlice.actions;

export default videoSlice.reducer;

 */
/* import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// ✅ Define the types
interface Media {
  id: string;
  filename: string;
  filetype: string;
  mediaUrl: string;
  comment?: string;
}

interface MediaState {
  mediaList: Media[];
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: MediaState = {
  mediaList: [],
  loading: false,
  error: null,
  successMessage: null,
};

const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {
    // ✅ Set fetched media and reset loading state
    setMediaItems: (state, action: PayloadAction<Media[]>) => {
      state.mediaList = action.payload;
      state.loading = false;
      state.error = null;
    },

    // ✅ Add media at the beginning of the list
    addMediaItem: (state, action: PayloadAction<Media>) => {
      state.mediaList.unshift(action.payload);
      state.loading = false;
      state.error = null;
      state.successMessage = "Media uploaded successfully";
    },

    // ✅ Set loading state
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    },

    // ✅ Set error message and reset loading state
    setError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ✅ Set success message
    setSuccessMessage: (state, action: PayloadAction<string | null>) => {
      state.successMessage = action.payload;
    },

    // ✅ Trigger fetching media (used in saga)
    loadMedia: (state) => {
      state.loading = true;
    },

    // ✅ Trigger uploading media (used in saga)
    uploadMediaItem: (state, action: PayloadAction<FormData>) => {
      state.loading = true;
    },
  },
});

export const {
  setMediaItems,
  addMediaItem,
  setLoading,
  setError,
  setSuccessMessage,
  loadMedia,
  uploadMediaItem,
} = mediaSlice.actions;

export default mediaSlice.reducer;
 */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the types
interface Media {
  id: string;
  filename: string;
  filetype: string;
  mediaUrl: string;
  comment?:string
}

interface VideoState {
  mediaList: Media[];
  loading: boolean;
  error: string | null;
  message: string | null;
}

const initialState: VideoState = {
  mediaList: [],
  loading: false,
  error: null,
  message: null,
};

const videoSlice = createSlice({
  name: "video",
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
    fetchMedia: (state) => {
      state.loading = true;
    },
    uploadMedia: (state, action: PayloadAction<FormData>) => {
      state.loading = true;
      console.log(action)
    },
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
} = videoSlice.actions;

export default videoSlice.reducer;


