import { useNavigate } from "react-router-dom"

function ProviderCard({provider}){

const navigate = useNavigate()

return(

<div className="provider-card">

<img
src={provider.image || "https://dummyimage.com/150x150/cccccc/000000&text=Provider"}
alt="provider"
/>

<h3>{provider.name}</h3>

<p>📍 {provider.location}</p>

<p>📞 {provider.phone}</p>

<p>⭐ Rating: {provider.rating || "4.5"}</p>

<button onClick={()=>navigate(`/provider-details/${provider._id}`)}>
View Details
</button>

</div>

)

}

export default ProviderCard