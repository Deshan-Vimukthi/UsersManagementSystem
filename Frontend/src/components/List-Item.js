import React, { useState, useEffect } from 'react';

function ListItem() {
    const [users, setUsers] = useState([]);

    const [user_email, setUserEmail] = useState('admin@gmail.com');

    //every time web updating this will run and keep update the list
    useEffect(() => {
        fetchUsers();
    }, []);

    //get all users. get method cannot use a request body so its use quary.
    const fetchUsers = async () => {

        try {
            const response = await fetch(`/api/users?user_email=${user_email}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    //Print the all of users
    return (
        <div id="list">
            {users.length === 0 ? (
                <h1>Loading...</h1>
            ) : (
                users.map((item, index) => (
                    <div className="list-item" key={index}>
                        <div>{item.basic_info.first_name}</div>
                        <div>{item.basic_info.last_name}</div>
                        <div>{item.basic_info.dob.substring(0,10)}</div>
                        <div>{item.basic_info.gender}</div>
                        <div>{item.contact_info.mobile_number}</div>
                        <div>{item.contact_info.email}</div>
                    </div>
                ))
            )}
        </div>
    );
}

export default ListItem;