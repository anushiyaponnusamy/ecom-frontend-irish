import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography, Container } from '@mui/material';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import config from '../../config/config';
import Layout from '../../components/layout/layout';
import { useAuth } from '../../context/auth';


const accessToken = localStorage.getItem("token");

const AddressForm = () => {
    const [formData, setFormData] = useState({
        street: '',
        city: '',
        state: '',
        zip: '',
    });
    const [auth, setAuth] = useAuth()
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        if (formData.city === "" && formData.state === "" && formData.street === "" && formData.zip === "") {
            toast.error("missing field")
            return
        }
        const response = await axios.post(config.REACT_APP_API + '/auth/updateAddress', { address: formData }, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${accessToken}`
            },
        });
        if (response?.data?._id) {
            await setAuth({
                ...auth,
                user: {
                    ...auth.user,
                    address: response?.data?.address,
                },
            });
            navigate(-1)
        } else {
            toast.error('Address update failed');
        }
    }
    return (
        <Layout><Container component="main" maxWidth="xs">
            <Paper elevation={3} style={{ padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">
                    Address Form
                </Typography>
                <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: 20 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Street"
                                name="street"
                                value={formData.street}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="City"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="State"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="ZIP Code"
                                name="zip"
                                type='number'
                                value={formData.zip}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={{ marginTop: 20 }}
                    >
                        Submit
                    </Button>
                </form>
            </Paper>
        </Container></Layout>
    );
};

export default AddressForm;
