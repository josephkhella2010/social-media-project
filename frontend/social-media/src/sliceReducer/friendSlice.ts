/* import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { friendsType } from "../pages/helps/interfacesType";

const initialState: { friends: friendsType[],filterFriend:friendsType[] } = {
  friends: [
    { name: "jesus", url: "/fotos/friends/friend1.jpg", id: 1 },
    { name: "mary", url: "/fotos/friends/friend2.jpg", id: 2 },
    { name: "joseph", url: "/fotos/friends/friend3.jpg", id: 3 },
    { name: "jesus", url: "/fotos/friends/friend1.jpg", id: 4 },
    { name: "mary", url: "/fotos/friends/friend2.jpg", id: 5 },
    { name: "joseph", url: "/fotos/friends/friend3.jpg", id: 6 },
    { name: "jesus", url: "/fotos/friends/friend1.jpg", id: 7 },
    { name: "mary", url: "/fotos/friends/friend2.jpg", id: 8 },
    { name: "joseph", url: "/fotos/friends/friend3.jpg", id: 9 },
    { name: "jesus", url: "/fotos/friends/friend1.jpg", id: 10 },
    { name: "mary", url: "/fotos/friends/friend2.jpg", id: 11 },
    { name: "joseph", url: "/fotos/friends/friend3.jpg", id: 12 }
  ],filterFriend:[]
};

const friendSlice = createSlice({
  name: "friendSlice",
  initialState,
  reducers: {
    setFriends: (state, action: PayloadAction<friendsType[]>) => {
      state.friends = action.payload;
    }, setFilterFriend:(state)=>{
state.filterFriend=state.friends
    }
  }
});

export const { setFriends,setFilterFriend } = friendSlice.actions;
export default friendSlice.reducer; */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { friendsType } from "../pages/helps/interfacesType";

const initialState: { friends: friendsType[]; filterFriend: friendsType[],showFriendsSideBar:boolean } = {
  friends: [
    { name: "jesus", url: "/fotos/friends/friend1.jpg", id: 1 },
    { name: "mary", url: "/fotos/friends/friend2.jpg", id: 2 },
    { name: "joseph", url: "/fotos/friends/friend3.jpg", id: 3 },
    { name: "jesus", url: "/fotos/friends/friend1.jpg", id: 4 },
    { name: "mary", url: "/fotos/friends/friend2.jpg", id: 5 },
    { name: "joseph", url: "/fotos/friends/friend3.jpg", id: 6 },
    { name: "jesus", url: "/fotos/friends/friend1.jpg", id: 7 },
    { name: "mary", url: "/fotos/friends/friend2.jpg", id: 8 },
    { name: "joseph", url: "/fotos/friends/friend3.jpg", id: 9 },
    { name: "jesus", url: "/fotos/friends/friend1.jpg", id: 10 },
    { name: "mary", url: "/fotos/friends/friend2.jpg", id: 11 },
    { name: "joseph", url: "/fotos/friends/friend3.jpg", id: 12 }
  ],
  filterFriend: [], 
  showFriendsSideBar:false
};

const friendSlice = createSlice({
  name: "friendSlice",
  initialState,
  reducers: {
    setFilterFriend: (state, action: PayloadAction<friendsType[] | null>) => {
      if (action.payload === null) {
        state.filterFriend = state.friends;
      } else {
        state.filterFriend = action.payload;
      }
    },
    setShowFriendsSideBar: (state, action: PayloadAction<boolean>) => {
      state.showFriendsSideBar = action.payload;
    }
    
  },
});

export const { setFilterFriend,setShowFriendsSideBar } = friendSlice.actions;
export default friendSlice.reducer;
