import axios from 'axios';
import { deleteCookie } from 'cookies-next';

const axiosInterceptorInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL, // Replace with your API base URL
});


// Response interceptor
axiosInterceptorInstance.interceptors.response.use(
    (response) => {
      // Modify the response data here  
      return response;
    },
    (error) => {
      // Handle response errors here
      console.log("Response Error interceptor: ",error);
      let message = error?.response?.data?.message
            
      if (message === 'jwt expired' ||  message === 'jwt malformed') {
          console.log(message);
          deleteCookie('token')
          localStorage.removeItem("user") 
          localStorage.removeItem("question") 
      }
      return Promise.reject(error);
    }
  );
  // End of Response interceptor
  
  export default axiosInterceptorInstance;