import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/layout';
import './HomePage.css';
import { getAllProducts } from './admin/service';
import SingleProduct from './singleProduct';
import InfiniteScroll from 'react-infinite-scroll-component';

const HomePage = () => {
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [pagePerSize, setPagePerSize] = useState(10);

    const getApi = (pageNumber) => {
        setLoading(true);
        getAllProducts(pageNumber, pagePerSize)
            .then((response) => {
                setFilteredProducts((prevProducts) => [...prevProducts, ...response.data]);
                setLoading(false);
                if (response?.data?.length < pagePerSize) {
                    setHasMore(false); // No more products to load
                } else {
                    setPageNumber((prevPageNumber) => prevPageNumber + 1);
                }
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };

    const fetchMoreData = () => {
        getApi(pageNumber);
    };
    useEffect(() => {
        getApi(pageNumber);
    }, [])
    return (
        <Layout title='Home | Shopping'>
            <div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div>
                        <h3 style={{ textAlign: 'center', fontWeight: '700', color: 'black', marginBottom: '10px' }}>All Products</h3>
                        <InfiniteScroll
                            dataLength={filteredProducts.length} // This is important field to render the next data
                            next={fetchMoreData}
                            hasMore={hasMore}
                            loader={loading && <div style={{ alignItems: 'center' }}>
                                <div className="spinner-border text-danger" role="status"></div>
                            </div>}
                            endMessage={
                                <p style={{ textAlign: 'center' }}>
                                    <b></b>
                                </p>
                            }
                        >
                            <div className="product-container" style={{ display: 'flex', flexWrap: 'wrap' }}>
                                {filteredProducts.map((product) => (
                                    <SingleProduct product={product} key={product._id} style={{ flexBasis: 'calc(50% - 10px)' }} />
                                ))}
                            </div>
                        </InfiniteScroll>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default HomePage;
