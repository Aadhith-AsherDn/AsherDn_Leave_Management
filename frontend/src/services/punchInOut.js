import api from "./api";

// Punch In
export const punchIn = async () => {
  const response = await api.post("/punch/punch-in");
  return response.data;
};

// Punch Out
export const punchOut = async () => {
  const response = await api.put("/punch/punch-out");
  return response.data;
};

// get data for punch in/out in navbar 
export const getTodayPunch = async () => {
  const response = await api.get("/punch/today");
  return response.data;
};

// get the everyday attendance for calendar
export const attendance = async (date) => {
  const response = await api.get(`/punch/attendance/${date}`);
  return response.data;
};


// get data of workhours for report

export const workhours = async (date) => {
  const response = await api.get(`/punch/workhours/${date}`);
  return response.data;
};