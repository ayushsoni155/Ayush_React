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
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState(null);
    const [errors, setErrors] = useState({ enrolmentID: "", password: "" });
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(["bytewiseCookies", "signupStatus"]);
    const [passwordVisible, setPasswordVisible] = useState(false);

    const secretKey = process.env.REACT_APP_SECRET_KEY; // Secret key for encryption/decryption
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
    }, [cookies, navigate, secretKey]);

    const handleChange = (event) => {
    const { name, value } = event.target;
    const updatedValue = name === "enrolmentID" ? value.toUpperCase().trim() : value.trim();

    setFormData({
        ...formData,
        [name]: updatedValue,
    });

    if (name === "enrolmentID") {
        const isValidEnrolment = enrolmentRegex.test(updatedValue);
        setErrors((prevErrors) => ({
            ...prevErrors,
            enrolmentID: isValidEnrolment ? "" : "Invalid enrollment number",
        }));

        if (!isValidEnrolment && navigator.vibrate) {
            navigator.vibrate([100, 50, 100]); // Vibration pattern
        }
    }

    if (name === "password") {
        const isValidPassword = passwordRegex.test(value);
        setErrors((prevErrors) => ({
            ...prevErrors,
            password: isValidPassword
                ? ""
                : "Password must be at least 8 characters long and contain both letters and numbers",
        }));

        if (!isValidPassword && navigator.vibrate) {
            navigator.vibrate([100, 50, 100]); // Vibration pattern
        }
    }
};


    const handleSubmit = async (event) => {

        event.preventDefault();
        setLoading(true);

        if (!formData.enrolmentID) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                enrolmentID: "Enrollment ID is required",
            }));
            setLoading(false);
            return;
        }

        if (!formData.password) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                password: "Password is required",
            }));
            setLoading(false);
            return;
        }

        if (errors.enrolmentID || errors.password) {
            setNotification({ message: "Please fix the errors before submitting.", type: "error" });
            setLoading(false);
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

                const encryptedSignupStatus = CryptoJS.AES.encrypt(
                    JSON.stringify("done"),
                    secretKey
                ).toString();

                setCookie("bytewiseCookies", encryptedBytewiseData, { path: "/", maxAge: 1296000 });
                setCookie("signupStatus", encryptedSignupStatus, {
                    path: "/",
                    expires: cookieExpirationDate,
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

        setLoading(false);
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
    {/* Enrollment Number */}
    <label
        htmlFor="enrolmentID"
        className={errors.enrolmentID ? "label-error" : ""}
    >
        Enrollment Number
    </label>
    <input
        type="text"
        id="enrolmentID"
        name="enrolmentID"
        value={formData.enrolmentID}
        onChange={handleChange}
        placeholder="Enter your enrollment number"
        className={errors.enrolmentID ? "input-error" : ""}
    />
    {errors.enrolmentID && <p className="error-text">{errors.enrolmentID}</p>}

    {/* Password */}
    <label
        htmlFor="password"
        className={errors.password ? "label-error" : ""}
    >
        Password
    </label>
    <div className="password-input">
        <input
            type={passwordVisible ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className={errors.password ? "input-error" : "passwordInput"}
        />
        <button
            type="button"
            className={errors.password ? "errorpassword-toggle" : "password-toggle"}
            onClick={togglePasswordVisibility}
        >
            {passwordVisible ? "Hide" : "Show"}
        </button>
    </div>
    {errors.password && <p className="error-text">{errors.password}</p>}

    {/* Submit Button */}
    {loading ? (
        <div className="Loginloading"></div>
    ) : (
        <button type="submit" className="login-button">
            Login
        </button>
    )}

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
