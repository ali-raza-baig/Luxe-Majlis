import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";


export const ProductContext = createContext<any>(null);

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
    const [products, setProducts] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    const fetchProduct = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_BACKEND_URL}/api/product/all`)
            if (data.success) {
                setProducts(data.products)
                setLoading(false)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProduct()
    }, [])

    return (
        <ProductContext.Provider value={{ products, setProducts, loading }}>
            {children}
        </ProductContext.Provider>
    )
}

export const useProduct = () => {
    const context = useContext(ProductContext);

    if (!context) {
        throw new Error("useProduct must be used inside ProductProvider");
    }

    return context;
};