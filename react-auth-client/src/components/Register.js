import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/api';

const Register = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        university_name: '',
        gender: 'Male',
        year_joined: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            await registerUser(formData);
            setSuccess('Registration successful! Redirecting to login...');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err) {
            const errors = err.response?.data?.messages;
            if (errors) {
                setError(Object.values(errors).join(', '));
            } else {
                setError('Registration failed. Please try again.');
            }
            console.error(err);
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2>Register</h2>
                {error && <p className="error-message">{error}</p>}
                {success && <p style={{color: 'green'}}>{success}</p>}
                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" name="first_name" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" name="last_name" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" minLength="8" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>University Name</label>
                    <input type="text" name="university_name" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Gender</label>
                    <select name="gender" value={formData.gender} onChange={handleChange}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Year Joined</label>
                    <input type="number" name="year_joined" placeholder="YYYY" onChange={handleChange} required />
                </div>
                <button type="submit" className="auth-button">Register</button>
                <p className="auth-link">
                    Already have an account? <Link to="/login">Login here</Link>
                </p>
            </form>
        </div>
    );
};

export default Register;