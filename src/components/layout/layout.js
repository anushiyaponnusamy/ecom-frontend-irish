import React from 'react'
import Header from './header'
import Footer from './footer'
import { Helmet } from 'react-helmet'
const Layout = ({ children, title, description, keyword }) => {
    return (

        <div>
            <Helmet>

                <meta charset="UTF-8" />
                <meta name="description" content={description} />
                <meta name="keywords" content={keyword} />
                <meta name="author" content="Anushiya P" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>{title}</title>
            </Helmet>
            <Header />
            <main style={{ minHeight: "70vh" }}>{children}</main>
            <Footer />
        </div>
    )
}

Layout.defaultProps = {
    title: 'HappyShopping!',
    description: 'all things shopping',
    keyword: 'medicine,lifestyle,costumes,chocolates',
    author: 'Anushiya'
}
export default Layout;