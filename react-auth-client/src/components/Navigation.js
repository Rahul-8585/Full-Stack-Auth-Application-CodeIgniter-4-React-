import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Navigation = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav>
            <div>
                <NavLink to="/dashboard">Dashboard</NavLink>
                <NavLink to="/teachers">Teachers Data</NavLink>
                <NavLink to="/users">Users Data</NavLink>
            </div>
            <button onClick={handleLogout}>Logout</button>
        </nav>
    );
};

export default Navigation;