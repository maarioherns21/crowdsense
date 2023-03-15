import Pagination from "../../PaginationRestaurant/Pagination";
import ImageItems from "../../RestaurantImageItems/ImageItems";


const RestaurnantList =  ({newData, data, restaurantsPerPage, setcurrentResPage, setCurrentPage, moviesPerPage , currentPage}) => {

    return  (
        <div>
       {newData.map((movie) => {
        const indexOfLastImage = currentPage * moviesPerPage;
        const indexOfFirstImage = indexOfLastImage - moviesPerPage;
        const currentImage = movie.fileImage.slice(indexOfFirstImage, indexOfLastImage);
       
        return (
          <div key={movie._id}>
            <h1>{movie.name}</h1>
          <ImageItems currentImage={currentImage} API_IMAGE={process.env.REACT_APP_API_IMAGE} movie={movie} moviesPerPage={moviesPerPage} setCurrentPage={setCurrentPage} />
          </div>
        );
      })}
      <Pagination  totalMovies={data.length} moviesPerPage={restaurantsPerPage} setCurrentPage={setcurrentResPage}/>
        </div>
    )
}

export default RestaurnantList