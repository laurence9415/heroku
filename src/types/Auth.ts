export interface LoginForm {
  email: string;
  password: string;
};

export interface ResetPasswordForm {
  password?: string
  password_confirmation?: string
  token?: string
}

export interface SignUpForm {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};