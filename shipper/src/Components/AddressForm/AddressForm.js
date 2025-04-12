import React, { useState } from "react";
import "./AddressForm.css";

const AddressForm = ({ onSave }) => {
    const [address, setAddress] = useState("");

    const handleSubmit = () => {
        onSave(address);
        setAddress("");
    };

    return (
        <div className="address-form">
            <h3>Add Delivery Address</h3>
            <textarea
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            ></textarea>
            <button onClick={handleSubmit}>Save Address</button>
        </div>
    );
};

export default AddressForm;
