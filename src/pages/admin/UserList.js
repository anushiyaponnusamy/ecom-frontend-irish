import React, { useEffect, useState } from 'react';
import { getAllUsers } from './service';
import { Grid } from '@mui/material';
import './UserList.css';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getAllUsers()
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <Grid container spacing={2}>
            {/* <h5 style={{ textAlign: 'center' }}>User List</h5> */}
            {users?.length &&
                users.map((user, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                        <div className="user-item">
                            <div>{user?.userName} </div>
                            <div>{user?.email}</div>
                            <div>Mobile: {user?.mobile}</div>
                        </div>
                    </Grid>
                ))}
        </Grid>
    );
};

export default UserList;
