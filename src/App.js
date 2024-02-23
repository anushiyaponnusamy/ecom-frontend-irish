
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import HomePage from "./pages/HomePage";
import About from "./pages/About";
import AddressForm from "./pages/user/addressForm";
import ContactPage from "./pages/ContactPage";
import PolicyPage from "./pages/PolicyPage";
import PageNotFound from "./pages/PageNotFound";
import RegisterPage from "./pages/registerAndLogin/Signin";
import LoginPage from "./pages/registerAndLogin/Login";
import Dashboard from "./pages/user/Profile";
import ProfileEdit from "./pages/user/profileEdit";
import PrivateRoute from "./components/Routes/PrivateRoute";
import Forgetpassword from "./pages/registerAndLogin/Forgetpassword";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateCategory from "./pages/admin/CreateCategory";
import CreateProduct from "./pages/admin/CreateProduct";
import UserList from "./pages/admin/UserList";
import ProductView from "./pages/admin/ProductView";
import CartPage from "./pages/user/cart";
import SearchPage from "./pages/search";
import WishlistPage from "./pages/user/wishlist";
// import BuyNow from "./pages/user/buyNowPage";
import Chats from "./pages/chat/chats";
const App = () => {
  return (
    <>

      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="chats" element={<Chats />} />
          <Route path="wishlist" element={<WishlistPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="address" element={<AddressForm />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="profile-edit" element={<ProfileEdit />} />
        </Route>
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/users" element={<UserList />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/products" element={<ProductView />} />
        </Route>

        <Route path="/forget-password" element={<Forgetpassword />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/policy" element={<PolicyPage />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
