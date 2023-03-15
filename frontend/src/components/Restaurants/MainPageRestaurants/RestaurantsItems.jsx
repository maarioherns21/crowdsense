import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../PaginationRestaurant/Pagination";
// import ImageItems from "../RestaurantImageItems/ImageItems";
import ImageItems from "../RestaurantImageItems/ImageItems";
import { useNavigate } from "react-router";
import RestaurnantList from "./RestaurantList/RestaurantList";
import useFetch from "../../useHooks/useFetch/useFetch";



const RestaurantsItems = () => {
const { data, currentPage, setCurrentPage, moviesPerPage, setMoviesPerPage, setcurrentResPage, restaurantsPerPage, error, isLoading, newData, API_IMAGE} =useFetch()
  


  return (
    <div>
      <div>{error ? error : null}</div>
      <div>{isLoading ? "Loading..." : ""}</div>
    <RestaurnantList newData={newData} data={data} restaurantsPerPage={restaurantsPerPage} setcurrentResPage={setcurrentResPage} API_IMAGE={API_IMAGE}  setCurrentPage={setCurrentPage} moviesPerPage={moviesPerPage} currentPage={currentPage} />
    </div>
  );
};

export default RestaurantsItems;



