 import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { userInformationType } from "../pages/helps/interfacesType";
interface  initialStateType{
    userInformation:  userInformationType[],
    loading:boolean,
    error:string|null
}
const initialState:initialStateType=
{userInformation: [] ,
    loading:false,
    error:null
}
const userInformationSlice=createSlice({
    name:"userInformation",
    initialState,
    reducers:{
        setUserInformation:(state,action:PayloadAction<userInformationType>)=>{
            state.loading = false;
            state.userInformation.push(action.payload)
        },
        registerUserRequest: (state,action:PayloadAction<userInformationType>) => {
            state.loading = true;
            state.error = null;
            state.userInformation.push(action.payload)
        },
        registerUserFail:(state,action: PayloadAction<string>)=>{
            state.loading = false;
            state.error = action.payload
        },
       
        getUsersRequest: (state) => {
            state.loading = true;
            state.error = null;
          },
      
          getUsersInfo: (state, action: PayloadAction<userInformationType[]>) => {
            state.loading = false;
            state.userInformation = action.payload;
          },
      
          getUsersFail: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
          }

    }
})
export const{setUserInformation,registerUserRequest,registerUserFail
    ,getUsersRequest,getUsersFail,getUsersInfo}=userInformationSlice.actions
export default userInformationSlice.reducer; 
