import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AuthForm from "../Components/AuthForm/AuthForm";
import Profile from "../Components/Profile/Profile";
import AddressForm from "../Components/AddressForm/AddressForm";

const Accounts = () => {
    const [address, setAddress] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);

    const path = location.pathname;
    let step = "choice";
    if (path === "/accounts/signin") step = "signin";
    else if (path === "/accounts/signup") step = "signup";
    else if (path === "/accounts/profile") step = "profile";

    // Redirect to profile page if user is already logged in and on "/accounts"
    useEffect(() => {
        if (user && path === "/accounts") {
            navigate("/accounts/profile");
        }
    }, [user, path, navigate]);

    const handleAuth = (data) => {
        navigate("/accounts/profile");
    };

    const handleAddressSave = (addr) => {
        setAddress(addr);
    };

    return (
        <div>
            {!user ? (
                <AuthForm onAuth={handleAuth} step={step} />
            ) : step === "profile" ? (
                <>
                    <Profile user={user} />
                    <AddressForm onSave={handleAddressSave} />
                    {address && (
                        <div
                            style={{
                                width: "350px",
                                margin: "0 auto",
                                marginTop: "10px",
                                padding: "10px",
                                background: "#e1f5fe",
                                borderRadius: "8px",
                            }}
                        >
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
