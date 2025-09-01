import React, { useState, useEffect } from 'react';
import MUIDataTable from 'mui-datatables';
import { fetchUsers } from '../services/api';
import Navigation from '../components/Navigation';

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await fetchUsers();
                setUsers(response.data);
            } catch (error) {
                setError("Failed to fetch users data. You might be logged out.");
                console.error("Failed to fetch users", error);
            }
        };
        getUsers();
    }, []);

    const columns = [
        { name: "id", label: "ID" },
        { name: "first_name", label: "First Name" },
        { name: "last_name", label: "Last Name" },
        { name: "email", label: "Email" },
        { name: "created_at", label: "Date Registered" },
    ];
    
    const options = {
        filterType: 'checkbox',
        selectableRows: 'none',
        elevation: 1,
    };

    return (
        <div>
            <Navigation />
            <div className="page-container">
                {error && <p className="error-message">{error}</p>}
                <MUIDataTable
                    title={"User Accounts (auth_user table)"}
                    data={users}
                    columns={columns}
                    options={options}
                />
            </div>
        </div>
    );
};

export default UsersPage;