import api  from "./api";

export const userLogin = async(userData) =>{
    const response = await api.post("/users/",userData);
    return response.userData;
};

export const userSign = async(userData) =>{
    const response = await api.post("/users/register",userData);
    return response.userData;
};

export const userForgetPassword = async(userData) =>{
    const response = await api.post("/users/forget-password",userData);
    return response.userData;
};