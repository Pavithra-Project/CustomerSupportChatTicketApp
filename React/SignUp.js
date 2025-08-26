import { Container, Box, TextField, Button, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import './SignUp.css';

function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Username is required";
    else if (formData.username.length < 3) newErrors.username = "Username must be at least 3 characters";

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is not valid";

    if (!formData.password.trim()) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";

    if (!formData.confirmpassword.trim()) newErrors.confirmpassword = "Confirm Password is required";
    else if (formData.confirmpassword.length < 6) newErrors.confirmpassword = "Password must be at least 6 characters";

    if (formData.password !== formData.confirmpassword) newErrors.confirmpassword = "Password Mismatch";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post("http://localhost:8080/user/register", {
          name: formData.username,
          email: formData.email,
          password: formData.password,
          role: "Customer"
        });
        if (response.status === 200 || response.status === 201) {
          alert("SignUp Successful 🎉🎊✨");
        } else {
          alert("Failed to sign up: " + response.statusText);
        }
      } catch (error) {
        console.error(error);
        if (error.response) alert("Failed to sign up: " + error.response.data);
        else if (error.request) alert("No response from server. Please try again later.");
        else alert("Error: " + error.message);
      }
    }
  };

  return (
    <div className="signup-page-container">
      {/* Left: Form */}
      <div className="signup-form-side">
        <Container maxWidth="sm">
          <div className="signup-paper">
            <Typography className="signup-title" variant="h4">SignUp</Typography>

            <Box component="form" onSubmit={handleSubmit} className="signup-form">
              <TextField
                label="Username"
                name="username"
                variant="outlined"
                value={formData.username}
                onChange={handleChange}
                fullWidth
                className="signup-textfield"
                error={!!errors.username}
                helperText={errors.username}
              />

              <TextField
                label="Email"
                name="email"
                variant="outlined"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                className="signup-textfield"
                error={!!errors.email}
                helperText={errors.email}
              />
              <br></br>

              <TextField
                label="Password"
                type="password"
                name="password"
                variant="outlined"
                value={formData.password}
                onChange={handleChange}
                fullWidth
                className="signup-textfield"
                error={!!errors.password}
                helperText={errors.password}
              />

              <TextField
                label="Confirm Password"
                type="password"
                name="confirmpassword"
                variant="outlined"
                value={formData.confirmpassword}
                onChange={handleChange}
                fullWidth
                className="signup-textfield"
                error={!!errors.confirmpassword}
                helperText={errors.confirmpassword}
              />

              <Button type="submit" fullWidth className="signup-button">SignUp</Button>
            </Box>

            <Typography className="signup-footer">
              Already have an account? <Link to="/Login">Login</Link>
            </Typography>
          </div>
        </Container>
      </div>

      {/* Right: Background Image */}
      <div className="signup-image-side">
        <div className="signup-image-overlay">
          <div className="signup-side-text">Welcome to SupportDesk</div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
