import React, { useState } from "react";
import Dropzone, { DropzoneState } from "react-dropzone";
import axios from "axios";
import { useNavigate } from "react-router";


const RestaurantForm = () => {
  const [data, setData] = useState({
    name: "",
    address: "",
    latitude: "",
    longitude: "",
    cuisine: "",
    priceRange: "",
    rating: "",
  });
  const [file, setFile] = useState("");
  const router = useNavigate("/")
  // const handleImageChange = e => {
  //   setFile(Array.from(e.target.file));
  // };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let formData = new FormData();
      formData.append("name", data.name);
      formData.append("address", data.address);
      formData.append("latitude", data.latitude);
      formData.append("longitude", data.longitude);
      formData.append("cuisine", data.cuisine);
      formData.append("priceRange", data.priceRange);
      formData.append("rating", data.rating);
      // formData.append("photo", file);
      for (let i = 0; i < file.length; i++) {
        formData.append('photo', file[i]);
      }
      // file.forEach(image => {
      //   formData.append('photo', image);
      // });
      console.log(file);
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      await axios.post(
        "http://localhost:3001/api/restaurants/add",
        formData,
        config
      );
      router("/")
    } catch (error) {
      console.log(error.message);
    }
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const formData = new FormData();
  //   formData.append("name", name);
  //   formData.append("address", address);
  //   formData.append("latitude", latitude);
  //   formData.append("longitude", longitude);
  //   formData.append("cuisine", cuisine);
  //   formData.append("priceRange", priceRange);
  //   formData.append("rating", rating);
  //   formData.append(`photo`, photos);

  //   try {
  //     await axios.post("http://localhost:3001/api/restaurants/add", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });
  //     // success message or redirect
  //   } catch (error) {
  //     // error message
  //   }
  // };

  return (
    <div>
    <>
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
      </label>
      <label>
        Address:
        <input
          type="text"
          name="address"
          onChange={(e) => setData({ ...data, address: e.target.value })}
        />
      </label>
      <label>
        Latitude:
        <input
          type="text"
          name="latitude"
          onChange={(e) => setData({ ...data, latitude: e.target.value })}
        />
      </label>
      <label>
        Longitude:
        <input
          type="text"
          name="longitude"
          onChange={(e) => setData({ ...data, longitude: e.target.value })}
        />
      </label>
      <label>
        Cuisine:
        <input
          type="text"
          name="cuisine"
          onChange={(e) => setData({ ...data, cuisine: e.target.value })}
        />
      </label>
      <label>
        Price Range:
        <input
          type="text"
          name="priceRange"
          onChange={(e) => setData({ ...data, priceRange: e.target.value })}
        />
      </label>
      <label>
        Rating:
        <input
          type="text"
          name="rating"
          onChange={(e) => setData({ ...data, rating: e.target.value })}
        />
      </label>
      <input
        type="file"
        name="fileImage"
        // onChange={(e) => setFile(e.target.files[0])}
        onChange={(e) => setFile(Array.from(e.target.files))}
        multiple
      />

      <button type="submit">Submit</button>
    </form>
    </>
    </div>
  );
};

export default RestaurantForm;
