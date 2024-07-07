
import React, { createContext, useState, useEffect } from 'react';
import {
  createTables,
  addProduct,
  getProducts,
  updateProductQuantity,
  updateProductExportDate,
  updateTotalProducts,
  updateTotalOrders,
  getTotalProducts,
  getTotalOrders,
  updateTotalRevenue,
  getTotalRevenue,
  getSoldProducts
} from './database';

export const WarehouseContext = createContext();

export const WarehouseProvider = ({ children }) => {
  const [hangHoa, setHangHoa] = useState([]);
  const [totalProduct, setTotalProduct] = useState(0);
  const [totalOrder, setTotalOrder] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [soldProducts, setSoldProducts] = useState([]);
  useEffect(() => {
    createTables();
    fetchProducts();
    fetchTotalProducts();
    fetchTotalOrders();
    fetchTotalRevenue();
    fetchSoldProducts();
  }, []);

  const fetchProducts = () => {
    getProducts(setHangHoa);
  };

  const fetchTotalProducts = () => {
    getTotalProducts(setTotalProduct);
  };

  const fetchTotalOrders = () => {
    getTotalOrders(setTotalOrder);
  };

  const fetchTotalRevenue = () => {
    getTotalRevenue(setTotalRevenue);
  };

  const fetchSoldProducts = () => {
    getSoldProducts(setSoldProducts);
  };

  const addHangHoa = (item) => {
    const existingProduct = hangHoa.find((p) => p.id === item.id);

    if (existingProduct) {
      const updatedQuantity = existingProduct.quantity + item.quantity;
      updateProductQuantity(item.id, updatedQuantity);
      updateTotalProducts(item.quantity);
    } else {
      addProduct(item);
    }
    fetchProducts();
    fetchTotalProducts();
  };


  const placeOrder = (id) => {
    const product = hangHoa.find((p) => p.id === id);
    if (product) {
      const updatedQuantity = product.quantity - 1;
      if (updatedQuantity >= 0) {
        updateProductQuantity(id, updatedQuantity);
        updateProductExportDate(id, new Date().toLocaleDateString());
        updateTotalOrders();
        updateTotalRevenue(1000);  // Mặc định mỗi sản phẩm có giá 1000$
        fetchProducts();
        fetchTotalOrders();
        fetchTotalRevenue();
        fetchSoldProducts();
      }
    }
  };

  return (
    <WarehouseContext.Provider
      value={{ hangHoa, addHangHoa, placeOrder, totalProduct, totalOrder, fetchProducts, fetchTotalProducts, fetchTotalOrders, totalRevenue, soldProducts, fetchTotalRevenue, fetchSoldProducts}}
    >
      {children}
    </WarehouseContext.Provider>
  );
};
