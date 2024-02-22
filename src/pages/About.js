import React from 'react'
import Layout from '../components/layout/layout'
import './About.css'

const About = () => {
    return (
        <Layout title='About Us | TickTick'>
            <div className="about-page-container">        <div className="about-page-content">
                <h1>Welcome to TickTick!</h1>
                <p>At ShopWorld, we are dedicated to providing you with the best online shopping experience.</p>

                <h2>Our Mission</h2>
                <p>Our mission is to connect customers with high-quality products from around the world at affordable prices. We strive to make online shopping easy, convenient, and enjoyable for everyone.</p>

                <h2>Our Values</h2>
                <ul>
                    <li><strong>Quality:</strong> We believe in offering only products of the highest quality to ensure customer satisfaction.</li>
                    <li><strong>Customer-Centric:</strong> Your needs are at the center of everything we do. We're committed to providing excellent customer service and addressing your concerns promptly.</li>
                    <li><strong>Transparency:</strong> We believe in transparency in our operations, from product sourcing to pricing and customer interactions.</li>
                    <li><strong>Innovation:</strong> We're always looking for new and innovative ways to enhance your shopping experience.</li>
                </ul>

                <h2>Our Team</h2>
                <p>Our diverse team is made up of passionate individuals who are dedicated to revolutionizing the online shopping industry. We come from various backgrounds and cultures, bringing unique perspectives to the table.</p>

                <h2>Contact Us</h2>
                <p>If you have any questions, suggestions, or feedback, don't hesitate to reach out to us:</p>
                <p><strong>Email:</strong> <a href="mailto:info@TickTick.com">info@TickTick.com</a></p>
                <p><strong>Phone:</strong> 1-800-123-4567</p>

                <h2>Join Our Community</h2>
                <p>Connect with us on social media to stay updated on the latest products, promotions, and news:</p>
                <ul className="social-media-links">
                    <li><a href="https://www.facebook.com/TickTick" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                    <li><a href="https://www.twitter.com/TickTick" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                    <li><a href="https://www.instagram.com/TickTick" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                </ul>

                <p>Thank you for choosing ShopWorld. Happy shopping!</p>
            </div></div>

        </Layout>
    )
}

export default About;