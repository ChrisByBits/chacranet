import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import ProductPage from "./pages/ProductPage";
import ShoppingCartPage from "./pages/CartPage";
import TransactionPage from "./pages/TransactionPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element = { <LoginPage /> }/>
        <Route path='/profile' element = { <ProfilePage /> }/>
        <Route path='/home' element = { <HomePage /> }/>
        <Route path='/cart' element = { <ShoppingCartPage /> }/>
        <Route path='/producto/:id' element = { <ProductPage /> }/>
        <Route path='/transaction' element = { <TransactionPage /> }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;