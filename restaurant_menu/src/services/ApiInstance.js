import axios from "axios";


export const createAxiosInstance = () => {
  const token = localStorage.getItem('token');
  return axios.create({
    headers: {
      'Authorization': `${token}`,
    },
  });
};