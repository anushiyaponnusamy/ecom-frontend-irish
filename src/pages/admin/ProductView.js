import React, { useEffect, useState } from 'react';
import { deleteProduct, getAllProducts } from './service';
import './ProductView.css'
import { Button } from '@mui/material';
import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlus } from 'react-icons/ai';
const ProductView = ({ handleRedirect, handleEdit }) => {
    const [products, setProducts] = useState([]);
    const handleDeleteClick = (id) => {
        deleteProduct(id).then((response) => {
            if (response.data.deletedCount === 1)
                getApi()
            else
                console.log("undeleted")

        })
    }
    const getApi = () => {
        getAllProducts()
            .then((response) => {
                setProducts(response.data);
            })
            .catch((err) => console.log(err));
    }
    useEffect(() => {
        getApi()
    }, []);

    return (
        <div >
            <Button variant="contained" className='bg-color-ecom' style={{ backgroundColor: 'black', color: 'white' }} onClick={() => handleRedirect("product-create")}>
                <AiOutlinePlus size={20} style={{ color: 'white', marginRight: '5px' }} />
                Create Product
            </Button>

            <div className="product-container">

                {products.map((product, index) => (
                    <div key={index} className="product-card">
                        <div className="product-icons">
                            <span className="edit-icon" onClick={() => { handleEdit(product._id); handleRedirect("product-edit") }} >
                                <AiOutlineEdit size={12} />
                            </span>
                            <span className="delete-icon" onClick={() => handleDeleteClick(product._id)}>
                                <AiOutlineDelete size={12} />
                            </span>
                        </div>
                        <div className="product-front">
                            <img src={product.photo} alt={product.title} />
                            <div className="product-details">
                                <h4 style={{ color: 'black' }}>{product.name}</h4>
                                <p>{product.description.substring(0, 30) + '...'}</p>
                            </div>
                        </div>
                        <div className="product-back">
                            <div className="product-price">
                                <p>Rs.{product.price}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>     </div >
    );
};

export default ProductView;
