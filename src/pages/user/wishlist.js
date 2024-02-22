import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout/layout';
import '../HomePage.css';
import { getAllWishlistProducts } from '../service';
import SingleProduct from '../singleProduct';

const WishlistPage = () => {

    const userId = localStorage.getItem('userId')
    const [wishlistProducts, setWishlistProducts] = useState([]);

    useEffect(() => {
        getAllWishlistProducts(userId).then((response) => {
            if (response.data.length > 0) {
                console.log(response.data)
                setWishlistProducts(response.data)
            }
        })
    }, [])
    return (
        <Layout title='Home | Cart'>
            <div >
                <h3 style={{ textAlign: 'center' }}>  My wishlist</h3>
                {wishlistProducts.length > 0 ?
                    (<div className="product-container">
                        {wishlistProducts && wishlistProducts.map((product, index) => (
                            <SingleProduct product={product} type={"cart"} />
                        ))}
                    </div>
                    )
                    : (
                        <div className="product-container">
                            your wishlist is empty
                        </div>
                    )}
            </div>

        </Layout>
    );
};

export default WishlistPage;
