import { create } from "zustand";
import { updateProduct } from "../../../backend/controllers/productController";
import axios from "axios";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "Please fill in all fields." };
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/products/create",
        newProduct
      );

      const result = response.data

      if (result.success) {
        set((state) => ({ products: [...state.products, result.data] }));
        console.log("New product added:", result.data);
        return { success: true, message: "Product created successfully" };
      } else {
        return { sucess: false, message: "Failed to create product" };
      }
    } catch (error) {
      console.error("Error:", error);
      return { success: false, message: "Network error" };
    }
  },

  fetchProducts: async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/products/get"
      );

      const result = response.data;

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

  deleteProduct: async (pid) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/products/${pid}`);
      const result = response.data
      if (result.success){
        set((state) => ({
          products: state.products.filter((product) => product._id !== pid),
        }));
        console.log("Product Deleted:",pid)
        return{ success:true, message:"Product deleted successfully"}
      }else{
        return { sucess:false,message:"Failed to delete product"}
      }
    } catch (error) {
      console.error("Error in deleting product :",error)
      return { success:false,message:"Internal server error "}
    }
  },

  updateProduct: async (pid, updatedProduct) => {

    try {
      const response = await axios.put(`http://localhost:8000/api/products/${pid}`,updatedProduct);

      const result = response.data

      if (result.success){
          //updating the ui without needing to refresh
        set((state) => ({
          products: state.products.map((product) =>
            product._id === pid ? result.data : product
          ),
        }));
        console.log("Updated Product",result.data)
        return { success:true, message:"Updated the Product successfully"}
      }else{
          return { success:false, message:"Failed to update the product"}
      }
    } catch (error) {
       console.error("Error in updating product",error)
       return{return : false, message:"Internal server error"}
    }   
  }


}));

// fetchProducts : async () =>{
//   const res = await fetch('http://localhost:5000/api/products/get');
//   const data = await res.json();
//   set({products:data.data});
// }
