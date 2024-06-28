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
export const changeProfile = async (name, email, password, authToken) => {
    try {
        const response = await api.put('/user/profile', { name, email, password ,
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const changePassword = async (currentPassword, newPassword, authToken) => {
    try {
        const response = await api.put('/user/password', { currentPassword, newPassword,
            headers: {
                Authorization: `Bearer ${authToken}`
            }
         });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const getProfile = async (authToken) => {
    try {
        const response = await api.get('/user/profile',{
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

// data services
export const getData = async (authToken) => {
    try {
        const response = await api.get('/data',{
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const getByDevice = async (device, authToken) => {
    try {
        const response = await api.get(`/data/${device}`,{
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const donwloadData = async (authToken) => {
    try {
        const response = await api.get('/data/download',{
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

// device services
export const getUserDevices = async (authToken) => {
    try {
        const response = await api.get('/device',{
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const deviceDetail = async (device,authToken) => {
    try {
        const response = await api.get(`/device/${device}`,{
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const userAddDevice = async (device, authToken) => {
    try {
        const response = await api.post('/device', { device }, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const userUpdateDevice = async (device, name, authToken) => {
    try {
        const response = await api.put(`/device/${device}`, { name }, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const userDeleteDevice = async (device, authToken) => {
    try {
        const response = await api.delete(`/device/${device}`, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

// notification services
export const getUserNotifications = async (authToken) => {
    try {
        const response = await api.get('/notification', {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
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
