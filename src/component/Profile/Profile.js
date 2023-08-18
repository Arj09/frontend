import { useEffect, useState } from "react"
import { Http } from "../Http"

 
 
 
 
 
 
 export const Profile = ()=>{

    const [currentUser, setCurrentUser] = useState()
    const [show, setShow] = useState(false)


    useEffect(()=>{
        Http.get("/api/user/current", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("Token")}`,
            },
        }).then((res)=>{
            setCurrentUser(res.data)
            console.log(res.data)
           
             
        }).catch((err)=>{
            console.log(err)

        })
    },[])

    
    return(
        <>
        <div>
            {  currentUser ? (
                <>
                <div style={{textAlign:"center"}}>{currentUser.username}</div>
                <div style={{textAlign:"center"}}>{currentUser.email}</div>
                </>
            ):(
                <>
                Please wait , we are loading data
                </>
            )
                
                
            }
        </div>
        
        
        </>
    )
}