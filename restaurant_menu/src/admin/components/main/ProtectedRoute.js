import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ Component }) {
  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("token");

    if (!token || token === null || token === undefined) {
      navigate("/login");
    }
  }, []);

  return <>{Component}</>;
}
