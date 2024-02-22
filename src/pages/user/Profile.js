
import React, { useEffect, useState } from 'react';
import './Profile.css';
import { RxAvatar } from 'react-icons/rx'
import { Button } from '@mui/material';
import Layout from '../../components/layout/layout';
import { getUserdetails } from './service';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const [userDetails, setUserDetails] = useState({
        userName: '',
        email: '',
        profilePhoto: '',
        mobile: '', address: ''
    });

    const [editClicked, setEditClicked] = useState(false);
    const navigate = useNavigate()
    const userId = localStorage.getItem('userId');
    const handleEdit = () => {
        navigate('/profile-edit', { state: { data: userDetails } })
    };
    const renderProfilePhoto = () => {
        if (userDetails?.profilePhoto) {
            return <img src={userDetails?.profilePhoto} alt="Profile" className="profile-picture" />;
        } else {
            return (
                <div>
                    <RxAvatar size={70} />
                </div>
            );
        }
    };
    useEffect(() => {
        getUserdetails(userId).then((response) => {
            if (response?.data) {
                console.log("getUserdetails", response?.data)
                setUserDetails({
                    userName: response?.data?.userName,
                    email: response?.data?.email,
                    mobile: response?.data?.mobile,
                    profilePhoto: response?.data?.profilePhoto,
                    address: response?.data?.address
                })
            }
        })
    }, [])
    console.log("userDetails", userDetails)
    return (
        <Layout title='Profile'>
            <div className='profile-wrapper'>  <div className="profile-container" style={{ display: "flex", }}>
                <div className="profile-info">
                    <div className="profile-picture-container">
                        {renderProfilePhoto()}
                        {/* {editClicked && (
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleProfilePhotoChange}
                            className="profile-photo-input"
                        />
                    )} */}
                    </div>
                    <div className="user-details">
                        <div className='user-details-row'>
                            <div className="label"> <h5 style={{ color: '#837b73', marginBottom: '0px' }}>User Name</h5></div>

                            <div className="detail-value"> {userDetails?.userName}</div>

                        </div>
                        <div className='user-details-row'>
                            <div className="label">  <h5 style={{ color: '#837b73', marginBottom: '0px' }}>Email</h5>  </div>
                            <div className="detail-value">{userDetails?.email}</div>
                        </div>
                        <div className='user-details-row'>
                            <div className="label">  <h5 style={{ color: '#837b73', marginBottom: '0px' }}>Mobile</h5>  </div>
                            <div className="detail-value">{userDetails?.mobile}</div>
                        </div>
                        <div className='user-details-row'>
                            <div className="label">  <h5 style={{ color: '#837b73', marginBottom: '0px' }}>Address</h5>  </div>
                            <div className="detail-value">
                                {userDetails?.address ?
                                    `Street: ${userDetails.address.street}, City: ${userDetails.address.city}, State: ${userDetails.address.state}, Zip: ${userDetails.address.zip}`
                                    : ''
                                }
                            </div>
                        </div>
                    </div>

                    <div className={editClicked ? 'button-css-clicked' : 'button-css-unclicked'}>
                        {!editClicked && <Button variant='contained' onClick={() => handleEdit()}>
                            Edit
                        </Button>}

                    </div>
                </div>
            </div></div>      </Layout>
    );
}

export default Profile;
