import axios from 'axios';
import { useLocalStorage } from './useLocalStorage';
import { API_ENDPOINT, MAX_RETRIES } from '../constant';

const axiosInstance = axios.create({
  baseURL: 'https://api.audioshots.app',
});

let retryCount = 0;

axiosInstance.interceptors.request.use((req) => {
  const token = JSON.parse(localStorage.getItem('token'));
  const refreshToken = JSON.parse(localStorage.getItem('refreshToken'));

  req.headers = {
    ...req.headers,
    Authorization: `Bearer ${
      req && req.url?.includes(`refresh`) ? `${refreshToken}` : `${token}`
    }`,
  };

  return req;
});

async function getRefreshToken() {
  try {
    const response = await axiosInstance.get(API_ENDPOINT.REFRESH_TOKEN);

    const { accessToken, refreshToken } = response.data;

    return { accessToken, refreshToken };
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error;
  }
}

axiosInstance.interceptors.response.use(
  async (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      retryCount < MAX_RETRIES &&
      error.response.config.url &&
      !error.response.config.url.includes('login')
    ) {
      retryCount++;
      try {
        const { accessToken, refreshToken } = await getRefreshToken();
        useLocalStorage('token', accessToken);
        useLocalStorage('refreshToken', refreshToken);
        if (originalRequest?.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }
        return originalRequest ? axiosInstance(originalRequest) : Promise.reject('Original request is null or undefined');

      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError);
        return Promise.reject(refreshError);
      }
    } else {
      if (retryCount >= MAX_RETRIES) {
        
        return Promise.reject('Max retries reached, user logged out');
      }
      return Promise.reject(
        (error.response && error.response.data) || 'Something went wrong',
      );
    }
  },
);

export default axiosInstance;
