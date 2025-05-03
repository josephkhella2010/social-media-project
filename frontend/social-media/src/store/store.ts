/*  import { configureStore } from "@reduxjs/toolkit"
import usersInformationReducer from "../sliceReducer/userInformationSlice"
import loginSliceReducer from "../sliceReducer/loginSlice"
import themeSliceReducer from "../sliceReducer/themeSlice"
import friendSliceReducer from "../sliceReducer/friendSlice"
import videoSliceReducer from "../sliceReducer/videoSlice"
import createSagaMiddleware from "redux-saga";
import rootSaga from "../saga/rootSaga";
const sagaMiddleware = createSagaMiddleware();

const store=configureStore({
    reducer:{
        usersInformation:usersInformationReducer,
        loginInformation:loginSliceReducer,
        theme:themeSliceReducer,
        friends:friendSliceReducer,
        video:videoSliceReducer
        

    },middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
 })
 sagaMiddleware.run(rootSaga);

 export default store;
 export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 
 */

import { configureStore } from "@reduxjs/toolkit";
import usersInformationReducer from "../sliceReducer/userInformationSlice";
import loginSliceReducer from "../sliceReducer/loginSlice";
import themeSliceReducer from "../sliceReducer/themeSlice";
import friendSliceReducer from "../sliceReducer/friendSlice";
import mediaSliceReducer from "../sliceReducer/mediaSlice";
import showFriendSliceReducer from "../sliceReducer/showFriendSlice";


import createSagaMiddleware from "redux-saga";
import rootSaga from "../saga/rootSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    usersInformation: usersInformationReducer,
    loginInformation: loginSliceReducer,
    theme: themeSliceReducer,
    friends: friendSliceReducer,
    media:mediaSliceReducer,
    showFriend:showFriendSliceReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: {
        // ✅ Ignore FormData in the payload to avoid serialization warnings
        ignoredActions: ["video/uploadMedia"],
        ignoredActionPaths: ["payload"],
        ignoredPaths: ["video.mediaList"],
      },
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
