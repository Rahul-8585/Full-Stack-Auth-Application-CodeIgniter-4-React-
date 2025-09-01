import React from 'react';
import Navigation from '../components/Navigation';

const Dashboard = () => {
    return (
        <div>
            <Navigation />
            <div className="page-container">
                <h1>Welcome to the Dashboard</h1>
                <p>You are successfully logged in.</p>
                <p>Use the navigation bar to view the datatables for Teachers and Users.</p>
            </div>
        </div>
    );
};

export default Dashboard;