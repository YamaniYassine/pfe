import React, { useState } from "react";
import { toast } from 'react-toastify';
import "../SignUp.css";
// import axios from 'axios';

function SignUpForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [response, setResponse] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await fetch("http://localhost:3001/user/signup", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
      if (data.error) {
        setResponse(data.error);
        toast.error(data.error)
      } else {
        setResponse(data.message);
        toast.success("Success");
     }
    // const data = await res.json();
    // console.log(data,);
    // setResponse(data.message);
    // toast.success(data.error);
  };
  
  

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-field">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(event) =>
            setFormData({ ...formData, name: event.target.value })
          }
        />
      </div>
      <div className="form-field">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(event) =>
            setFormData({ ...formData, email: event.target.value })
          }
        />
      </div>
      <div className="form-field">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={formData.password}
          onChange={(event) =>
            setFormData({ ...formData, password: event.target.value })
          }
        />
      </div>
      <button type="submit" className="form-submit">Submit</button>
      {response && <p>{response}</p>}
    </form>
  );
}

export default SignUpForm;
