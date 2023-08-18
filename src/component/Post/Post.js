import { useEffect, useState } from "react"
import  Navbar from "../Navbar/Navbar"
import "./Post.css"
import { Http } from "../Http"
import {useNavigate} from 'react-router-dom'
import MoreVertIcon from '@mui/icons-material/MoreVert';


export const Post = ()=>{

    const [data, setData]= useState([])
    const [data1, setData1]= useState({})
    const [commentdata, setCommentdata] = useState([])
    const [comment, setComment] = useState(false)
    const [commentText, setCommentText] = useState({})
    const [next, setnext] = useState(1)
    const [id, setid] = useState()
    const [hide, setHide] = useState(true)
    const naviagte = useNavigate()
    const [buttonshow, setButtonshow] = useState(false)
    const [popid, setpopid] = useState()
    const [buttonaction, setbuttonAction] = useState(false)
    const [actionid, setactionID] = useState()
    const [commentStore, setCommentStore] = useState()
    const [currentUser, setCurrentUser] = useState()
    const [postID, setpostId] = useState()
    const [hidecommentBox, setHidecommentBox] = useState(false)
    const [commentEditID, setcommentEditID] = useState()
    



    


   


    

    



    const handleComment =(index, id)=>{
        comment ? setComment(false) : setComment(true);
        setpostId(id)
       
        setid(index)

    }
    const handlepopupHide = (index)=>{
        buttonshow ? setButtonshow(false) : setButtonshow(true)
        setpopid(index)
        
    }
    const handlecommentAction = (index)=>{
        buttonaction ? setbuttonAction(false) : setbuttonAction(true);
        setactionID(index)

    }

    const handleCommentText =(e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setCommentText(commentText=>({...commentText, [name]:value}))
    }


    const handleCommentUpdatebtn = (e)=>{
        e.preventDefault();
        
        Http.put(`api/user/comment/${commentEditID}`,{
            comment: commentText.comment,
          
        },{
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("Token")}`,
               
            }
        }).then((res)=>{
            setHidecommentBox(false)
            console.log(res.data)
        }).catch((err)=>{
            console.log(err)
        })
        setCommentText({comment:''})


    }
    const handleCommentbtn = (e, id) =>{
        e.preventDefault()
        setCommentdata(commentdata=>([...commentdata, commentText]))
        setCommentText({comment:''})


        Http.post('/api/user/comment',{
            comment: commentText.comment,
            blog_id:id

        },{
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("Token")}`,
               
            }
        }).then((res)=>{
            console.log(res.data)
        }).catch((err)=>{
            console.log(err)
        })


    }

    const handlePostdata = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setData1(data1=>({...data1, [name]:value}))

    }
    const handlePostdatabtn = (e)=>{
        e.preventDefault()
        setData(data=>([...data, data1]))
        setData1({title:'', description:''})

        Http.post("/api/user/post",{
            title:data1.title,
            description: data1.description

        },{
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("Token")}`,
            },
        }).then((res)=>{
            console.log(res.data)
        }).catch((err)=>{
            console.log(err)
        })

    }

    const handlePostedit = (id)=>{
        localStorage.setItem("Edit_id", id)
        naviagte("/updatepost")

    }

   
    const handleHide = ()=>{
        buttonshow ? setButtonshow(false) : setButtonshow(true)
    }

    const handleEditID = (id)=>{
        setcommentEditID(id)
       
        hidecommentBox ? setHidecommentBox(false): setHidecommentBox(true)
    }
    const handleDeleteComment = (id)=>{
        Http.delete(`/api/user/comment/${id}`,{
            headers:{
                "Content-Type": "application/json",
                Authorization : `Bearer ${localStorage.getItem('Token')}`

            }
        }).then((res)=>{
            console.log(res.data)
        }).catch((err)=>{
            console.log(err)
        })

    }

    const handleDeletePost = (id)=>{
        Http.delete(`/api/user/post/${id}`,{
            headers:{
                "Content-Type": "application/json",
                Authorization : `Bearer ${localStorage.getItem('Token')}`
            }

        }).then((res)=>{
            console.log(res.data.response.message)
        }).catch((err)=>{
            console.log(err)
        })

    }


    useEffect(()=>{
        Http.get('/api/user/comment',{
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("Token")}`,
            }
        }).then((res)=>{
            setCommentStore(res.data)
            console.log(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    },[handleDeleteComment,handleCommentbtn])

    useEffect(()=>{
        Http.get("/api/user/post",{
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("Token")}`,
            }

        }).then((res)=>{
            setData(res.data)
            console.log(res.data)
            console.log(data)

        }).catch((err)=>{
            console.log(err)
        })
    },[handleDeletePost,handlePostdatabtn])


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
            naviagte("/")

        })
    },[])

   




    return(
        <>
        <Navbar/>
       
        <div className="main-title">Write Blog</div>

        <form className="createpost" onSubmit={handlePostdatabtn}>
            <input placeholder="Enter title.."   name="title" value={data1.title} onChange={handlePostdata}  required/>
            <textarea placeholder="Enter description.." name="description" value={data1.description} onChange={handlePostdata}  required/>
            <button>Post</button>
            
        </form>


        
        <ul className="post">
            <li className="bothIconandtitle">
                        
                        <li className="title">Our Story</li>
                        <li className="deleteIcon" onClick={handleHide}>
                            <li><MoreVertIcon/></li>
                            <ul className={buttonshow ? "delete1" : "delete"} >
                                <li className="deleteoption">Edit</li>
                                <li className="deleteoption">Delete</li>
                                
                            </ul>
                        </li>
            </li>
            <li className="description">India is one of the world's most attractive countries, and multiple factors have 
            increased its popularity among tourists. Its natural wonders, artificial marvels, national parks, theme parks, 
            etc., have made it a popular name for tourism. Further, it is a land famous for its diverse cultures and enchanting
             landscapes.</li>
            <li className="comment" onClick={handleComment}>Comment</li>

            <form className={comment ? "commentbox1" : "commentbox"} onSubmit={handleCommentbtn} >
                <input placeholder="comment..."  name="comment" value={commentText.comment} onChange={handleCommentText}  required/>
                <button >send</button>
                
            </form>
            <li className={comment ? "commenttextbox1": "commenttextbox"}>
            {
                    commentdata.map((data, index)=>{
                        return(
                            <ul className="commenttext" key={index}>
                                <li>{data.comment}</li>
                            </ul>
                        )
                    })
                }
            </li>
        </ul>

        {
            data.map((data, index)=>{
                return(
                    <ul className="post" key={index}>
                        <li className="bothIconandtitle">
                        
                        <li className="title">{data.title}</li>
                        <li className={currentUser.id == data.user_id ? "deleteIcon" : "deleteIcon1"} onClick={()=>handlepopupHide(index)}>
                            <li><MoreVertIcon/></li>
                            <ul className={buttonshow  && index === popid ? "delete" : "delete1"} >
                               
                                <li className="deleteoption" onClick={()=>handlePostedit(data._id)}>Edit</li>
                                <li className="deleteoption" onClick={()=>handleDeletePost(data._id)}>Delete</li>
                                
                            </ul>
                        </li>
                        </li>
                        <li className="description">{data.description}</li>
                        <li className="comment" onClick={()=>handleComment(index, data._id)}>Comment</li>
                       
        
                        {
                            hidecommentBox ?(
                                <>
                                <form className={comment && index === id  ? "commentbox" : "commentbox1"} onSubmit={handleCommentUpdatebtn} >
                                    <input placeholder=" update comment..."  name="comment" value={commentText.comment} onChange={handleCommentText}  required/>
                                    <button >Update</button>
                        
                                </form>
                                
                                
                                
                                </>
                            ):(
                                <>
                                <form className={comment && index === id  ? "commentbox" : "commentbox1"} onSubmit={(e)=>handleCommentbtn(e, data._id)} >
                                    <input placeholder="comment..."  name="comment" value={commentText.comment} onChange={handleCommentText}  required/>
                                    <button >send</button>
                        
                                </form>
                        
                                <li className={comment && index == id  ? "commenttextbox": "commenttextbox1"}>
                                {
                                    commentStore.map((data, index)=>{
                                
                                        return(
                                            <ul className={ data.blog_id == postID  ? "commenttext" : "commenttext1"} key={index}>
                                        
                                                <li >{data.comment}</li>
                                       
                                                <li className={data.user_id == currentUser.id ? "deleteIcon" : "deleteIcon1"} onClick={()=>handlecommentAction(index)}>
                                                    <MoreVertIcon/>
                                                <ul className={ buttonaction && index == actionid ? "commentaction" : "commentaction1"}>
                                                    <li className="action" onClick={()=>handleEditID(data._id)}>Edit</li>
                                                    <li className="action" onClick={()=>handleDeleteComment(data._id)}>Delete</li>
                                                </ul>
                                                </li>
                                            </ul>
                                        )
                                    })
                                }
                                </li>
                                </>
                            )
                        }
                </ul>

                )
            })
        }
        

        
       
        
        
        </>
    )
}