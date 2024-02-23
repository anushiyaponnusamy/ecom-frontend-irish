import React, { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { MdViewSidebar } from 'react-icons/md';
import AdminMenu from './AdminMenu';
import CreateCategory from './CreateCategory';
import CreateProduct from './CreateProduct';
import UserList from './UserList';
import Grid from '@mui/material/Grid';
import './Admindashboard.css';
import Layout from '../../components/layout/layout';
import ProductView from './ProductView';
import ProductEdit from './ProductEdit';
import { useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';

const AdminDashboard = () => {
    const navigate = useNavigate()
    const mobileView = useMediaQuery("(max-width:768px)");
    const [selectedMenu, setSelectedMenu] = useState('category');
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const [productId, setProductId] = useState("")
    const [auth, setAuth] = useAuth()
    const handleMenuClick = (menu) => {
        setSelectedMenu(menu);
    };
    const toggleSidebar = () => {
        setSideBarOpen(!sideBarOpen);
    };
    const handleSetProductId = (id) => {
        setProductId(id)
    }
    useEffect(() => {
        if (auth?.user?.role === 'user') {

            navigate('/')
        }
        // Close the sidebar initially on mobile
        if (mobileView) {
            setSideBarOpen(false);
        }
    }, [mobileView]);
    return (
        <Layout>
            <Grid container className="layout-container">
                <Grid item xs={3} className='sidebar sidebar-open'>
                    {/* {sideBarOpen ? */}
                    <AdminMenu
                        handleMenuClick={handleMenuClick}
                    //  handleClose={toggleSidebar} 
                    />
                    {/* : <MdViewSidebar onClick={toggleSidebar} />} */}
                </Grid>
                <Grid item xs={9} className="content" >
                    <div className="content-inner">
                        {selectedMenu === 'category' && <CreateCategory />}
                        {selectedMenu === 'product-create' && <CreateProduct handleRedirect={handleMenuClick} />}
                        {selectedMenu === 'product-view' && <ProductView handleRedirect={handleMenuClick} handleEdit={handleSetProductId} />}
                        {selectedMenu === 'product-edit' && <ProductEdit handleRedirect={handleMenuClick} productId={productId} />}
                        {selectedMenu === 'users' && <UserList />}
                        {/* {selectedMenu === 'orders' && <AllOrders />} */}

                    </div>
                </Grid>
            </Grid>
        </Layout>
    );
}

export default AdminDashboard;
