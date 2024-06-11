import React, { useState } from 'react';

const ShedRegistration = () => {
  const [shedData, setShedData] = useState({
    shedName: '',
    location: '',
    capacity: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShedData({ ...shedData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Your form submission logic here
    console.log(shedData);
  };

  return (
    <div>
      <h2>Shed Registration</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="shedName">Shed Name:</label>
        <input type="text" id="shedName" name="shedName" value={shedData.shedName} onChange={handleChange} />

        <label htmlFor="location">Location:</label>
        <input type="text" id="location" name="location" value={shedData.location} onChange={handleChange} />

        <label htmlFor="capacity">Capacity:</label>
        <input type="number" id="capacity" name="capacity" value={shedData.capacity} onChange={handleChange} />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ShedRegistration;
