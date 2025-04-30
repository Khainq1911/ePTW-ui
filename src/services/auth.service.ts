import { FormDataDto } from '../types/auth.type';
import { instances } from '../configs/axios.config';

const loginService = async (loginDto: FormDataDto) => {
    const res = await instances.post('/auth/login', loginDto);
    return res.data;
};

const registerService = async (registerDto: FormDataDto) => {
    const res = await instances.post('/auth/register', registerDto);
    return res.data;
};

const listUserByRole = async (roleId: number) => {
    const res = await instances.get(`/user/role/${roleId}`);
    return res.data;
};

const totalUserService = async () => {
    const res = await instances.get('/user');
    return res.data;
};
export { totalUserService, loginService, registerService, listUserByRole };
