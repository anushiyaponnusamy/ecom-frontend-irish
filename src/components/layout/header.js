import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AiOutlineShoppingCart, AiFillClockCircle } from 'react-icons/ai';
import MenuIcon from '@mui/icons-material/Menu';
import { MdArrowDropDownCircle } from 'react-icons/md';
import { useAuth } from '../../context/auth';
import './header.css';

import {
    AppBar,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Paper,
    Toolbar,
    Typography,
    useMediaQuery,
    Avatar,
} from '@mui/material';

import SearchProduct from './search';
import { useSelector } from 'react-redux';
import { selectCartCount } from '../../redux/Redux';

const Header = () => {
    const [auth, setAuth] = useAuth();
    const mobileView = useMediaQuery('(max-width:768px)');
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');
    const role = localStorage.getItem('role');
    const cartCount = useSelector(selectCartCount);
    const navigate = useNavigate();
    const LogoutUser = () => {
        setAuth({ ...auth, user: null, token: '' });
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        localStorage.removeItem('email');
        localStorage.removeItem('role');
        localStorage.removeItem('mobile');
        localStorage.removeItem('userId');
        navigate('/login');
    };
    const handleDropdownChange = (event) => {
        setSelectedValue(event);
        setShowDropdown(false);
    };
    console.log("auth", auth.user)
    useEffect(() => {
        if (!auth?.user?.userName) {
            if (
                window.location.pathname !== '/forget-password' &&
                window.location.pathname !== '/signup'
            ) {
                LogoutUser();
            }
        }
        if (selectedValue === 'home') {
            navigate('/');
        } else if (selectedValue === 'dashboard') {
            navigate(`/dashboard/${role === 'admin' ? 'admin' : 'user'}`);
        } else if (selectedValue === 'logout') {
            LogoutUser();
        }
    }, [selectedValue]);

    const [open, setOpen] = useState(false);
    const toggleSidebar = () => {
        setOpen(!open);
    };

    return (
        <>
            {mobileView ? (
                <>
                    <AppBar position="static" className="header__mobileview">
                        <Toolbar style={{ color: 'black', background: 'white' }}>
                            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleSidebar}>
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6">
                                <Link className="navbar-brand" to="/">
                                    <div style={{ alignItems: 'right' }}>HappyShoppy!
                                        {/* <AiOutlineShoppingCart style={{ marginBottom: '5px', marginRight: '3px' }} /> */}
                                    </div> </Link>
                            </Typography>
                            {/* <SearchProduct /> */}
                        </Toolbar>
                    </AppBar>
                    <Drawer anchor="left" open={open} onClose={toggleSidebar}>
                        <Paper
                            style={{
                                width: '250px',
                                height: 'auto',
                                boxShadow: 'none',
                                marginTop: '30px',
                            }}
                        >
                            <List>
                                <ListItem style={{ margin: '0px 20px 20px 0px', fontSize: '25px' }}>
                                    <Link className="navbar-brand" to="/">
                                        <AiOutlineShoppingCart style={{ marginBottom: '5px', marginRight: '3px' }} />
                                        HappyShoppy!
                                    </Link>
                                </ListItem>
                                {auth?.user?.userId && <ListItem ListItem button >
                                    {auth?.user?.profilePhoto ? (
                                        <Avatar alt={auth.user.userName} src={auth.user.profilePhoto} onClick={() => { navigate('/dashboard/user') }} />
                                    ) : (
                                        <Avatar onClick={() => { navigate('/dashboard/user') }}>{auth.user?.userName ? auth.user?.userName[0]?.toUpperCase() : ""}</Avatar>
                                    )}
                                    <h3 style={{ fontWeight: '500', margin: "0px 0px 3px 5px" }} onClick={() => { navigate('/dashboard/user') }}>{auth?.user?.userName}</h3>
                                </ListItem>}
                                <ListItem button>
                                    <NavLink className="nav-link " to="/">
                                        Home
                                    </NavLink>
                                </ListItem>
                                {auth?.user?.userId && <><ListItem button>
                                    <NavLink className="nav-link" to="/cart">
                                        Cart({cartCount})
                                    </NavLink>
                                </ListItem>
                                    {/* <ListItem button>
                                        <NavLink className="nav-link " to="/orders">
                                            My Orders
                                        </NavLink>
                                    </ListItem> */}
                                </>}
                                {!auth?.user?.userId ? (
                                    <>
                                        {' '}
                                        <ListItem button>
                                            <NavLink className="nav-link " to="/signup">
                                                Register
                                            </NavLink>
                                        </ListItem>
                                        <ListItem button>
                                            <NavLink className="nav-link" to="/login">
                                                Login
                                            </NavLink>
                                        </ListItem>
                                    </>
                                ) : (
                                    <>
                                        {' '}
                                        <ListItem button>
                                            <NavLink className="nav-link" onClick={() => handleDropdownChange('dashboard')}>
                                                Dashboard
                                            </NavLink>
                                        </ListItem>
                                        <ListItem button>
                                            <NavLink className="nav-link" onClick={() => handleDropdownChange('logout')}>
                                                Logout
                                            </NavLink>
                                        </ListItem>
                                    </>
                                )}
                            </List>
                        </Paper>
                    </Drawer>
                </>
            ) : (
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarTogglerDemo01"
                            aria-controls="navbarTogglerDemo01"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                            <Link className="navbar-brand" to="/">
                                <AiOutlineShoppingCart style={{ marginBottom: '5px', marginRight: '3px' }} />
                                HappyShoppy!
                            </Link>
                            {/* <SearchProduct /> */}
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavLink className="nav-link " to="/">
                                        Home
                                    </NavLink>
                                </li>
                                {auth?.user?.userId && <><li className="nav-item">
                                    <NavLink className="nav-link" to="/wishlist">
                                        Wishlist
                                    </NavLink>
                                </li>
                                    {/* <li className="nav-item">
                                        <NavLink className="nav-link " to="/orders">
                                            My Order(s)
                                        </NavLink>
                                    </li> */}
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/cart">
                                            Cart({cartCount})
                                        </NavLink>
                                    </li></>}
                                {!auth.user?.userId ? (
                                    <>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/signup">
                                                Register
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/login">
                                                Login
                                            </NavLink>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <div className="nav-item dropdown">
                                            <span className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" >

                                                <span className="username" onClick={() => { navigate('/dashboard/user') }}>{auth?.user?.userName}</span>

                                            </span>
                                            <div className="dropdown-menu dropdown-menu-end">
                                                <div className="dropdown-item" onClick={() => handleDropdownChange('home')}>
                                                    Home
                                                </div>
                                                <div className="dropdown-item" onClick={() => handleDropdownChange('dashboard')}>
                                                    Dashboard
                                                </div>
                                                <div className="dropdown-item" onClick={() => handleDropdownChange('logout')}>
                                                    Logout
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                </nav>
            )
            }
        </>
    );
};

export default Header;
