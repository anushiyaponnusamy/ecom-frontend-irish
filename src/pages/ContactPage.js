import React from 'react'
import Layout from '../components/layout/layout'
import ContactImage from '../images/contactus.jpg';
import { MdEmail } from 'react-icons/md';
import { BiMobile } from 'react-icons/bi'
import './ContactPage.css'
const ContactPage = () => {
    return (
        <Layout title='Contact | TickTick'>
            <div className="contact__page">
                <div style={{ flex: 1 }}>
                    <img src={ContactImage} alt="Contact Us" style={{ maxWidth: "100%", height: "auto" }} />
                </div>
                <div className='contact__page__right'>
                    <h1>Contact Us</h1>
                    <p>If you have any questions or feedback, please feel free to reach out to us.</p>
                    <p><MdEmail style={{ marginBottom: "5px", marginRight: "5px" }} />Email: anushiya@gmail.com</p>
                    <p><BiMobile style={{ marginBottom: "5px", marginRight: "5px" }} />Phone: +1 (123) 456-7890</p>
                </div>
            </div>
        </Layout>
    )
}

export default ContactPage;