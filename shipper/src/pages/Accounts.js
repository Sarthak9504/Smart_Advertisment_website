import React, { useState } from "react";
import AuthForm from "../Components/AuthForm/AuthForm";
import Profile from "../Components/Profile/Profile";
import AddressForm from "../Components/AddressForm/AddressForm";

const Accounts = () => {
    const [user, setUser] = useState(null);
    const [address, setAddress] = useState("");

    const handleAuth = (data) => {
        setUser({ email: data.email });
    };

    const handleAddressSave = (addr) => {
        setAddress(addr);
    };

    return (
        <div>
            {!user ? (
                <AuthForm onAuth={handleAuth} />
            ) : (
                <>
                    <Profile user={user} />
                    <AddressForm onSave={handleAddressSave} />
                    {address && (
                        <div style={{ width: "350px", margin: "0 auto", marginTop: "10px", padding: "10px", background: "#e1f5fe", borderRadius: "8px" }}>
                            <h4>Saved Address:</h4>
                            <p>{address}</p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Accounts;
