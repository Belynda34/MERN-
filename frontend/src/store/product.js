import { create } from "zustand";
import { updateProduct } from "../../../backend/controllers/productController";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "Please fill in all fields." };
    }

    try {
      const res = await fetch("http://localhost:5000/api/products/create", {
        method: "POST",
        body: JSON.stringify(newProduct),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Check if the response is ok
      if (!res.ok) {
        const errorData = await res.json();
        return {
          success: false,
          message: errorData.message || "Failed to create product",
        };
      }

      const data = await res.json();
      console.log("Fetched products:", data);
      set((state) => ({ products: [...state.products, data.data] }));
      console.log("New product added:", data.data);
      return { success: true, message: "Product created successfully" };
    } catch (error) {
      console.error("Error:", error);
      return { success: false, message: "Network error" };
    }
    
  },

  fetchProducts: async () => {

    try {
      const response = await fetch('http://localhost:5000/api/products/get');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result= await response.json();
    console.log("Fetched data:", result);

    if (result.success) {
      // Set the products to the store
      set({ products: result.data || [] });
      console.log("Products stored:", result.data || []); // Log the products being stored
    } else {
      console.error("Failed to fetch products: ", result.message);
    }

    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  },

   deleteProduct : async(pid) =>{
    const res = await fetch(`http://localhost:5000/api/products/${pid}`,{
      method:'DELETE',
    });
    const data = await res.json();

    if(!data.success){
      return {success:false,message:data.message};
    }
    //update the UI
    set(state => ({products:state.products.filter(product => product._id !== pid)}));
    return {success:true,message:data.message}
   },

   updateProduct : async(pid,updatedProduct) =>{

    
      const res = await fetch(`http://localhost:5000/api/products/${pid}`,{
        method:'PUT',
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify(updatedProduct)
      });
      const data = await res.json();
      if(!data.success){
        return {sucess:false,message:data.message}
      }

      //updating the ui without needing to refresh
      set(state => ({
        products: state.products.map((product) => (product._id === pid ? data.data : product) ),
      }))
   }
   
}));


   // fetchProducts : async () =>{
      //   const res = await fetch('http://localhost:5000/api/products/get');
      //   const data = await res.json();
      //   set({products:data.data});
      // }
