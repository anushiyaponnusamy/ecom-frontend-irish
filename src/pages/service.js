import axios from "axios";
import config from "../config/config";
const accessToken = localStorage.getItem("token");
const headers = {
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'Authorization': `Bearer ${accessToken}`
    },
};

const getProductsByCategory = async (categoryId) => {

    let response = await axios.get(config.REACT_APP_API + `/product/getProductsByCategory/${categoryId}`, headers);
    return response;
};
//cart
const addToCart = async (type, product, userId) => {
    let data;
    if (type === 'cart' || type === 'wishlist') {
        data = {
            userId,
            productId: product?.productId, productName: product?.productName,
            price: product?.price, description: product?.description, photo: product?.photo
        }
    } else {
        data = {
            userId,
            productId: product?._id, productName: product?.name, photo: product?.photo, price: product?.price, description: product?.description
        }
    }
    let response = await axios.post(config.REACT_APP_API + '/cart/add-to-cart', data, headers);
    return response;
};
const checkCart = async (type, product, userId) => {
    let productId = (type === 'cart' || type === 'wishlist') ? product?.productId : product?._id
    let response =
        await axios.get(config.REACT_APP_API + `/cart/checkCart/${userId}/${productId}`, headers);
    return response;
};
const checkWishlist = async (type, product, userId) => {

    let productId = type === 'cart' || type === 'wishlist' ? product?.productId : product?._id
    let response = await axios.get(config.REACT_APP_API + `/wishlist/checkWishlist/${productId}/${userId}`, headers);
    return response;
};
const addToWishlist = async (type, product, userId) => {
    let data
    if (type === 'cart' || type === 'wishlist') {
        data = {
            userId,
            productId: product?.productId, productName: product?.productName,
            price: product?.price, description: product?.description, photo: product?.photo
        }
    } else {
        data = {
            userId, photo: product?.photo,
            productId: product?._id, productName: product?.name, price: product?.price, description: product?.description
        }
    }
    let response = await axios.post(config.REACT_APP_API + `/wishlist/add-to-wishlist`, data, headers);
    return response;
};
const removeFromWishlist = async (type, product, userId) => {
    let productId;
    if (type === 'cart' || type === 'wishlist') { productId = product?.productId }
    else { productId = product?._id }
    let response = await axios.delete(config.REACT_APP_API + `/wishlist/deleteByProductIdAndUserId/${productId}/${userId}`, headers);
    return response;
};

const removeFromCart = async (type, product, userId) => {
    let productId = type === 'cart' || type === 'wishlist' ? product?.productId : product?._id;

    let response = await axios.delete(config.REACT_APP_API + `/cart/deleteCartItemByUserIdAndProductId/${userId}/${productId}`, headers);
    return response;
};
const getAllCartProducts = async (userId) => {
    let response = await axios.get(config.REACT_APP_API + `/cart/getAllCartItemsByUserId/${userId}`, headers);
    return response;
};
const getAllWishlistProducts = async (userId) => {
    let response = await axios.get(config.REACT_APP_API + `/wishlist/getAllWishlistProducts/${userId}`, headers);
    return response;
};
const searchProduct = async (text) => {
    let response = await axios.get(config.REACT_APP_API + `/product/searchProduct/${text}`, headers);
    return response;
};

//orders

const getAllOrdersByUserId = async (id) => {
    let response = await axios.get(config.REACT_APP_API + `/order/getAllOrdersByUserId/${id}`, headers);
    return response;
};
export {
    getAllWishlistProducts, searchProduct, getAllOrdersByUserId,
    getProductsByCategory, addToCart, checkCart, checkWishlist,
    addToWishlist, removeFromWishlist, getAllCartProducts, removeFromCart
}