import { create } from "zustand";

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),
    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.image || !newProduct.price) {
            return { success: false, message: "Please fill in all fields." };
        }

        const res = await fetch("/api/products/addProduct", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProduct)
        });

        const data = await res.json();
        set((state) => ({ products: [...state.products, data.data] }));
        return { success: true, message: "Product Created successfully" };

    },
    fetchProducts: async () => {
        const res = await fetch("/api/products/hello");
        const data = await res.json();
        set({ products: data.data });
    },
    deleteProduct: async (pid) => {
        const res = await fetch(`/api/products/deleteProduct/${pid}`, {
            method: "POST",
        });

        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };

        set(state => ({
            products: state.products.filter(product => product._id !== pid)
        }));

        return { success: true, message: data.message };
    }


}));
