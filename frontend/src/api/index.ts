import axios from "axios";
import { UserCredentials } from "./types";

const API_URL = "http://localhost:5001/api";

// Authentication API
export const userLogin = async (credentials: UserCredentials) => {
  const response = await axios.post(`${API_URL}/auth/login`, credentials);
  return response.data;
};

// export const register = async (userData) => {
//   const response = await axios.post(`${API_URL}/auth/register`, userData);
//   return response.data;
// };

// Account Management API

// TODO: Will need to impletement this in the backend IF REQUIRED
// export const getUsers = async (token) => {
//   const response = await axios.get(`${API_URL}/users`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return response.data;
// };

// export const createUser = async (userData, token) => {
//   const response = await axios.post(`${API_URL}/users`, userData, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return response.data;
// };

// export const updateUser = async (userId, userData, token) => {
//   const response = await axios.put(`${API_URL}/users/${userId}`, userData, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return response.data;
// };

// export const deleteUser = async (userId, token) => {
//   const response = await axios.delete(`${API_URL}/users/${userId}`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return response.data;
// };

// // Audio Management API
// export const uploadAudio = async (formData, token) => {
//   const response = await axios.post(`${API_URL}/audio/upload`, formData, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "multipart/form-data",
//     },
//   });
//   return response.data;
// };

// export const getUserAudio = async (token) => {
//   const response = await axios.get(`${API_URL}/audio`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return response.data;
// };

// export const deleteAudio = async (audioId, token) => {
//   const response = await axios.delete(`${API_URL}/audio/${audioId}`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return response.data;
// };
