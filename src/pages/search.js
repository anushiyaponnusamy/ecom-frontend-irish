import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/layout';
import './HomePage.css';
import SingleProduct from './singleProduct';
const SearchPage = () => {
    const [filteredProducts, setFilteredProducts] = useState([]);





    useEffect(() => {

    }, []);
    return (
        <Layout title='Search | Shopping'>
            <div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>

                    <div >
                        <h3 style={{ textAlign: 'center', fontWeight: '700', color: 'black', marginBottom: '10px' }}>Matched Products</h3>
                        {filteredProducts.length > 0 ? (
                            <div className="product-container" style={{ display: 'flex', flexWrap: 'wrap' }} >
                                {filteredProducts.map((product, index) => (
                                    <SingleProduct product={product} key={product._id} style={{ flexBasis: 'calc(50% - 10px)' }} />
                                ))}
                            </div>
                        ) : (
                            <div className="product-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                {/* {products.map((product, index) => (
                <SingleProduct product={product} key={product._id} style={{ flexBasis: 'calc(45% - 10px)' }} />
            ))} */}
                                <p style={{ fontSize: '16px', color: 'black' }}>None of the products matched</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </Layout>
    );
};

export default SearchPage;
