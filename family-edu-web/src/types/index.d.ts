// http请求
declare namespace IHttpResponse{}


// login
declare namespace ILogin{
   export interface LoginForm {
       username: string;
       password: string;
   }
}