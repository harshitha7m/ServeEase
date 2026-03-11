import SearchBar from "../components/SearchBar"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import API_URL from "../config/api"

function Home(){

const navigate = useNavigate()

const services = [
{ name:"Electrician", icon:"⚡"},
{ name:"Plumber", icon:"🚰"},
{ name:"Carpenter", icon:"🪚"},
{ name:"Tutor", icon:"📚"},
{ name:"Painter", icon:"🎨"},
{ name:"Cleaning", icon:"🧹"}
]

const openService = async(serviceName)=>{

try{

const res = await axios.get(`${API_URL}/api/services`)

const service = res.data.find(
s => s.name.toLowerCase() === serviceName.toLowerCase()
)
console.log(serviceName)
console.log(res.data)

if(!service){
alert("Service not found in database")
return
}

navigate(`/providers/${service._id}`)

}catch(err){
console.log("Error fetching services:",err)
}

}

return(

<div className="home">

<div className="hero">

<h1>Find Trusted Local Services</h1>

<p>Search electricians, plumbers, tutors and more</p>

<SearchBar/>

</div>

<h2 className="popular-title">Popular Services</h2>

<div className="services-grid">

{services.map((s,index)=>(
<div
key={index}
className="service-card"
onClick={()=>openService(s.name)}
>

<div className="service-icon">{s.icon}</div>

<p>{s.name}</p>

</div>
))}

</div>

</div>

)

}

export default Home