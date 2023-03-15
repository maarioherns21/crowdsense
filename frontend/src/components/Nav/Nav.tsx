import { Link } from "react-router-dom"



const Nav = () => {

    return (
        <div>
        <Link  to={"/"}>Home</Link>
         <Link  to={"/form"}>Form</Link>
         <Link to={"/user/:id"}>Profile</Link>
        </div>
    )
}


export default Nav