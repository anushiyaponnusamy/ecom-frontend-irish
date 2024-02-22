import React, { useEffect, useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { getAllOrders, updateShippingStatus } from './service';
import './ProductView.css';
import { useAuth } from '../../context/auth';

const AllOrders = ({ handleRedirect, handleEdit }) => {

    const [auth, setAuth] = useAuth();
    const [products, setProducts] = useState([]);

    const updateShipping = (data) => {
        updateShippingStatus(data).then((response) => {
            if (response.data._id) getApi();
            else console.log("undeleted");
        });
    };

    const getApi = () => {
        getAllOrders()
            .then((response) => {
                setProducts(response.data);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getApi();
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead >
                    <TableRow>
                        <TableCell>Sno</TableCell>
                        <TableCell>ID</TableCell>
                        <TableCell>Product ID</TableCell>
                        <TableCell>Product Name</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell>Payment Status</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map((product, index) => (
                        <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{product._id}</TableCell>
                            <TableCell>{product.productId}</TableCell>
                            <TableCell>{product.productName}</TableCell>
                            <TableCell>{auth?.user?.address}</TableCell>
                            <TableCell>{product?.transactionDetails?.msg}</TableCell>
                            <TableCell>
                                {!product.shipped ? (
                                    <Button
                                        variant="contained"
                                        onClick={() => updateShipping({ shipping: true, orderId: product._id })}
                                        style={{ height: "40px", width: "120px", textAlign: "center", marginBottom: "10px" }}
                                    >
                                        Start Shipping
                                    </Button>
                                ) : (
                                    <div style={{ display: "flex", justifyContent: "center", marginBottom: "5px" }}>
                                        <span className="edit-icon" style={{ marginRight: "5px" }}>
                                            <FontAwesomeIcon icon={faCheckCircle} color="green" />
                                        </span>
                                        <span className="delete-icon" style={{ fontWeight: "700" }}>
                                            Shipped
                                        </span>
                                    </div>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default AllOrders;
