/* 
 import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { friendsType } from "../pages/helps/interfacesType";

// ✅ Initial state type
interface InitType {
  friend: friendsType[];
  filterFriend: friendsType[] | null; // ✅ Add filterFriend
  loading: boolean;
  error: null | string;
}

const initialState: InitType = {
  loading: false,
  friend: [],
  filterFriend: null, // ✅ Initialize filterFriend
  error: null
};

const showFriendSlice = createSlice({
  name: "showFriend",
  initialState,
  reducers: {
    addFriend: (state, action: PayloadAction<friendsType>) => {
      state.friend.push(action.payload);
      state.filterFriend = state.friend; // ✅ Keep filter in sync
    },
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setFriend: (state, action: PayloadAction<friendsType[]>) => {
      state.loading = false;
      state.error = null;
      state.friend = [...action.payload];
      state.filterFriend = [...action.payload]; // ✅ Sync filter with fetched data
    },
    fetchFriend: (state) => {
      state.loading = true;
    },
    // ✅ Filter action
    setFilterFriend: (state, action: PayloadAction<string | null>) => {
      if (action.payload === null) {
        // ✅ Reset filter
        state.filterFriend = state.friend;
      } else {
        // ✅ Filter by name (case-insensitive)
        state.filterFriend = state.friend.filter(friend =>
          friend.name.toLowerCase().includes(action.payload!.toLowerCase())
        );
      }
    }
  }
});

export const {
  setLoading,
  setError,
  addFriend,
  setFriend,
  fetchFriend,
  setFilterFriend // ✅ Export filter action
} = showFriendSlice.actions;

export default showFriendSlice.reducer;
 */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { friendsType } from "../pages/helps/interfacesType";

// ✅ Initial state type
interface InitType {
  friend: friendsType[];   // This is the list of friends
  filterFriend: friendsType[] | null;  // For filtered friends
  loading: boolean;
  error: null | string;
}

const initialState: InitType = {
  loading: false,
  friend: [],
  filterFriend: null,
  error: null
};

const showFriendSlice = createSlice({
  name: "showFriend",
  initialState,
  reducers: {
    addFriend: (state, action: PayloadAction<friendsType>) => {
      state.friend.push(action.payload);
      state.filterFriend = state.friend; // Keep filter in sync
    },
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setFriend: (state, action: PayloadAction<friendsType[]>) => {
      state.loading = false;
      state.error = null;
      state.friend = [...action.payload];
      state.filterFriend = [...action.payload]; // Sync filter with fetched data
    },
    fetchFriend: (state, action: PayloadAction<number>) => {
      state.loading = true;
    },
    setFilterFriend: (state, action: PayloadAction<string | null>) => {
      if (action.payload === null) {
        // Reset filter
        state.filterFriend = state.friend;
      } else {
        // Filter by name (case-insensitive)
        state.filterFriend = state.friend.filter(friend =>
          friend.username.toLowerCase().includes(action.payload!.toLowerCase())
        );
      }
    }
  }
});

export const {
  setLoading,
  setError,
  addFriend,
  setFriend,
  fetchFriend,
  setFilterFriend
} = showFriendSlice.actions;

export default showFriendSlice.reducer;

