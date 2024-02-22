import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById } from '../admin/service';
import Layout from '../../components/layout/layout';
import axios from 'axios';
import { toast } from 'react-toastify';
import config from '../../config/config';
import { useAuth } from '../../context/auth';
const accessToken = localStorage.getItem("token");
const BuyNow = () => {
    const [auth, setAuth] = useAuth();
    const theme = useTheme();
    const [product, setProduct] = useState({})
    const { id } = useParams()
    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }
    const createOrder = async (res) => {



        try {
            const data = {

                productName: product?.name,
                productId: product?._id,

                price: product?.price,
                shipped: false,
                description: product?.description,
                photo: product?.photo,
                transactionDetails: res,

            }
            let response = await axios.post(config.REACT_APP_API + '/order/create-order', data, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${accessToken}`
                },
            });
            if (response.data) {

                toast.success("Order Placed")
            }
            return response

        } catch (error) {

        }
    }
    const navigate = useNavigate();
    const handlePayment = async (_amount) => {
        try {
            console.log("auth?.user", auth?.user)
            if (!auth?.user?.address) {
                navigate('/address');
                return
            }
            const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

            if (!res) {
                throw new Error("Razorpay SDK failed to load. Are you online?");
            }

            const result = await axios.post(config.REACT_APP_API + '/payment/orders', { amount: _amount },
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + accessToken,
                    }
                });

            if (!result) {
                throw new Error("Server error. Are you online?");
            }

            const { amount, id, currency } = result.data;

            const options = {
                key: config.R_KEY,
                amount: amount.toString(),
                currency: currency,
                name: "Tick Tick",
                description: " Transaction",
                order_id: id,
                handler: async function (response) {
                    const data = {
                        orderCreationId: id,
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpayOrderId: response.razorpay_order_id,
                        razorpaySignature: response.razorpay_signature,
                    };

                    const result = await axios.post(config.REACT_APP_API + "/payment/success", data,
                        {
                            headers: {
                                Accept: "application/json",
                                "Content-Type": "application/json",
                                Authorization: "Bearer " + accessToken,
                            }
                        })
                    console.log("result?.data", result.data)


                    if (result?.data?.msg === 'success') {
                        toast.success("Transaction Successful")
                        await createOrder(result?.data);

                    }
                    else {
                        toast.error("Transaction failed")
                        return;
                    }
                },
                notes: {
                    address: "champhunt",
                },
                theme: {
                    color: "#61dafb",
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();

        } catch (error) {
            // Handle errors
            console.error(error.message);
            return { success: false, message: error.message };
        }
    }

    useEffect(() => {
        getProductById(id).then((response) => {
            if (response.data) {
                setProduct(response.data)
            }
        }).catch((err) => console.log(err))
    }, [])
    return (
        <Layout title='Home | Shopping'>
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    {/* Product Image */}
                    <Grid item xs={12} md={6}>
                        <img
                            src={product?.photo}
                            alt="Product Image"
                            style={{ width: '100%', height: 'auto' }}
                        />
                    </Grid>

                    {/* Product Details */}
                    <Grid item xs={12} md={6}>
                        <div style={{ padding: theme.spacing(3) }}>
                            <Typography variant="h4" gutterBottom>
                                {product?.name}
                            </Typography>
                            <Typography variant="body1" paragraph>
                                {product?.description}
                            </Typography>
                            <Typography variant="h6" color="primary" gutterBottom>
                                Rs.{product?.price}
                            </Typography>
                            <Button variant="contained" color="primary" onClick={() => handlePayment(product.price)}>
                                Buy Now
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    );
};

export default BuyNow;
