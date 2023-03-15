import { useEffect, useState } from "react";
import axios from "axios";


const useFetch = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage, setMoviesPerPage] = useState(1);
  const [currentResPage, setcurrentResPage] = useState(1);
  const [restaurantsPerPage, setRestaurantsPerPage] = useState(1);
  const [error, setError] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_IMAGE}/api/restaurants`);
        setData(res.data);
        setError(null);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const lastIndex = currentResPage * restaurantsPerPage;
  const firstIndex = lastIndex - restaurantsPerPage;
  const newData = data.slice(firstIndex, lastIndex);

  return {
    data,
    currentPage,
    setCurrentPage,
    moviesPerPage,
    setMoviesPerPage,
    setcurrentResPage,
    restaurantsPerPage,
    error,
    isLoading,
    firstIndex,
    lastIndex,
    newData,
  };
};

export default useFetch;
