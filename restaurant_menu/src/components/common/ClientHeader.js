import React from "react";
import { FaEarlybirds, FaKiwiBird, FaUtensils } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

export default function ClientHeader() {
  const { pathname } = useLocation();
  return (
    <div style={{ marginBottom: "4%" }}>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <div className="logo-container">
            <div className="icon-container">
              <FaUtensils className="icon" />
            </div>
            <div className="text-container">Smart_Dine</div>
          </div>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={pathname === "/faq" ? "nav-link " : "nav-link"}
                  style={{ color: pathname === "/faq" ? "purple" : "" }}
                  to="/faq"
                >
                  FAQ
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={pathname === "/" ? "nav-link " : "nav-link"}
                  style={{ color: pathname === "/" ? "purple" : "" }}
                  to="/"
                >
                  About Us
                </Link>
              </li>{" "}
              <li className="nav-item">
                <Link
                  className={
                    pathname === "/contactus" ? "nav-link " : "nav-link"
                  }
                  style={{ color: pathname === "/contactus" ? "purple" : "" }}
                  to="/contactus"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link
                  className={pathname === "/login" ? "nav-link " : "nav-link"}
                  style={{ color: pathname === "/login" ? "purple" : "" }}
                  to="/login"
                >
                  Sign In
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={pathname === "/signup" ? "nav-link " : "nav-link"}
                  style={{ color: pathname === "/signup" ? "purple" : "" }}
                  to="/signup"
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
