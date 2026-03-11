import { Link } from "react-router-dom"

function Navbar(){

const userId = localStorage.getItem("userId")

const logout = () => {
localStorage.clear()
window.location.href = "/"
}

return(

<div className="navbar">

<div className="logo">
<Link to="/">Local Service Provider</Link>
</div>

<div className="nav-links">

<Link to="/">Home</Link>

<Link to="/services">Services</Link>

</div>

<div className="auth-buttons">

{userId ? (

<button className="logout-btn" onClick={logout}>
Logout
</button>

) : (

<>
<Link to="/login" className="login-btn">
Login
</Link>

<Link to="/register" className="register-btn">
Register
</Link>
</>

)}

</div>

</div>

)

}

export default Navbar