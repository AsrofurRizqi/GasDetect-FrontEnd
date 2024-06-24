import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.kuroshop.my.id/api',
});

export const setAuthToken = (token) => {
    localStorage.setItem('token', token);
};

// auth services
export const signin = async (email, password) => {
    console.log(email, password);
    try {
        const response = await api.post('/auth/login', { email, password });
        console.log(response)
        const { token } = response.data;

        // Simpan token di localStorage
        setAuthToken(token);
        console.log("Token:", token);
        return response.data;


    } catch (error) {
        return error.response.data;
    }
};

export const register = async (name, email, password) => {
    try {
        const response = await api.post('/auth/register', { name, email, password });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const forgotPassword = async (email) => {
    try {
        const response = await api.post('/auth/forgot-password', { email });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const checkToken = async (token) => {
    try {
        const response = await api.post('/auth/check-token', { token });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

// user services
export const changeProfile = async (name, email, password) => {
    try {
        const response = await api.put('/user/profile', { name, email, password });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const changePassword = async (currentPassword, newPassword) => {
    try {
        const response = await api.put('/user/password', { currentPassword, newPassword });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const getProfile = async () => {
    try {
        const response = await api.get('/user/profile');
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

// data services
export const getData = async () => {
    try {
        const response = await api.get('/data');
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const getByDevice = async (device) => {
    try {
        const response = await api.get(`/data/${device}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const donwloadData = async () => {
    try {
        const response = await api.get('/data/download');
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

// device services
export const getUserDevices = async () => {
    try {
        const response = await api.get('/device');
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const deviceDetail = async (device) => {
    try {
        const response = await api.get(`/device/${device}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const userAddDevice = async (device) => {
    try {
        const response = await api.post('/device', { device });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const userUpdateDevice = async (device, name) => {
    try {
        const response = await api.put(`/device/${device}`, { name });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const userDeleteDevice = async (device) => {
    try {
        const response = await api.delete(`/device/${device}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

// notification services
export const getUserNotifications = async () => {
    try {
        const response = await api.get('/notification');
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};
//get no damkar /nomor/admin/damkar menggunakan auth

export const getNoDamkar = async (authToken) => {
    try {
        const response = await api.get('/nomor/admin/damkar', {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

// put no damkar /nomor/admin/damkar menggunakan auth

export const putNoDamkar = async (authToken, nomor) => {
    try {
        const response = await api.put('/nomor/admin/damkar', { nomor }, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};
