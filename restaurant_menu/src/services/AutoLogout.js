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
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("tokenExpirationTimer");
      window.location.reload();
    };

    const startTokenExpirationTimer = () => {
      // Set the expiration timer in both local and session storage
      const expirationTimer = setTimeout(logout, 3600 * 1000);
      sessionStorage.setItem("tokenExpirationTimer", expirationTimer.toString());
    };

    // Check if there is an existing expiration timer in session storage
    const existingTimer = sessionStorage.getItem("tokenExpirationTimer");

    if (existingTimer) {
      // If there is an existing timer, clear it to prevent duplication
      clearTimeout(parseInt(existingTimer, 10));
    }

    // Start the expiration timer initially
    startTokenExpirationTimer();

    // Set an interval to update the expiration timer in case of window closure
    const updateExpirationTimerInterval = setInterval(
      startTokenExpirationTimer,
      60000 // Update every minute
    );

    // Perform the initial check for token expiration
    checkTokenExpiration();

    return () => {
      // Clear the interval and expiration timer on component unmount
      clearInterval(updateExpirationTimerInterval);
      clearTimeout(parseInt(sessionStorage.getItem("tokenExpirationTimer"), 10));
      sessionStorage.removeItem("tokenExpirationTimer");
    };
  }, []);

  return <div></div>;
};

export default AutoLogout;
