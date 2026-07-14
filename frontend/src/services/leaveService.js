import api from "./api";

export const applyLeave = async (data) => {
  const response = await api.post("/leave/apply", data);
  return response;
};

export const leaveStatus = async (id, status) => {
  const response = await api.put(`/leave/status/${id}`, { status });
  return response;
};

export const approveLeave = async (id) => {
  const response = await api.put(`/leave/approve/${id}`);
  return response;
};

export const rejectLeave = async (id) => {
  const response = await api.put(`/leave/reject/${id}`);
  return response;
};

export const getAllLeaves = async () => {
  const response = await api.get("/leave");
  return response;
};