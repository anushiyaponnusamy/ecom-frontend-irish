import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout/layout';
import '../HomePage.css';
import { getAllOrdersByUserId } from '../service';
import SingleProduct from '../singleProduct';

const OrdersPage = () => {

    const userId = localStorage.getItem('userId')
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getAllOrdersByUserId(userId).then((response) => {
            if (response.data.length > 0) {
                setOrders(response.data)
            }
        })
    }, [])
    return (
        <Layout title='Home | My Orders'>
            <div >
                <h3 style={{ textAlign: 'center' }}>  My Orders</h3>
                {orders.length > 0 ?
                    (<div className="product-container">
                        {orders && orders.map((product, index) => (
                            <SingleProduct product={product} type={"orders"} />
                        ))}
                    </div>
                    )
                    : (
                        <div className="product-container">
                            No Orders Yet
                        </div>
                    )}
            </div>

        </Layout>
    );
};

export default OrdersPage;
