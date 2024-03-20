import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.min.css" // this line is needed for bootstrap to work 
function Form() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    description: '',
    date: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const submitHandler = async () => {
    try {
      // Here you should send the formData to the server using fetch or another method
      const data = await fetch("http://localhost:5000/reelbook", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!data.ok) {
        throw new Error('Failed to submit form');
      }

      // Clear form fields
      setFormData({
        name: '',
        email: '',
        phone: '',
        description: '',
        date: '' // Reset date field
      });
      
      alert("Submitted successfully. We will contact you to confirm.");
      console.log(formData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Schedule a shoot</h1>
      <form style={{ display: "flex", flexDirection: "column" }}>
        <input id="name" value={formData.name} onChange={handleChange} placeholder="Name" style={{ marginBottom: "10px" }} />
        <input id="email" value={formData.email} onChange={handleChange} placeholder="Email" style={{ marginBottom: "10px" }} />
        <input id="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" style={{ marginBottom: "10px" }} />
        <input type="date" id="date" value={formData.date} onChange={handleChange} placeholder="Date" style={{ marginBottom: "10px" }} />
        <textarea id="description" value={formData.description} onChange={handleChange} placeholder="Shoot description"></textarea>
      </form>
          <Button as="a" variant='success' onClick={submitHandler}>submit</Button>{' '}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>
          <h1>Or Pay now</h1>
          <button id="stripe">Stripe</button>
          <button id="crypto">Crypto</button>
        </div>
      </div>
    </div>
  );
}

export default Form;
