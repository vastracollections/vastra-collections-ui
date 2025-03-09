import React from "react";

const AddressForm = () => {
  return (
    <div className="address-form">
      <h2>CONTACT PERSON</h2>
      <input type="text" placeholder="Eg: John Doe" required />
      <input type="tel" placeholder="9999-99-9999" required />
      <input type="email" placeholder="Eg: example@example.com" required />

      <h2>ADDRESS DETAILS</h2>
      <input type="text" placeholder="Eg:  1746, 1st Main Rd, North Vijay Nagar, Govindaraja" required />
      <select>
        <option>--Choose Country--</option>
      </select>
      <select>
        <option>--Choose Province--</option>
      </select>
      <input type="text" placeholder="PIN Code" />
    </div>
  );
};

export default AddressForm;
