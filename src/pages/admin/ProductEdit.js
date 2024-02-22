
import React, { useEffect, useState } from 'react';
import {
    TextField,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    FormHelperText,
    Container,
    CssBaseline,
    Grid,
} from '@mui/material';

import { createProduct, editProduct, getAllCategories, getProductById, uploadImage } from './service';
import './CreateProduct.css'
import { useNavigate } from 'react-router-dom';


const ProductEdit = ({ handleRedirect, productId }) => {
    const [categories, setCategories] = useState([]);

    const [product, setProduct] = useState({
        _id: '',
        name: '',
        price: 0,
        description: '',
        quantity: 0,
        photo: '',
        categoryId: '',
        shipping: '',
    });
    const [error, setError] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;

        setProduct({ ...product, [name]: value })
    };

    const handlePhotoChange = (event) => {
        console.log(event.target.files[0])
        const img = event.target.files[0]
        uploadImage(img).then((response) => {
            setProduct({ ...product, photo: response.data })
        }).catch((err) => console.log(err))
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            _id: product._id,
            name: product.name,
            price: product.price,
            description: product.description,
            quantity: product.quantity,
            photo: product.photo,
            categoryId: product.categoryId,
            shipping: product.shipping,
        }

        editProduct(data).then((response) => {
            if (response.data.modifiedCount === 1) {
                handleRedirect("product-view")
            }
        }).catch((error) => console.log(error))


        // setProduct({
        //     name: '',
        //     price: 0,
        //     description: '',
        //     quantity: 0,
        //     photo: '',
        //     category: '',
        //     shipping: '',
        // });
    };
    useEffect(() => {

        getAllCategories().then((response) => {
            if (response.data) {
                setCategories(response.data)
            }
        }).catch((err) => console.log(err))
        getProductById(productId).then((response) => {
            if (response.data._id) {
                setProduct({
                    _id: response.data._id,
                    name: response.data.name,
                    price: response.data.price,
                    description: response.data.description,
                    quantity: response.data.quantity,
                    photo: response.data.photo,
                    categoryId: response.data.categoryId,
                    shipping: response.data.shipping,
                })
            }
        }).catch((error) => {
            console.log(error)
        })
    }, [productId]);
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <h1>Create Product</h1>
                </Grid>
                <Grid item xs={12}>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormControl variant="outlined" required fullWidth>
                                    <TextField
                                        label="Name"
                                        variant="outlined"
                                        name="name"
                                        value={product.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl variant="outlined" required fullWidth>
                                    <TextField
                                        label="Quantity"
                                        variant="outlined"
                                        name="quantity"
                                        value={product.quantity}
                                        onChange={handleChange}
                                        required
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl variant="outlined" required fullWidth>
                                    <TextField
                                        label="Price"
                                        variant="outlined"
                                        name="price"
                                        value={product.price}
                                        onChange={handleChange}
                                        required
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl variant="outlined" required fullWidth>
                                    <InputLabel>Shipping</InputLabel>
                                    <Select
                                        value={product.shipping}
                                        name="shipping"
                                        onChange={handleChange}
                                        label="Shipping"
                                    >
                                        <MenuItem value="yes">
                                            Yes
                                        </MenuItem>
                                        <MenuItem value="no">
                                            No
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl variant="outlined" required fullWidth>
                                    <TextField
                                        label="Description"
                                        variant="outlined"
                                        name="description"
                                        value={product.description}
                                        onChange={handleChange}
                                        required
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl variant="outlined" required fullWidth>
                                    <InputLabel>Category</InputLabel>
                                    <Select value={product.categoryId}
                                        name="categoryId"
                                        onChange={handleChange}
                                        label="Category"
                                    >
                                        {categories.map((cat) => (
                                            <MenuItem key={cat?._id} value={cat?._id}>
                                                {cat?.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl variant="outlined" required fullWidth>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handlePhotoChange}
                                    // required
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                Submit
                            </Button>
                        </Grid>
                        {error && <p>{error}</p>}
                    </form>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ProductEdit;
