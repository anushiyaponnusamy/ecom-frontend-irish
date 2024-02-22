import React from 'react'
import Layout from '../components/layout/layout'
import { useNavigate } from 'react-router-dom'
import './PageNotFound.css'
const PageNotFound = () => {
    const navigate = useNavigate();
    const navigateToHome = () => {
        navigate('/')
    }
    return (<Layout title='PageNotFound | TickTick'>
        <div className='pagenotfound'>
            <div className='textAlignCenter'>
                <h1 style={{ fontWeight: "700" }}>404</h1>
                <h3>Oops! Page Not Found</h3>
                <button className='gobackbutton' onClick={() => navigateToHome()}>Go Back</button>
            </div>
        </div>
    </Layout>

    )
}

export default PageNotFound;