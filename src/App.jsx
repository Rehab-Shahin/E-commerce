import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home1 from "./Pages/home1/Home1";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import MainLayout from "./Layout";
import CartPage from "./Pages/CartPage/CartPage";
import Wishlist from "./Pages/Wishlist/Wishlist";
import Checkouts from "./Pages/checkouts/checkouts";
import Account from "./Pages/Account/Account";
import Compare from "./Pages/Compare/Compare";
import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";
import Collections from "./Components/Collections/Collections";
import CategoryProduct from "./Pages/CaregoryProduct/CategoryProduct";
import SingleProductModal from "./Components/SingleProductModal/SingleProductModal";
import CartModal from "./Components/CartModal/CartModal";
import SearchModal from "./Components/SearchModal/SearchModal";
import LoginRequiredModal from "./Components/LoginRequiredModal/LoginRequiredModal";
import supabase from "./supabase";
import { useUserData, useCategories } from "./store";

export default function App() {
  const { restoreUser, setUser } = useUserData();
  const { setCategories, setProducts, setTeams } = useCategories();

  // Restore Zustand + localStorage
  useEffect(() => {
    restoreUser();
  }, []);

  // Restore Supabase session
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setUser(data.session.user, data.session.access_token);
      }
    });

    // Listen to auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser(session.user, session.access_token);
      } else {
        setUser(null, null);
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from("products").select("*");
      if (!error) setProducts(data);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from("team").select("*");
      if (!error) setTeams(data);
    };
    fetchProducts();
  }, []);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from("Category").select("*");
      if (!error) setCategories(data);
    };
    fetchCategories();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home1 />} />
          <Route path="/collections/:id" element={<CategoryProduct />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/checkouts" element={<Checkouts />} />
          <Route path="/about-Us" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
        <Route path="*" element={<h1>Error page 404</h1>} />
      </Routes>

      <SingleProductModal />
      <CartModal />
      <SearchModal />
      <LoginRequiredModal />
    </div>
  );
}
