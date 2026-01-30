// Axios client for API requests
import axios from 'axios';

// services
import { getDeviceId } from '../services/deviceId';

const api = axios.create({ baseURL: '/api', withCredentials: true });
const deviceId = getDeviceId();


// We set this from the AuthContext whenever the token changes
let memoryToken: string | null = null;

export const setHeaderToken = (token: string | null) => {
  memoryToken = token;
};

api.interceptors.request.use((config) => {

  config.headers["x-device-id"] = deviceId;

  if (memoryToken) {
    config.headers.Authorization = `Bearer ${memoryToken}`;
  }
  return config;
});

api.interceptors.response.use(
    (response) => {
        memoryToken = response.headers.authorization?.split(" ")[1];
        
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default api;
export { memoryToken };