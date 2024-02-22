import React from 'react';
import { NavLink } from 'react-router-dom';
import './AdminMenu.css';

import { IoMdClose } from 'react-icons/io';
import { useMediaQuery } from '@mui/material';

const AdminMenu = ({ handleMenuClick, handleClose }) => {
    const mobileView = useMediaQuery("(max-width:768px)");

    return (
        <div className="admin-menu">
            {/* {mobileView && (
                <div style={{
                    display: 'flex',
                    alignContent: 'center',
                    justifyContent: "space-around",
                    marginTop: "9px"
                }}>  <IoMdClose onClick={handleClose} /></div>
            )
            } */}
            <NavLink
                // to="/dashboard/admin/create-category"
                onClick={() => handleMenuClick("category")}
                activeClassName="active" className='nav-link'>
                Category
            </NavLink>
            <NavLink
                // to="/dashboard/admin/create-category"
                onClick={() => handleMenuClick("product-view")}
                activeClassName="active" className='nav-link'>
                Product
            </NavLink>

            <NavLink
                className='nav-link' onClick={() => handleMenuClick("users")}
                activeClassName="active">
                Users
            </NavLink>
            <NavLink
                className='nav-link' onClick={() => handleMenuClick("orders")}
                activeClassName="active">
                Orders
            </NavLink>

        </div >
    );
}

export default AdminMenu;
