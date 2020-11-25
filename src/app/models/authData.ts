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
  user_type:string;
}


export interface User {
  userType: string;
  mobile: string;
  name: string;
  email: string;
  profile_photo: string;
  id: number;
}

export interface AuthUser {
  user: User;
  isAuthenticated: boolean;
}
