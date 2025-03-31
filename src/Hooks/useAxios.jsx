import axios from "axios"

// Create an axios instance with baseURL
export const axiosInstance = axios.create({
  // baseURL: "http://localhost:5000",
  baseURL: "https://snowfye-server-production.up.railway.app",
})

const useAxios = () => {
  return axiosInstance
}

export default useAxios

