import "./App.css";
import RestaurantSideNav from "./RestaurantSideNav";
import {BrowserRouter as Router, Routes, Route, RouterProvider} from "react-router-dom";
import Home from './site/Home'
import RestaurantUpdate from "./site/RestaurantUpdate";
import RestaurantCreate from "./site/RestaurantCreate"
import RestaurantGet from "./site/RestaurantGet";
import RestaurantSearch2 from "./site/RestaurantSearch2";
import RestaurantDelete from "./site/RestaurantDelete";
import UserGet from "./site/UserGet";
import UserCreate from "./site/UserCreate";
import UserDelete from "./site/UserDelete";
import ReviewCreate from "./site/ReviewCreate";
import ReviewSearch from "./site/ReviewSearch";

function App() {
    return (
        <Router>
            <RestaurantSideNav/>
            <Routes>
                <Route path='/home'  element={<Home/>} />
                <Route path='/restaurant'  element={<Home/>} />
                <Route path='/restaurant-create'  element={<RestaurantCreate/>} />
                <Route path='/restaurant-update'  element={<RestaurantUpdate/>} />
                <Route path='/restaurant-get'  element={<RestaurantGet/>} />
                <Route path='/restaurant-search2'  element={<RestaurantSearch2/>} />                
                <Route path='/restaurant-delete'  element={<RestaurantDelete/>} />
                <Route path='/user-get'  element={<UserGet/>} />
                <Route path='/user-create'  element={<UserCreate/>} />
                <Route path='/user-delete'  element={<UserDelete/>} />
                <Route path='/review-search'  element={<ReviewSearch/>} />
                <Route path='/review-create'  element={<ReviewCreate/>} />
            </Routes>
        </Router>
    );
}

export default App;