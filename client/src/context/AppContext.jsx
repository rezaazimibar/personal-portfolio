import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

    const currency = import.meta.env.VITE_CURRENCY

    const navigate = useNavigate();
    const [user, setUser] = useState(null)
    const [isSeller, setIsSeller] = useState(false)
    const [showUserLogin, setShowUserLogin] = useState(false)
    const [products, setProducts] = useState([])
    const [cartItems, setCartItems] = useState({})
    const [searchQuery, setSearchQuery] = useState({})

    // Fetch Seller Status
    const fetchSeller = async () => {
        try {
            const { data } = await axios.get('/api/seller/is-auth');
            if (data.success) {
                setIsSeller(true)
            } else {
                setIsSeller(false)
            }
        } catch (error) {
            setIsSeller(false)
        }
    }

    // Fetch All Products
    const fetchProducts = async () => {
        try {
            const {data} = await axios.get('/api/product/list')
        } catch (error) {
            
        }
    }

    // Add Product To card
    const addToCart = (itemID) => {
        let cartData = structuredClone(cartItems)

        if (cartData[itemID]) {
            cartData[itemID] += 1;
        } else {
            cartData[itemID] = 1;
        }
        setCartItems(cartData);
        toast.success("Added to Cart")
    }

    // Updata Cart Item Quantity
    const updateCartItem = (itemsId, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemsId] = quantity;
        setCartItems(cartData)
        toast.success("Cart Updated")
    }

    // Remove Product from Cart
    const removeFromCart = (itemID) => {
        let cartData = structuredClone(cartItems);
        if (cartData[itemID]) {
            cartData[itemID] -= 1
            if (cartData[itemID] === 0) {
                delete cartData[itemID]
            }
        }
        toast.success('Removed From Cart')
        setCartItems(cartData)
    }

    // Get Cart Item Count
    const getCartCount = () => {
        let totalCount = 0
        for (const item in cartItems) {
            totalCount += cartItems[item]
        }
        return totalCount;
    }

    // Get Cart Total Amount
    const getCartAmount = () => {
        let totalAmount = 0
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            if (cartItems[items] > 0) {
                totalAmount += itemInfo.offerPrice * cartItems[items]
            }
        }
        return Math.floor(totalAmount * 100) / 100;
    }


    useEffect(() => {
        fetchSeller()
        fetchProducts()
    }, [])

    const value = {
        navigate, user, setUser, setIsSeller, isSeller,
        showUserLogin, setShowUserLogin, products ,setProducts ,currency, addToCart, updateCartItem,
        removeFromCart, cartItems, searchQuery, setSearchQuery, getCartAmount, getCartCount,
        axios
    }

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = () => {
    return useContext(AppContext)
}