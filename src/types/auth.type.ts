import { ChangeEvent, FormEvent } from "react";

export interface FormDataDto {
  username?: string;
  name?: string;
  phone?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export interface PropsForm {
  handleUpdateValue: (e: ChangeEvent<HTMLInputElement>) => void;
  handleLogin?: (e: FormEvent<HTMLFormElement>) => void;
  handleSignUp?: (e: FormEvent<HTMLFormElement>) => void;
  loading: boolean;
}
