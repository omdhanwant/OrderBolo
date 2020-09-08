export interface OtpData {
  error: number;
  loggedIn: number;
  message: string;
  status: number;


}

export interface VerifyOtpData{
  email: string;
  email_verified_at: number;
  error: number;
  loggedIn: number;
  message: string;
  mobile: string;
  name: string;
  token: string;
  user_id: number;
}


export interface User {
  mobile: string;
  name: string;
  id: number;
}
