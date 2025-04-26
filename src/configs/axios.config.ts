import axios from 'axios';

export const instances = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 5000,
    headers: { 'Content-Type': 'application/json' },
});

instances.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem('accessToken');
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
    (response) => response,
    async (error) => {
        const originalConfig = error.config;

        if (error.response && error.response.status === 401) {
            originalConfig._retry = true;

            try {
                console.log('accessToken is expired');
                const result = await instances.post(`${import.meta.env.VITE_API_URL}/auth/refresh-token`, {
                    refreshToken: localStorage.getItem('refreshToken'),
                });

                if (result?.data) {
                    const { accessToken, refreshToken } = result.data;
                    localStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('refreshToken', refreshToken);

                    originalConfig.headers.Authorization = `Bearer ${accessToken}`;

                    return instances(originalConfig);
                }
            } catch (err: any) {
                console.log('refreshToken is expired', error.response.status);

                if (err.response && err.response.status === 400) {
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    window.location.href = '/login';
                }
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    },
);
