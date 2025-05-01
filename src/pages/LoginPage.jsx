"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "../styles/login.css"
import axios from "axios"

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    try {
      // Modified URL to use the new API endpoint
      const response = await axios.post("http://localhost:8081/api/login", {
        email: formData.email,
        password: formData.password,
      })

      // Simple login success handling
      if (response.data.token) {
        // Store token
        localStorage.setItem("token", response.data.token)
        // Set logged in flag
        localStorage.setItem("isLoggedIn", "true")
        // Redirect to home page
        navigate("/")
      } else {
        setErrors({ general: "Login failed: Invalid response" })
      }
    } catch (err) {
      setErrors({ general: "Login failed. Please check your credentials." })
    }
  }

  return (
    <div className="auth-page1">
      <div className="auth-container1">
        <div className="auth-card1">
          <div className="auth-header1">
            <h2>DIALLOCK.AI</h2>
          </div>

          <form onSubmit={handleSubmit} className="auth-form1">
            {errors.general && <div className="error-message">{errors.general}</div>}

            <div className="form-group1">
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
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group1">
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
                {formData.password && (
                  <span className="toggle-text" onClick={togglePasswordVisibility}>
                    {showPassword ? "Hide" : "Show"}
                  </span>
                )}
              </div>
              {errors.password && <span className="error-message1">{errors.password}</span>}
            </div>

            <div className="forgot-password1">
              <a >Forgot Password?</a>
            </div>

            <button type="submit" className="auth-button1">
              Login
            </button>

            <div className="auth-footer1">
              <p>
                Don't have an account? <Link to="/signup">Sign Up</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
