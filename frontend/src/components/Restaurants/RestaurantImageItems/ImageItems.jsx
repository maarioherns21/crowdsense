import PaginationImage from "../PaginationRestaurant/PaginationImage"







const ImageItems = ({currentImage, movie, moviesPerPage, setCurrentPage, API_IMAGE, }) => {

    return(
        <div>
              {currentImage.map((image, index) => (
                <div key={index}>
                  <img  src={`${API_IMAGE}/${image}`}  alt={`${movie.name} image`}  style={{ maxHeight: "420px" }} />
                </div>
              ))}
               <PaginationImage  totalMovies={movie.fileImage.length}  moviesPerPage={moviesPerPage}  setCurrentPage={setCurrentPage}  />
        </div>
    )
}

export default ImageItems