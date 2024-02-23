import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography, Container } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import config from '../../config/config';
import Layout from '../../components/layout/layout';
import { useAuth } from '../../context/auth';
import { uploadImage } from '../admin/service';
import { useLocation } from 'react-router-dom';
import 'react-image-crop/dist/ReactCrop.css';

const accessToken = localStorage.getItem("token");

const ProfileEditForm = () => {
    const location = useLocation();
    const receivedData = location.state && location.state.data;

    const [formState, setFormState] = useState({
        userName: receivedData?.userName || '',
        mobile: receivedData?.mobile || '',
        profilePhoto: receivedData?.profilePhoto || '',
        address: {
            street: receivedData?.address?.street || '',
            city: receivedData?.address?.city || '',
            state: receivedData?.address?.state || '',
            zip: receivedData?.address?.zip || '',
        },
    });


    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
            address: {
                ...prevState.address,
                [name]: value,
            },
        }));
    };

    const handlePhotoChange = (event) => {
        const img = event.target.files[0]
        uploadImage(img).then((response) => {
            setFormState({ ...formState, profilePhoto: response.data })
        }).catch((err) => console.log(err))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { userName, mobile, profilePhoto, address } = formState;

        if (Object.values(address).every((value) => value === '')) {
            toast.error("No changes");
            return;
        }
        try {
            const response = await axios.post(config.REACT_APP_API + '/auth/updateUserDetails', { userName, mobile, profilePhoto, address }, {
                headers: {
                    Accept: "application/json",
                    'Authorization': `Bearer ${accessToken}`
                },
            });
            console.log("response?.data", response?.data)
            if (response?.data?._id) {
                await setAuth({
                    ...auth,
                    user: {
                        ...auth.user,
                        userName: response.data.userName,
                        mobile: response.data.mobile,
                        address: response.data.address,
                        profilePhoto: response?.data?.profilePhoto,
                    },
                });
                navigate(-1);
            } else {
                toast.error('Profile update failed');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('An error occurred while updating profile. Please try again.');
        }
    };


    return (
        <Layout>
            <Container component="main" maxWidth="xs">
                <Paper elevation={3} style={{ padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography component="h1" variant="h5">
                        Edit Profile
                    </Typography>
                    <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: 20 }}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Name"
                                name="userName"
                                value={formState.userName}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Street"
                                    name="street"
                                    value={formState.address.street}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="City"
                                    name="city"
                                    value={formState.address.city}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="State"
                                    name="state"
                                    value={formState.address.state}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="ZIP Code"
                                    name="zip"
                                    type='number'
                                    value={formState.address.zip}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Mobile No."
                                    name="mobile"
                                    type='number'
                                    value={formState.mobile}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <input type="file" accept="image/*" onChange={handlePhotoChange} />
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
            </Container>
        </Layout>
    );
};

export default ProfileEditForm;
