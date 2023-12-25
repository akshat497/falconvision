import React, { useEffect } from "react";
import { createAxiosInstance } from "./ApiInstance";

const AutoLogout = () => {
  useEffect(() => {
    const checkTokenExpiration = async () => {
      try {
        await createAxiosInstance().get(
          process.env.REACT_APP_BASE_URL + "check-expire"
        );
      } catch (error) {
      
        if (error?.response?.data?.message === "jwt expired") {
          // Token is expired, perform logout action
          logout();
        }
      }
    };

    const logout = () => {
      // Implement your logout logic here, e.g., redirect to login page
      localStorage.removeItem("token");
      window.location.reload();
    };

    // Check token expiration initially
    checkTokenExpiration();

    const expirationCheckInterval = setInterval(
      checkTokenExpiration,
      3600 * 1000
    );

    return () => {
      // Clear the interval on component unmount
      clearInterval(expirationCheckInterval);
    };
  }, []);

  return <div></div>;
};

export default AutoLogout;
