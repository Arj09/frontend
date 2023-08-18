import { useState } from "react"
import "./Update.css"
import { useNavigate } from "react-router-dom";
import { Http } from "../Http";

export const UpdatePost = ()=>{

    const [data1, setData1]= useState({});

    const updateId = localStorage.getItem("Edit_id")
    const navigate = useNavigate()


    const handlePostdata = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setData1(data1=>({...data1, [name]:value}))

    }

    const handlePostdatabtn = (e)=>{
        e.preventDefault()
       
        

        Http.put(`/api/user/post/${updateId}`,{
            title:data1.title,
            description: data1.description

        },{
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("Token")}`,
            },
        }).then((res)=>{
            console.log(res.data)
            localStorage.removeItem("Edit_id")
            navigate("/post")
            
        }).catch((err)=>{
            console.log(err)
        })
        setData1({title:'', description:''})

    }
    return(
        <>
        <div className="main-title">update blog</div>

        <form className="createpost" onSubmit={handlePostdatabtn}>
            <input placeholder="Enter title.."   name="title" value={data1.title} onChange={handlePostdata}  required/>
            <textarea placeholder="Enter description.." name="description" value={data1.description} onChange={handlePostdata}  required/>
            <button>Post</button>

        </form>
        
        </>
    )
}