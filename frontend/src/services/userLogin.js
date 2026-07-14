import api  from "./api";

export const userLogin = async(userData)=>{
    const response = await api.post("/users/", userData);
    return response.data;
};

export const userSign = async(userData)=>{
    const response = await api.post("/users/register", userData);
    return response.data;
};

export const userForgetPassword = async(userData)=>{
    const response = await api.post("/users/forget-password", userData);
    return response.data;
};

export const allUserInDB = async()=>{
    const response = await api.get("/users/allUser");
    return response.data;
};