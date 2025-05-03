export interface userInformationType{
    id?:number
    firstName: string,
        lastName:string,
        birthDay: string,
        gender: string,
        username: string,
        password: string,
        email:string,
        photoUrl?:string

} 
export interface loginUserType{
    username:string,
    password:string,
    firstName?: string;
  lastName?: string;
  email?:string;
  gender?:string;
  photoUrl?:string
  
}
export interface friendsType{
  name:string,
  photoUrl:string,
  id:number,
  userId?:number|string|undefined,
  email?:string,
  birthDay?:string,
  firstName?:string,
  lastName?:string, gender?:string
}

export interface Media {
  id: number;
  mediaUrl: string;
  filetype: string;
  filename: string;
  comment?:string
}
export interface imgsArrType {
name: string;
  url: string;
}
export interface friendsType{
  name:string,url:string,id:number
}
export  interface ChatSmsType{
  message:string,senderName:string
}