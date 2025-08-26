

// import React, { useState } from "react";
// import { Box, TextField, Button, Typography, Paper } from "@mui/material";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./Login.css";

// export default function Login() {
//   const [formData, setFormData] = useState({ userEmail: "", userPassword: "" });
//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.userEmail.trim()) newErrors.userEmail = "Email is required";
//     else if (!/\S+@\S+\.\S+/.test(formData.userEmail))
//       newErrors.userEmail = "Email is not valid";

//     if (!formData.userPassword.trim()) newErrors.userPassword = "Password is required";
//     else if (formData.userPassword.length < 6)
//       newErrors.userPassword = "Password must be at least 6 characters";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   if (!validateForm()) return;

//   //   try {
//   //     const res = await axios.post("http://localhost:8080/user/login", {
//   //       email: formData.userEmail,
//   //       password: formData.userPassword,
//   //     });

//   //     // store full user object in localStorage
//   //     localStorage.setItem("user", JSON.stringify(res.data));

//   //     // navigate to dashboard
//   //     navigate("/CustomerDashboard");
//   //   } catch (err) {
//   //     alert(err.response?.data || "Login failed");
//   //   }
//   // };
// //   const handleSubmit = async (e) => {
// //   e.preventDefault();
// //   if (!validateForm()) return;

// //   try {
// //     const res = await axios.post("http://localhost:8080/user/login", {
// //       email: formData.userEmail,
// //       password: formData.userPassword,
// //     });

// //     // ✅ Save token + user info
// //     localStorage.setItem("token", res.data.token);
// //     localStorage.setItem("user", JSON.stringify(res.data));

// //     navigate("/CustomerDashboard");
// //   } catch (err) {
// //     alert(err.response?.data?.message || "Login failed");
// //   }
// // };

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   if (!validateForm()) return;

//   try {
//     console.log("Sending login request with:", {
//       email: formData.userEmail,
//       password: formData.userPassword
//     });

//     const res = await axios.post("http://localhost:8080/user/login", {
//       email: formData.userEmail,
//       password: formData.userPassword
//     }, {
//       withCredentials: true // ← ADD THIS LINE
//     });

//     console.log("Login response:", res.data);
    
//     // ✅ Save token + user info
//     localStorage.setItem("token", res.data.token);
//     localStorage.setItem("user", JSON.stringify(res.data));

//     navigate("/CustomerDashboard");
//   } catch (err) {
//     console.error("Login error details:", err);
//     console.error("Error response:", err.response);
    
//     if (err.response?.data) {
//       alert(err.response.data.message || "Login failed");
//     } else {
//       alert("Network error or server not responding");
//     }
//   }
// };

//   return (
//     <div className="log">
//     <div className="login-page-container">
//       <div className="login-form-side">
//         <Paper
//           elevation={6}
//           sx={{
//             padding: 5,
//             borderRadius: 5,
//             background: "rgba(255, 255, 255, 0.85)",
//             backdropFilter: "blur(10px)",
//             width: "90%",
//             maxWidth: 400,
//           }}
//         >
//           <Typography
//             variant="h4"
//             sx={{ textAlign: "center", marginBottom: 4, fontWeight: "bold", color: "#2980b9" }}
//           >
//             Login
//           </Typography>

//           <Box
//             component="form"
//             onSubmit={handleSubmit}
//             autoComplete="off"
//             sx={{ display: "flex", flexDirection: "column", gap: 3 }}
//           >
//             <TextField
//               label="Email"
//               name="userEmail"
//               variant="outlined"
//               value={formData.userEmail}
//               onChange={handleChange}
//               error={!!errors.userEmail}
//               helperText={errors.userEmail}
//               fullWidth
//               autoComplete="off"
//               inputProps={{ autoComplete: "new-email" }}
//             />

//             <TextField
//               label="Password"
//               type="password"
//               name="userPassword"
//               variant="outlined"
//               value={formData.userPassword}
//               onChange={handleChange}
//               error={!!errors.userPassword}
//               helperText={errors.userPassword}
//               fullWidth
//               autoComplete="off"
//               inputProps={{ autoComplete: "new-password" }}
//             />

//             <Button
//               type="submit"
//               variant="contained"
//               fullWidth
//               sx={{
//                 background: "linear-gradient(135deg, #2980b9, #3498db)",
//                 fontWeight: "bold",
//                 "&:hover": { background: "linear-gradient(135deg, #3498db, #2980b9)" },
//               }}
//             >
//               Login
//             </Button>
//           </Box>

//           <Typography sx={{ textAlign: "center", marginTop: 2 }}>
//             Don't have an account?{" "}
//             <Link
//               to="/SignUp"
//               style={{ color: "#2980b9", fontWeight: "bold", textDecoration: "none" }}
//             >
//               Sign Up
//             </Link>
//           </Typography>
//         </Paper>
//       </div>

//       <div className="login-image-side">
//         <div className="login-image-overlay">
//           <Typography variant="h3" className="login-side-text">
//             Welcome to SupportDesk
//           </Typography>
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// }


import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

// Configure axios defaults
axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.withCredentials = true;

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is not valid";

    if (!formData.password.trim()) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    
    try {
      console.log("Sending login request to:", `${axios.defaults.baseURL}/user/login`);
      console.log("Request data:", formData);

      const res = await axios.post("/user/login", formData);

      console.log("Login successful! Response:", res.data);
      
     
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data));
        
       
        const role = res.data.role;
        if (role === "Admin") {
          navigate("/AdminDashboard");
        } else if (role === "Agent") {
          navigate("/AgentDashboard");
        } else {
          navigate("/CustomerDashboard");
        }
      } else {
        alert("No authentication token received");
      }
    } catch (err) {
      console.error("Login error details:", err);
      
      if (err.response) {
        // Server responded with error status
        console.error("Error response data:", err.response.data);
        console.error("Error status:", err.response.status);
        console.error("Error headers:", err.response.headers);
        
        alert(err.response.data?.message || `Login failed: ${err.response.status}`);
      } else if (err.request) {
        // Request was made but no response received
        console.error("No response received:", err.request);
        alert("Network error: Could not connect to the server. Please check if the backend is running.");
      } else {
        // Other errors
        console.error("Error message:", err.message);
        alert("An unexpected error occurred: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="log">
      <div className="login-page-container">
        <div className="login-form-side">
          <Paper
            elevation={6}
            sx={{
              padding: 5,
              borderRadius: 5,
              background: "rgba(255, 255, 255, 0.85)",
              backdropFilter: "blur(10px)",
              width: "90%",
              maxWidth: 400,
            }}
          >
            <Typography
              variant="h4"
              sx={{ textAlign: "center", marginBottom: 4, fontWeight: "bold", color: "#2980b9" }}
            >
              Login
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit}
              autoComplete="off"
              sx={{ display: "flex", flexDirection: "column", gap: 3 }}
            >
               <input type="text" name="fake_email" autoComplete="username" style={{ display: "none" }} />
  <input type="password" name="fake_password" autoComplete="new-password" style={{ display: "none" }} />
              <TextField
                label="Email"
                name="email"
                variant="outlined"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                fullWidth
                disabled={loading}
              />

              <TextField
                label="Password"
                type="password"
                name="password"
                variant="outlined"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                fullWidth
                disabled={loading}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                sx={{
                  background: "linear-gradient(135deg, #2980b9, #3498db)",
                  fontWeight: "bold",
                  "&:hover": { background: "linear-gradient(135deg, #3498db, #2980b9)" },
                }}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </Box>

            <Typography sx={{ textAlign: "center", marginTop: 2 }}>
              Don't have an account?{" "}
              <Link
                to="/SignUp"
                style={{ color: "#2980b9", fontWeight: "bold", textDecoration: "none" }}
              >
                Sign Up
              </Link>
            </Typography>
          </Paper>
        </div>

        <div className="login-image-side">
          <div className="login-image-overlay">
            <Typography variant="h3" className="login-side-text">
              Welcome to SupportDesk
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
