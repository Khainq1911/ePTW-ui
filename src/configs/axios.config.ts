import axios from "axios";



export const instances = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

instances.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

instances.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalConfig = error.routeConfig;

    if (error.response && error.response.status === 419) {
      try {
        const result = await instances.post(
          `${import.meta.env.BASE_URL}/auth/refresh-token`,
          {
            refreshToken: localStorage.getItem("refreshToken"),
          },
        );
        const { accessToken, refreshToken } = result.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        originalConfig.headers.Authorization = `Bearer $${accessToken}`;

        return instances(originalConfig);
      } catch (err) {
        if (error.response && error.response.status === 400) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/login";
        }
        return Promise.reject(err);
      }
    }
  },
);
