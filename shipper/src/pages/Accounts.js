import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthForm from "../Components/AuthForm/AuthForm";
import Profile from "../Components/Profile/Profile";
import AddressForm from "../Components/AddressForm/AddressForm";

const Accounts = () => {
    const [user, setUser] = useState(null);
    const [address, setAddress] = useState("");
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const checkToken = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/auth/verify-token", {
                    method: "GET",
                    credentials: "include",
                });

                if (res.ok) {
                    const data = await res.json();
                    setUser({ email: data.email });
                    navigate("/accounts/profile");
                }
            } catch (err) {
                console.log("Token verification failed", err);
            }
        };

        checkToken();
    }, [navigate]);

    const handleAuth = (data) => {
        setUser({ email: data.email });
        navigate("/accounts/profile");
    };

    const handleAddressSave = (addr) => {
        setAddress(addr);
    };

    const path = location.pathname;
    let step = "choice";
    if (path === "/accounts/signin") step = "signin";
    else if (path === "/accounts/signup") step = "signup";
    else if (path === "/accounts/profile") step = "profile";

    return (
        <div>
            {!user ? (
                <AuthForm onAuth={handleAuth} step={step} />
            ) : step === "profile" ? (
                <>
                    <Profile user={user} />
                    <AddressForm onSave={handleAddressSave} />
                    {address && (
                        <div style={{
                            width: "350px",
                            margin: "0 auto",
                            marginTop: "10px",
                            padding: "10px",
                            background: "#e1f5fe",
                            borderRadius: "8px"
                        }}>
                            <h4>Saved Address:</h4>
                            <p>{address}</p>
                        </div>
                    )}
                </>
            ) : null}
        </div>
    );
};

export default Accounts;
