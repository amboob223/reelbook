import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.min.css" // this line is needed for bootstrap to work 
import { loadStripe } from '@stripe/stripe-js';




function Form() {

   const stripePromise = loadStripe("pk_test_51OwkXGIcg6QDPFRwc6N9HRWPkKBqKm5LJ0piJcfuIADDnI956XOkTy7UMKoDR5m5HN0kC3UZV68uHwmxjZLPro2300yCo7Pp59");
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

  const checkout = async()=>{
    try {
      const stripe = await stripePromise;
      const response = await fetch("http://localhost:5000/create-stripe-checkout",{
        method:"POST",
        headers:{"Content-type":"application/json"},
        body:JSON.stringify({
          items:[
            {id:1,quantity:1},
          ],
        }),
      });

      if(response.ok){
        const session = await response.json();
        const result = await stripe.redirectToCheckout({
          sessionId:session.id,

        });

        if (result.error){
          console.error(result.error.message)
        }
      }else{
        console.error("failed to make checkout")
      }
    } catch (error) {
      console.error("error handling checkout", error);
    }
  }

  

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

  const coin = async() =>{
    window.location = "https://commerce.coinbase.com/checkout/177c2a34-7566-4218-91b3-f55dec5356cc"
  
  
  }
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
        <h1>Schedule</h1>
          <Button as="a" variant='success' onClick={submitHandler}>submit</Button>{' '}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>
          <h1>Pay now</h1>
          <Button as="a" variant="warning" id="stripe" onClick={checkout}>Stripe</Button>
          <Button as="a" variant="success" id="crypto" onClick={coin}>Crypto</Button>
        </div>
      </div>
    </div>
  );
}

export default Form;
