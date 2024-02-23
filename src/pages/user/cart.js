import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout/layout';
import '../HomePage.css';
import { getAllCartProducts } from '../service';
import SingleProduct from '../singleProduct';

const CartPage = () => {

    const userId = localStorage.getItem('userId')
    const [cartProducts, setCartProducts] = useState([]);

    useEffect(() => {
        getAllCartProducts(userId).then((response) => {
            if (response.data.length > 0) {

                setCartProducts(response.data)
            }
        })
    }, [])
    return (
        <Layout title='Home | Cart'>
            <div >
                <h3 style={{ textAlign: 'center' }}>  My Cart</h3>
                {cartProducts.length > 0 ?
                    (<div className="product-container">
                        {cartProducts && cartProducts.map((product, index) => (
                            <SingleProduct product={product} type={"cart"} />
                        ))}
                    </div>
                    )
                    : (
                        <div className="product-container">
                            your cart is empty
                        </div>
                    )}
            </div>

        </Layout>
    );
};

export default CartPage;
