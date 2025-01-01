import axios from 'axios';

import { URL } from '@/lib/constants';

import { getAuthHeaders } from '../auth/AuthHelper';

// Axios instance
const axiosInstance = axios.create({
  baseURL: URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 saniye timeout
});

// GET
export const get = async (endpoint: string) => {
  try {
    const response = await axiosInstance.get(endpoint, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// POST
export const post = async (endpoint: string, data?: object | null) => {
  try {
    const response = await axiosInstance.post(endpoint, data, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// PATCH
export const patch = async (endpoint: string, data?: object | null) => {
  try {
    const response = await axiosInstance.patch(endpoint, data, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// DELETE
export const remove = async (endpoint: string) => {
  try {
    const response = await axiosInstance.delete(endpoint, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Hata Yönetimi
const handleError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      console.error(
        `API Error: ${error.response.status} - ${error.response.data}`
      );
      throw new Error(error.response.data.message || "An error occurred");
    }
    if (error.request) {
      console.error("No response received from API");
      throw new Error("No response received from API");
    }
  }

  // Axios dışındaki hatalar (örneğin, kod hataları)
  console.error("Error during API call:", (error as Error).message);
  throw new Error((error as Error).message);
};
