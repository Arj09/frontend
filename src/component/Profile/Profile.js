import { useEffect, useState } from "react"
import { Http } from "../Http"
import { useNavigate } from "react-router-dom"

 
 
 
 
 
 
 export const Profile = ()=>{

    const [currentUser, setCurrentUser] = useState()
    const [show, setShow] = useState(false)
    const naviagte = useNavigate()


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



    const handleBack = ()=>{
        naviagte("/post")
    }

    
    return(
        <>
        <div>
            {  currentUser ? (
                <div style={{textAlign:'center', margin:'200px auto', fontSize:'5vw'}}>
                    
                <div>{currentUser.username}</div>
                <div >{currentUser.email}</div>

                <button   style={{padding:"10px 20px", backgroundColor:'blue', color:'white', border:'0.2px solid blue'}} onClick={handleBack}>Back to post</button>
                </div>
            ):(
                <>
                <div style={{textAlign:"center", margin:'100px auto'}}>Please wait , we are loading data</div>
                </>
            )
                
                
            }
        </div>
        
        
        </>
    )
}