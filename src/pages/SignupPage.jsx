"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import "../styles/Signup.css"
import axios from "axios"


const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    email: "",
    phone: "",
    password: "",
    retypePassword: "",
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }
  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };
  const validateForm = () => {
    const newErrors = {}

    if (!formData.fullName) {
      newErrors.fullName = "Full name is required"
    }

    if (!formData.age) {
      newErrors.age = "Age is required"
    } else if (isNaN(formData.age) || Number.parseInt(formData.age) <= 0) {
      newErrors.age = "Please enter a valid age"
    }

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required"
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Please enter a valid 10-digit phone number"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    if (!formData.retypePassword) {
      newErrors.retypePassword = "Please retype your password"
    } else if (formData.password !== formData.retypePassword) {
      newErrors.retypePassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    
    // Check if password and confirm password match
    if (formData.password !== formData.retypePassword) {
      setErrors({ retypePassword: 'Passwords do not match' });
      return;
    }
    
    

    try {
      // Modified URL to use the new API endpoint
      const response = await axios.post('http://localhost:8081/api/signup', formData);
      console.log(response.data);  // Success message
      setErrors('');  // Reset the error message
      navigate('/'); // Redirect to login page after successful signup
    } catch (error) {
      setErrors({ general: error.response?.data?.error || 'Registration failed' });

    }
  };



  return (
    <div className="auth-page2">
      <div className="auth-container2">
        <div className="auth-card2">
          <div className="auth-header2">
            <h2>Create Account</h2>
            {/* <p>Join our community today!</p> */}
          </div>

          <form onSubmit={handleSubmit} className="auth-form2">
            <div className="form-group2">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={errors.fullName ? "error" : ""}
              />
              {errors.fullName && <span className="error-message2">{errors.fullName}</span>}
            </div>

          

            <div className="form-group2">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={errors.email ? "error" : ""}
              />
              {errors.email && <span className="error-message2">{errors.email}</span>}
            </div>

            <div className="form-group2">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className={errors.phone ? "error" : ""}
              />
              {errors.phone && <span className="error-message2">{errors.phone}</span>}
            </div>

            <div className="form-group2">
            <label htmlFor="password">Password</label>
            <div className="input-with-toggle">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={errors.password ? "error" : ""}
              />
              {
              formData.password && (  // Show "Show/Hide" only if there’s text
                <span className="toggle-text2" onClick={togglePasswordVisibility}>
                  {showPassword ? "Hide" : "Show"}
                </span>
              )
            }
            </div>
            {errors.password && (
              <span className="error-message2">{errors.password}</span>
            )}
          </div>

          <div className="form-group2">
          <label htmlFor="retypePassword">Retype Password</label>
          <div className="input-with-toggle2">
          <input
            type="password"
            id="retypePassword"
            name="retypePassword"
            value={formData.retypePassword}
            onChange={handleChange}
            placeholder="Retype your password"
            className={errors.retypePassword ? "error" : ""}
          />
           {
              formData.retypePassword && (  // Show "Show/Hide" only if there’s text
                <span className="toggle-text2" onClick={togglePasswordVisibility}>
                  {showPassword ? "Hide" : "Show"}
                </span>
              )
            }
            </div>
            {errors.password && (
              <span className="error-message2">{errors.password}</span>
            )}
          </div>

            <button type="submit" className="auth-button2">
              Sign Up
            </button>

            <div className="auth-footer2">
              <p>
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup
