import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import API_URL from "../config/api"

function SearchBar(){

const [service,setService] = useState("")
const navigate = useNavigate()

const searchService = async()=>{

try{

const res = await axios.get(`${API_URL}/api/services`)

const services = res.data

const matchedService = services.find(
(s)=> s.name.toLowerCase() === service.toLowerCase()
)

if(!matchedService){
alert("Service not found")
return
}

navigate(`/providers/${matchedService._id}`)

}catch(err){
console.log(err)
}

}

return(

<div className="search-bar">

<input
placeholder="Search services (Electrician, Plumber)"
value={service}
onChange={(e)=>setService(e.target.value)}
/>

<button onClick={searchService}>
Search
</button>

</div>

)

}

export default SearchBar