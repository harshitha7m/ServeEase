import { useEffect, useState } from "react"
import axios from "axios"
import API_URL from "../config/api"

function Provider() {

const [bookings, setBookings] = useState([])
const [services, setServices] = useState([])

const [serviceId, setServiceId] = useState("")
const [location, setLocation] = useState("")
const [phone, setPhone] = useState("")
const [newService, setNewService] = useState("")

useEffect(() => {
  fetchBookings()
  fetchServices()
}, [])


/* ===========================
   FETCH BOOKINGS
=========================== */

const fetchBookings = async () => {

try{

const userId = localStorage.getItem("userId")

const providerRes = await axios.get(
`${API_URL}/api/providers/user/${userId}`
)

if(!providerRes.data){
console.log("Provider not found")
return
}

const res = await axios.get(
`${API_URL}/api/bookings/provider/${providerRes.data._id}`
)

setBookings(res.data)

}catch(err){
console.log(err)
}

}


/* ===========================
   UPDATE BOOKING STATUS
=========================== */

const updateStatus = async(id,status)=>{

try{

await axios.put(
`${API_URL}/api/bookings/${id}`,
{status}
)

fetchBookings()

}catch(err){
console.log(err)
}

}


/* ===========================
   FETCH SERVICES
=========================== */

const fetchServices = async () => {

try{

const res = await axios.get(
`${API_URL}/api/services`
)

setServices(res.data)

}catch(err){
console.log(err)
}

}


/* ===========================
   ADD SERVICE DETAILS
=========================== */

const addService = async () => {

try{

const userId = localStorage.getItem("userId")
const name = localStorage.getItem("name")

await axios.put(
`${API_URL}/api/providers/service`,
{
name,
serviceId,
location,
phone,
userId
}
)

alert("Service Added Successfully")

setLocation("")
setPhone("")
setServiceId("")

}catch(err){
console.log(err)
}

}


/* ===========================
   CREATE NEW SERVICE
=========================== */

const createService = async () => {

try{

if(!newService){
alert("Enter service name")
return
}

await axios.post(
`${API_URL}/api/services`,
{ name:newService }
)

alert("Service Created")

fetchServices()

setNewService("")

}catch(err){
console.log(err)
}

}


/* ===========================
   UI
=========================== */

return(

<div className="provider-page">

<h2>Provider Dashboard</h2>

<div className="provider-dashboard">

{/* LEFT SIDE FORM */}

<div className="add-service-form">

<h3>Add New Service</h3>

<input
placeholder="Enter New Service"
value={newService}
onChange={(e)=>setNewService(e.target.value)}
/>

<button onClick={createService}>
Add Service
</button>

<select
value={serviceId}
onChange={(e)=>setServiceId(e.target.value)}
>

<option>Select Service</option>

{
services.map((s)=>(
<option key={s._id} value={s._id}>
{s.name}
</option>
))
}

</select>

<input
placeholder="Enter Location"
value={location}
onChange={(e)=>setLocation(e.target.value)}
/>

<input
placeholder="Enter Phone"
value={phone}
onChange={(e)=>setPhone(e.target.value)}
/>

<button onClick={addService}>
Save
</button>

</div>


{/* RIGHT SIDE BOOKINGS */}

<div className="provider-bookings">

<h3>Your Bookings</h3>

<div className="booking-grid">
{
bookings.map((b)=>(

<div className="booking-card" key={b._id}>

<h3>{b.userId?.name}</h3>

<p>Date: {b.date}</p>
<p>Time: {b.timeSlot}</p>
<p>Status: {b.status}</p>

<div className="booking-buttons">

<button
className="accept-btn"
onClick={()=>updateStatus(b._id,"accepted")}
>
Accept
</button>

<button
className="reject-btn"
onClick={()=>updateStatus(b._id,"rejected")}
>
Reject
</button>

</div>

</div>

))
}

</div>

</div>

</div>

</div>

)

}

export default Provider