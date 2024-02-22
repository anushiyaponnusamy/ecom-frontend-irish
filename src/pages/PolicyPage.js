import React from 'react'
import Layout from '../components/layout/layout'
import './PolicyPage.css'
const PolicyPage = () => {
    return (
        <Layout title='Policy | TickTick'>

            <div className="policy-page-container">
                <div className="policy-page-content">
                    <h1>Our Policies</h1>

                    <h2>1. Shipping and Delivery</h2>
                    <p>We strive to ensure timely delivery of your orders. Please refer to our Shipping and Delivery page for detailed information about shipping methods, estimated delivery times, and associated costs.</p>

                    <h2>2. Returns and Exchanges</h2>
                    <p>Your satisfaction is important to us. Our Returns and Exchanges policy outlines the procedures and conditions for returning or exchanging products. We want you to be happy with your purchase!</p>

                    <h2>3. Privacy and Security</h2>
                    <p>We take your privacy seriously. Our Privacy Policy explains how we collect, use, and protect your personal information. We implement industry-standard security measures to keep your data safe.</p>

                    <h2>4. Terms and Conditions</h2>
                    <p>By using our website, you agree to our Terms and Conditions. This section covers aspects such as website usage, account creation, intellectual property, and more.</p>

                    <h2>5. Payment Information</h2>
                    <p>Your payment information is secure with us. We use trusted payment gateways to process transactions. For more information, please visit our Payment Information page.</p>

                    <h2>6. Contact Us</h2>
                    <p>If you have questions or concerns about our policies, feel free to contact our customer support team:</p>
                    <p><strong>Email:</strong> <a href="mailto:customerservice@example.com">customerservice@example.com</a></p>
                    <p><strong>Phone:</strong> 1-800-123-4567</p>

                    <h2>7. Changes to Policies</h2>
                    <p>We may update our policies from time to time to reflect changes in regulations or our business practices. Any updates will be communicated on this page, so please check back periodically.</p>

                    <p>Thank you for shopping with us and for reviewing our policies.</p>
                </div>
            </div>
        </Layout>
    )
}

export default PolicyPage;