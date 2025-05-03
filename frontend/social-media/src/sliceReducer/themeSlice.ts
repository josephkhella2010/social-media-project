import {createSlice} from "@reduxjs/toolkit"
 const initialState={
    theme:JSON.parse(localStorage.getItem("theme")||`"light"`)
 }

 const themeSlice=createSlice({
    name:"themeSlice",initialState,
    reducers:{
        setTheme:(state,action)=>{
            state.theme=action.payload
        }
    }
 })
 export const {setTheme}=themeSlice.actions
 export default themeSlice.reducer