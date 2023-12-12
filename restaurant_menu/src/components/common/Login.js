import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/auth/authThunks";
import { Link, useNavigate } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";
import ClientHeader from "./ClientHeader";
import Footer from "./Footer";
import ForgetPassword from "../modals/ForgetPassword";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [rememberMe, setRememberMe] = useState(false);
  const restroDetails = useSelector((state) => state.restrodetail.restro);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.login.loading);
  const response = useSelector((state) => state.login.user);
  const error = useSelector((state) => state.login.error);
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    if (email && password) {
      const body = {
        email: email,
        password: password,
      };
      if (rememberMe===true) {
        localStorage.setItem("stored crediancials", JSON.stringify(body));
      }else{
        localStorage.removeItem("stored crediancials")
      }
      dispatch(loginUser(body));
    } else {
      // Display an error message or handle the case where fields are not filled.
      toast.warn("Please fill in both email and password fields.");
    }
  };
  useEffect(() => {
    // (restroDetails)
    if (restroDetails?.role === "fenchise") {
      if (response !== null && response !== undefined) {
        navigate("/admin/");
      }
    } else {
      if (restroDetails?.role === "superadmin") {
        navigate("/superadmin/");
      }
    }
  }, [response, restroDetails]);
  useEffect(() => {
    const storedCrediancials = JSON.parse(localStorage.getItem("stored crediancials"))


    if (storedCrediancials?.email && storedCrediancials?.password) {
      setEmail(storedCrediancials?.email);
      setPassword(storedCrediancials?.password);
      setRememberMe(true);
    }
  }, []);

  return (
    <>
      {loading ? <div className="overlay"></div> : null}
      <ClientHeader />
      <ForgetPassword/>

      <div className="container d-flex flex-column justify-content-center align-items-center vh-100 ">
  <section
    className="card "
    style={{
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
      borderRadius: "10px",
      width: "70%",
      height: "auto",
      display: "flex",
    }}
  >
    <div className="row g-0 d-flex align-items-center">
      <div className="col-lg-4 d-none d-lg-flex ">
        <img
          src="https://img.freepik.com/free-vector/waiter-wearing-face-mask-serving_23-2148592573.jpg?w=740&t=st=1696666536~exp=1696667136~hmac=7179715719289404e6081cfcb7b8765d7ad8ac7729088381ae7f1d1c29ce8730"
          alt="Trendy Pants and Shoes"
          className="w-100 rounded-t-5 rounded-tr-lg-0 rounded-bl-lg-5"
          height="390vh"
        />
      </div>
      <div className="col-lg-8">
        <div className="card-body ">
          <form className="d-flex flex-column ">
            {/* Email input */}
            <div className="form-outline ">
            <label className="form-label" htmlFor="form2Example1">
                Email address
              </label>
              <input
                type="email"
                id="form2Example1"
                className="form-control"
                value={email}
                onChange={handleEmailChange}
              />
             
            </div>
            {/* Password input */}
            <div className="form-outline mb-4">
            <label className="form-label" htmlFor="form2Example2">
                Password
              </label>
              <input
                type="password"
                id="form2Example2"
                className="form-control"
                value={password}
                onChange={handlePasswordChange}
              />
              
            </div>
            {/* 2 column grid layout for inline styling */}
            <div className="d-flex justify-content-between my-3">
              <div className="">
                {/* Checkbox */}
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    defaultValue
                    id="form2Example31"
                    onChange={() => setRememberMe(!rememberMe)}
                    checked={rememberMe}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="form2Example31"
                  >
                    Remember me{" "}
                  </label>
                </div>
              </div>
              <Link
                style={{ textDecoration: "none", color: "purple" }}
                data-bs-toggle="modal"
                data-bs-target="#forgetpassword"
              >
                <div className="mt-2">Forgot password?</div>
              </Link>
            </div>
            {/* Submit button */}
            <div className="mt-4">
              <button
                type="button"
                className="btn btn-primary btn-block mb-4"
                style={{ backgroundColor: "purple", borderRadius: "10px" }}
                onClick={handleLogin}
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>
          {/* {error !== null && (
            <div
              className="alert alert-danger mx-1"
              role="alert"
              id="alertBox"
            >
              <b className="mr-4">
                <FaExclamationTriangle /> Error:{" "}
                {error?.response?.data?.message}
              </b>
            </div>
          )} */}
        </div>
      </div>
    </div>
  </section>
</div>

      <Footer/>
    </>
  );
}
