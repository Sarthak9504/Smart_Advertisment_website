import React, { useState } from "react";
import "./AuthForm.css";

const AuthForm = ({ onAuth }) => {
    const [step, setStep] = useState("choice"); // "signin" or "signup"
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = () => {
        onAuth({ email, password });
    };

    if (step === "choice") {
        return (
            <div className="auth-form">
                <h2>Welcome!</h2>
                <button onClick={() => setStep("signin")}>Sign In</button>
                <button onClick={() => setStep("signup")}>Create Account</button>
            </div>
        );
    }

    return (
        <div className="auth-form">
            <h2>{step === "signin" ? "Sign In" : "Create Account"}</h2>
            <input
                type="text"
                placeholder="Email or Mobile Number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleSubmit}>{step === "signin" ? "Login" : "Sign Up"}</button>
        </div>
    );
};

export default AuthForm;
