import { FC, useState } from "react";
import axios from "axios";
import Autocomplete from "react-google-autocomplete";


const list: any = [{ id: 1 , country: "usa" },{ id: 2 , country: "africa" },{ id: 3, country: "cambodia"},{ id: 4 , country: "italy"},{ id: 5 , country: "spain"},]

const options = {
  fields: ["address_components", "geometry"],
  types: ["address"],
};

interface FormFile {
  name: string;
  email: string;
  password: string;
  address: {
    number: string;
    street: string;
    zip: string;
    state: string;
    city: string;
    country: string;
  };
  bio: string;
}

const RegisterPage: FC = () => {
 const GOOGLE_API: any = process.env.REACT_APP_GOOGLE_API_KEY;
 const [address1, setAddress] = useState<any>(null);
  const [formFile, setFormFile] = useState<FormFile>({
    name: "",
    email: "",
    password: "",
    address: {
      number: "",
      street: "",
      zip: "",
      state: "",
      city:  "",
      country: "",
    },
    bio: "",
  });

  const [image, setImage] = useState<File>();
console.log(address1?.address)
 

  /// this fetches the data from  the api adress
  const fetchD = async (place: any) => {
    try {
      setAddress(null); // Reset the address
      const response = await place;
        ///here is where im at  /// testing this code to past 
      // console.log(response?.address_components.find((component: any) => component.types.includes("postal_code"))?.long_name || "",)
       console.log(response)
       const addressComponents = response?.address_components;
       setAddress({
        address: {
          number: addressComponents.find((component: any) => component.types.includes("street_number"))?.long_name || "",
          street: addressComponents.find((component: any) => component.types.includes("route"))?.long_name || "",
          zip: addressComponents.find((component: any) => component.types.includes("postal_code"))?.long_name || "",
          state: addressComponents.find((component: any) => component.types.includes("administrative_area_level_1"))?.long_name || "",
          city: addressComponents.find((component: any) => component.types.includes("locality"))?.long_name || "",
          country: addressComponents.find((component: any) => component.types.includes("country"))?.long_name || "",
        },
        
      });
    
    } catch (error: any) {
      console.log(error.message);
    }
  };


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name",  formFile.name);
      formData.append("email", formFile.email);
      formData.append("password", formFile.password);
      formData.append("address[number]", address1?.address.number || formFile.address.number);
      formData.append("address[street]", address1?.address.street || formFile.address.street);
      formData.append("address[zip]",    address1?.address.zip || formFile.address.zip);
      formData.append("address[state]", address1?.address.state || formFile.address.state);
      formData.append("address[city]", address1?.address.city || formFile.address.city);
      formData.append("address[country]", address1?.address.country || formFile.address.country);
      formData.append("bio", formFile.bio);
      if (image) {
        formData.append("photo", image);
      }

      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const res = await axios.post("http://localhost:3001/api/users/add", formData, config);
      console.log(res.data);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  


    return (
        <div>
       <Autocomplete
        apiKey={GOOGLE_API}
        style={{ width: "90%" }}
        onPlaceSelected={fetchD}
        options={options}
        placeholder="Enter your address"
      />
        <form onSubmit={handleSubmit} autoComplete="on"  >
        <input type="text" name="name"  onChange={(e => setFormFile({...formFile, name: e.target.value}))} />
        <input type="email" name="email"  onChange={e => setFormFile({...formFile, email: e.target.value})} />
        <input type="password" name="password"  onChange={e => setFormFile({...formFile, password : e.target.value})} />
        <input type="text" name="address[number]" autoComplete="on" onChange={(e) => setFormFile({...formFile, address: {...formFile.address , number: e.target.value  }})} />
        <input type="text" name="address[street]"  autoComplete="on" onChange={(e) => setFormFile({...formFile, address: {...formFile.address , street: e.target.value  }})} />
        <input type="text" name="address[zip]"  onChange={(e) => setFormFile({...formFile, address: {...formFile.address , zip: e.target.value  }})} />
        <input type="text" name="address[state]"  onChange={(e) => setFormFile({...formFile, address: {...formFile.address , state: e.target.value  }})} />
        <input type="text" name="address[city]"  onChange={(e) => setFormFile({...formFile, address: {...formFile.address , city: e.target.value  }})} />
        {/* <select  name="address[country]"  onChange={(e) => setFormFile({...formFile, address: {...formFile.address , country: e.target.value  }})} >
        {list.map((l :any) => (
            <option key={l.id} >{l.country}</option> 
        ))}
        </select> */}
        <input type="text" name="address[country]"  onChange={(e) => setFormFile({...formFile, address: {...formFile.address , country: e.target.value  }})} />
        <textarea name="bio" value={formFile.bio} onChange={(e) => setFormFile({...formFile, bio: e.target.value})} />
         
        <input type="file" name="image" onChange={(e: any ) => setImage(e.target.files[0])} />
     
        <button type="submit">Submit</button>
      </form>
        </div>
    )
}

export default RegisterPage