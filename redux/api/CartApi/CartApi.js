import axios from "./axios";

export const CartApi = async (item) => {
    const response = await axios.post(`${API_URL}/add`, item);
    return response.data;
};

export const removeCartItem = async (itemId) => {
    const response = await axios.delete(`${API_URL}/remove/${itemId}`);
    return response.data;
};

export const updateCartItemQuantity = async (itemId, quantity) => {
    const response = await axios.put(`${API_URL}/update/${itemId}`, { quantity });
    return response.data;
};

export const applyCouponCode = async (couponCode) => {
    const response = await axios.post(`${API_URL}/apply-coupon`, { couponCode });
    return response.data;
};

export const clearCart = async () => {
    const response = await axios.delete(`${API_URL}/clear`);
    return response.data;
};