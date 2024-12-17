import React, { useState, useEffect } from "react";
import "../css/LogSign.css";
import { Link, useNavigate } from "react-router-dom";
import Notification from "./Notification";
import { useCookies } from "react-cookie";
import CryptoJS from "crypto-js";

const Login = () => {
    const [formData, setFormData] = useState({
        enrolmentID: "",
        password: "",
    });

    const [notification, setNotification] = useState(null);
    const [errors, setErrors] = useState({ enrolmentID: "", password: "" });
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(["bytewiseCookies", "signupStatus"]);
    const [passwordVisible, setPasswordVisible] = useState(false);

   const secretKey = process.env.REACT_APP_SECRET_KEY; // Your secret key for encryption/decryption
    const enrolmentRegex = /^0704CS(20|21|22|23|24|25|26)(1[0-2][0-9]{2}|1300)$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;

    useEffect(() => {
        if (cookies.bytewiseCookies) {
            try {
                const decryptedCookie = JSON.parse(
                    CryptoJS.AES.decrypt(
                        cookies.bytewiseCookies,
                        secretKey
                    ).toString(CryptoJS.enc.Utf8)
                );
                if (decryptedCookie.status) {
                    navigate("/");
                }
            } catch (error) {
                console.error("Failed to decrypt the cookie", error);
            }
        }
    }, [cookies, navigate]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        const updatedValue = name === "enrolmentID" ? value.toUpperCase() : value;

        setFormData({
            ...formData,
            [name]: updatedValue,
        });

        if (name === "enrolmentID") {
            setErrors((prevErrors) => ({
                ...prevErrors,
                enrolmentID: enrolmentRegex.test(updatedValue) ? "" : "Invalid enrollment number",
            }));
        }

        if (name === "password") {
            setErrors((prevErrors) => ({
                ...prevErrors,
                password: passwordRegex.test(value)
                    ? ""
                    : "Password must be at least 8 characters long and contain both letters and numbers",
            }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (errors.enrolmentID || errors.password) {
            setNotification({ message: "Please fix the errors before submitting.", type: "error" });
            return;
        }

        if (!formData.enrolmentID || !formData.password) {
            setNotification({ message: "Enrolment ID and password are required.", type: "error" });
            return;
        }

        try {
            const response = await fetch("https://bytewise-server.vercel.app/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                const cookieExpirationDate = new Date();
                cookieExpirationDate.setFullYear(cookieExpirationDate.getFullYear() + 5);

                // Encrypt bytewiseCookies data
                const encryptedBytewiseData = CryptoJS.AES.encrypt(
                    JSON.stringify({
                        enrolmentID: formData.enrolmentID,
                        name: data.user.name,
                        sem: data.user.sem,
                        phone: data.user.phone,
                        status: true,
                    }),
                    secretKey
                ).toString();

                // Encrypt signupStatus
                const encryptedSignupStatus = CryptoJS.AES.encrypt(
                    JSON.stringify("done"),
                    secretKey
                ).toString();

                // Set cookies
                setCookie("bytewiseCookies", encryptedBytewiseData, { path: "/", maxAge: 1296000 }); // 15 days
                setCookie("signupStatus", encryptedSignupStatus, {
                    path: "/",
                    expires: cookieExpirationDate, // 5 years
                });

                setNotification({ message: "Login successful!", type: "success" });
                navigate("/");
            } else {
                setNotification({
                    message: data.message || "Login failed. Please check your credentials.",
                    type: "error",
                });
            }
        } catch (error) {
            console.error("Login error:", error);
            setNotification({ message: "An error occurred. Please try again later.", type: "error" });
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible((prev) => !prev);
    };

    return (
        <div className="overlay">
            <button className="close-button" onClick={() => navigate("/")}>
                X
            </button>
            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(null)}
                />
            )}

            <div className="logSign-container">
                <div className="logSign-img-container">
                    <img src="Login.png" alt="Login" />
                </div>
                <div className="logSign-form-container">
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="enrolmentID">Enrollment Number</label>
                        {errors.enrolmentID && <p className="error-text">{errors.enrolmentID}</p>}
                        <input
                            type="text"
                            id="enrolmentID"
                            name="enrolmentID"
                            value={formData.enrolmentID}
                            onChange={handleChange}
                            placeholder="Enter your enrollment number"
                            required
                        />

                        <label htmlFor="password">Password</label>
                        {errors.password && <p className="error-text">{errors.password}</p>}
                        <div className="password-input">
                            <input
                                type={passwordVisible ? "text" : "password"}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                required
                            />
                            <button type="button" onClick={togglePasswordVisibility}>
                                {passwordVisible ? "Hide" : "Show"}
                            </button>
                        </div>

                        <button type="submit" className="login-button">
                            Login
                        </button>

                        <div className="additional-links">
                            <Link to="/forgot-password" className="forgot-password-link">
                                Forgot Password?
                            </Link>
                            <span>
                                New user? Create account -{" "}
                                <Link to="/signup" className="signup-link">
                                    Sign Up
                                </Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
