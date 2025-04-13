import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthForm.css";

const AuthForm = ({ onAuth, step }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const endpoint = step === "signin" ? "/api/auth/login" : "/api/auth/signup";

        try {
            const res = await fetch(`http://localhost:5000${endpoint}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Something went wrong");
                return;
            }

            onAuth({ email: data.email });
        } catch (err) {
            alert("Network error");
            console.error(err);
        }
    };


    if (step === "choice") {
        return (
            <div className="auth-form">
                <h2>Welcome!</h2>
                <button onClick={() => navigate("/accounts/signin")}>Sign In</button>
                <button onClick={() => navigate("/accounts/signup")}>Create Account</button>
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
            <button onClick={handleSubmit}>
                {step === "signin" ? "Login" : "Sign Up"}
            </button>
        </div>
    );
};

export default AuthForm;
