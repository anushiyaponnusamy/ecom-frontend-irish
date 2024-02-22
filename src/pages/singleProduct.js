import React, { useEffect, useState } from 'react'

import { BsCartPlus, BsFillCartCheckFill, BsHeart, BsHeartFill } from 'react-icons/bs';
import {
    addToCart, addToWishlist, checkCart, checkWishlist, removeFromCart,
    removeFromWishlist
} from './service';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { useDispatch } from 'react-redux';
import { PathAction, selectCartCount } from '../redux/Redux';

const SingleProduct = ({ product, type }) => {
    const navigate = useNavigate();
    const [addedToCart, setAddedToCart] = useState(false)
    const userId = localStorage.getItem('userId')
    const [types, setTypes] = useState(type)
    const [liked, setLiked] = useState(false)
    const dispatch = useDispatch();
    const handleAddToCart = (product) => {
        addToCart(types, product, userId).then((response) => {
            if (response.data === 'product already exists') {
                setAddedToCart(true)
            } else {
                dispatch(PathAction.setIncrementCartCount(response?.data?.cartCount));
                localStorage.setItem('cartCount', response?.data?.cartCount)
                setAddedToCart(true)
            }
        }).catch((err) => console.log(err))
    }
    const handleRemoveFromCart = (product) => {
        removeFromCart(types, product, userId).then((response) => {
            if (response.data.deletedCount === 1) {
                setAddedToCart(false)
                dispatch(PathAction.setIncrementCartCount(response?.data?.cartCount));
                localStorage.setItem('cartCount', response?.data?.cartCount)
            } else {

                setAddedToCart(true)
            }
        }).catch((err) => console.log(err))
    }
    const handleLike = () => {
        if (liked === false) {
            addToWishlist(types, product, userId).then((response) => {

                if (response.data._id) {
                    setLiked(true)
                }
                else {
                    setLiked(false)
                }
            }).catch((err) => {
                console.log(err)
            })
        } else {
            removeFromWishlist(types, product, userId).then((response) => {

                if (response.data.deletedCount === 1) {
                    setLiked(false)
                }
            }).catch((err) => {
                console.log(err)
            })
        }
    }
    useEffect(() => {
        checkCart(types, product, userId).then((response) => {
            console.log("check cart", response)
            if (response.data.productId) {
                setAddedToCart(true)
            }
            else if (response.data === false) {
                setAddedToCart(false)
            }
        });
        checkWishlist(types, product, userId).then((response) => {
            console.log(response)
            if (response.data._id) {
                setLiked(true)
            }
            else if (response.data === false) {
                setLiked(false)
            }
        })
    }, [])
    return (
        <div key={product._id || product?.productId} className="product-card">
            <div
                className="product-front"
                style={{
                    height: '100px',
                    position: 'relative',
                    backgroundImage: `url(${product.photo})`, // Set the image as background
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center',
                }}
            >
                {/* Position the heart icon within the container */}
                {type !== "orders" && <div
                    style={{
                        position: 'absolute',
                        top: '10px', // Adjust the top position as needed
                        right: '10px', // Adjust the right position as needed
                    }}
                >
                    {liked ? (
                        <BsHeartFill
                            style={{ color: 'red', cursor: 'pointer' }}
                            onClick={handleLike}
                        />
                    ) : (
                        <BsHeart
                            style={{ cursor: 'pointer' }}
                            onClick={handleLike}
                        />
                    )}
                </div>}
            </div>
            <div className="product-details">
                <h4 style={{ color: 'black' }}>{product.name || product.productName}</h4>
                <p>{product.description.substring(0, 30) + '...'}</p>
            </div>
            <div className="product-back">
                <div className="product-price">
                    {addedToCart ? (
                        <BsFillCartCheckFill size={25} onClick={() => handleRemoveFromCart(product)} />
                    ) : (
                        <BsCartPlus size={25} onClick={() => handleAddToCart(product)} />
                    )}
                    <p style={{ marginBottom: '5px' }}>Rs.{product.price}</p>
                </div>
            </div>

        </div >
    );
}

export default SingleProduct