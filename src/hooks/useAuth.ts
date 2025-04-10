import { jwtDecode } from "jwt-decode";

export interface DecodedToken {
  id: number;
  name: string;
  email: string;
  phone: string;
  roleId: number;
  iat: number;
  exp: number;
}

const isAuthenticated = () => {
  const token = localStorage.getItem("accessToken");
  return token;
};
const getUser = () => {
  const token = isAuthenticated();
  if (!token) {
    return;
  }
  const user = jwtDecode<DecodedToken>(token);

  return user
};
export { isAuthenticated, getUser };
