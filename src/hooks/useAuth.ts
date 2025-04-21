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

enum Role {
  Worker = 1,
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

  return user;
};

const isWorker = () => {
  const user = getUser();

  if (!user) {
    return;
  }

  return user.roleId === Role.Worker;
};
export { isAuthenticated, getUser, isWorker };
