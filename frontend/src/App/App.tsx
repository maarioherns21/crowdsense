import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import RestaurantForm from "../components/Restaurants/FormRestaurants/Form";
import Home from "../pages/Home/Home";
import DetailPageRestaurant from "../pages/DetailPages/DetailPageRestaurant/DetailPageRestaurant";
import DetailPageBar from "../pages/DetailPages/DetailPageBar/DetailPageBar";
import Nav from "../components/Nav/Nav";
import { useState } from "react";
import LoginPage from "../pages/Auth/LoginPage/LoginPage";
import RegisterPage from "../pages/Auth/RegisterPage/RegisterPage";
import ProfilePage from "../pages/ProfillePage/ProfilePage";

function App() {
const [token ,setToken] =useState(true)


if(token) {

  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user/:profile"  element={<ProfilePage />} />
            <Route path="/form" element={<RestaurantForm />} />
            <Route path="/restaurant/:id" element={<DetailPageRestaurant />} />
            <Route path="/bar/:id" element={<DetailPageBar />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}
return (
  <div className="App">
  <header className="App-header">
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/*" element={<Navigate to="/login" />}/>
      </Routes>
    </BrowserRouter>
  </header>
</div>
)

}

export default App;
