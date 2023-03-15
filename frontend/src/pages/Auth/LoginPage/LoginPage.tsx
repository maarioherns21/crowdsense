import {  useLoadScript } from "@react-google-maps/api"
import Autocomplete from "react-google-autocomplete";
import axios from "axios"
import { useState } from "react"
import { Link } from "react-router-dom"

const options = {
    fields: ["address_components", "geometry"],
    types: ["address"],
  };
  
const libraries: any = ["places", "maps"];

const LoginPage = () => {
const GOOGLE_API: any = process.env.REACT_APP_GOOGLE_API_KEY
const [formFile, setFormFile] =useState({ email :"" , password: ""})

const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
    const token = {...formFile}
    console.log(token)
  
        
    } catch (error: any) {
        console.log(error.message)
    }
}

const { isLoaded } = useLoadScript({
    libraries,
    googleMapsApiKey: GOOGLE_API || "",
  });

const [address, setAddress] = useState<any>(null);
/// this fetches the data from  the api adress
const fetchD = async (place: any) => {
    try {
      setAddress(null); // Reset the address
      const res = await place;
      console.log(res);
      setAddress(res);
    } catch (error: any) {
      console.log(error.message);
    }
  };



    return  isLoaded ?  (
        <>
       <div>
          <Autocomplete
        apiKey={GOOGLE_API}
        style={{ width: "90%" }}
        onPlaceSelected={fetchD}
        options={options}
        defaultValue=""
      />
        <form onSubmit={handleSubmit}>
            <input value={formFile.email}  onChange={(e) => setFormFile({...formFile , email: e.target.value})} />
            <input value={formFile.password}  onChange={(e) => setFormFile({...formFile , password: e.target.value})}  />
            <button>Submit</button>
        </form>
        <Link to="/register">
            Sign up 
        </Link>
       </div>
       </>
    ) : (
        <></>
    )
}

export default LoginPage