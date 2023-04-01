import { useMutation } from "react-query";
import axios from "axios";

import { ResetPasswordForm, LoginForm, SignUpForm, SetGetArgs } from "types";



export const useForgotPasswordMutataion = ({ onSuccess, onError }: SetGetArgs) => {
  return useMutation({
    mutationFn: (email: string) => {
      return axios.post(`/api/forgot-password`, { email });
    },
    onSuccess,
    onError
  });
};

export const useGetTokenMutation = ({ onSuccess } : SetGetArgs) => {
  return useMutation({
    mutationFn: (tempToken: string) => {
      return axios.get(`/api/get-token?token=${tempToken}`);
    },
    onSuccess,
  });
};

export const useLoginMutation = ({ onSuccess, onError }: SetGetArgs) => {
  return useMutation({
    mutationFn: (form: LoginForm) => {
      return axios.post(`/api/login`, form);
    },
    onSuccess,
    onError
  });
};

export const useResetPasswordMutation = ({ onSuccess, onError }: SetGetArgs) => {
  return useMutation({
    mutationFn: (form: ResetPasswordForm) => {
      return axios.post(`/api/reset-password`, form);
    },
    onSuccess,
    onError
  });
};

export const useValidateTokenMutation = ({ onSuccess, onError }: SetGetArgs) => {
  return useMutation({
    mutationFn: (token: string) => {
      return axios.get(`/api/validate-reset-token?token=${token}`);
    },
    onSuccess,
    onError
  });
};

export const useSignUpMutation = ({ onSuccess, onError }: SetGetArgs) => {
  return useMutation({
    mutationFn: (form: SignUpForm) => {
      return axios.post(`/api/register`, form);
    },
    onSuccess,
    onError
  });
};

export const useLogoutMutation = ({ onSuccess, onError }: SetGetArgs) => {
  return useMutation({
    mutationFn: () => {
      return axios.post('/api/logout')
    },
    onSuccess,
    onError
  })
}