import React, { useState, useEffect } from 'react';
import MUIDataTable from 'mui-datatables';
import { fetchTeachers } from '../services/api';
import Navigation from '../components/Navigation';

const TeachersPage = () => {
    const [teachers, setTeachers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const getTeachers = async () => {
            try {
                const response = await fetchTeachers();
                setTeachers(response.data);
            } catch (error) {
                setError("Failed to fetch teachers data. You might be logged out.");
                console.error("Failed to fetch teachers", error);
            }
        };
        getTeachers();
    }, []);

    const columns = [
        { name: "id", label: "ID" },
        { name: "first_name", label: "First Name" },
        { name: "last_name", label: "Last Name" },
        { name: "email", label: "Email" },
        { name: "university_name", label: "University" },
        { name: "gender", label: "Gender" },
        { name: "year_joined", label: "Year Joined" }
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
                    title={"Teachers List (Joined Data)"}
                    data={teachers}
                    columns={columns}
                    options={options}
                />
            </div>
        </div>
    );
};

export default TeachersPage;