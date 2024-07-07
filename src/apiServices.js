import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.kuroshop.my.id/api',
});

export const setAuthToken = (token, role) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
};

// auth services
export const signin = async (email, password) => {
    try {
        const response = await api.post('/auth/login', { email, password });
        const { token, role } = response.data;

        setAuthToken(token, role);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const register = async (name, email, password, repassword) => {
    try {
        const response = await api.post('/auth/register', { nama: name, email, password, repassword });
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
        const response = await api.get('/auth/token-check', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

// user services
export const changeProfile = async (authToken, updateData) => {
    try {
        const response = await api.put('/user/update', updateData , {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const changePassword = async (authToken, oldpassword, newpassword, renewpassword) => {
    try {
        const response = await api.post('/auth/user-change-password', { oldpassword, newpassword, renewpassword }, {
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
        const response = await api.get('/user/profiles',{
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

export const getDataByDevice = async (device, authToken) => {
    try {
        const response = await api.get(`/data/device/${device}`,{
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const downloadData = async (authToken) => {
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

export const getDataGroupLocation = async (authToken) => {
    try {
        const response = await api.get('/data/location',{
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
        const response = await api.post('/device', { device_name: device }, {
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
        const response = await api.put(`/device/${device}`, { device_name: name }, {
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
        const response = await api.get('/notif', {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const downloadUserNotif = async (authToken) => {
    try {
        const response = await api.get('/notif/download-report', {
            headers: {
                Authorization: `Bearer ${authToken}`
            },
            responseType: 'blob'
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const getUserNomor = async (authToken) => {
    try {
        const response = await api.get('/nomor', {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const userUpdateNumber = async (data , authToken) => {
    try {
        const response = await api.put('/nomor', data, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

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
//admin get all users /user/admin
export const adminGetUsers = async (authToken) => {
    try {
        const response = await api.get('/user/admin', {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

// admin post crete user /user/admin
//await adminCreateUser(formData, authToken);
export const adminCreateUser = async (formData, authToken) => {
    try {
        const response = await api.post('/user/admin', formData, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

//veryfy user use form user_id /user/admin/activate
export const adminVerifyUser = async (authToken, user_id) => {
    console.log("id", user_id);
    console.log(authToken);
    try {
        const response = await api.post('/user/admin/activate', { user_id }, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
        console.log(response);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

//deactivate
export const adminDeactivateUser = async (user_id, authToken) => {
    console.log(user_id);
    
    try {
        const response = await api.post('/user/admin/deactivate', { user_id }, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}
// delet user /user/admin/{id}
export const adminDeleteUser = async (id, authToken) => {
    try {
        const response = await api.delete(`/user/admin/${id}`, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

// put user /user/admin/{id}
export const adminUpdateUser = async (id, formData, authToken) => {
    try {
        const response = await api.put(`/user/admin/${id}`, formData, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

// get all device /device/admin
export const adminGetDevices = async (authToken) => {
    try {
        const response = await api.get('/device/admin', {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

// get all reports /report/admin
export const adminGetReports = async (authToken) => {
    try {
        const response = await api.get('/notif/admin', {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}