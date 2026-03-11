import { Navigate } from "react-router-dom"

function ProtectedProvider({children}){

const role = localStorage.getItem("role")

if(role !== "provider"){
return <Navigate to="/services"/>
}

return children
}

export default ProtectedProvider