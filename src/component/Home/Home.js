import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { Http} from "../Http"
import "./Home.css"

export const Home = ()=>{
    const [show, setShow] = useState(true);
    const [loginUser, setloginUser] = useState({})
    const [registerUser, setregisterUser] = useState({})
    const navigate = useNavigate()

    const handleLogindata = (e)=>{
        const name = e.target.name;
        const  value =  e.target.value;
        setloginUser(loginUser=>({...loginUser, [name]:value}))

    }
    const handlelogin = (e)=>{
        e.preventDefault();
        Http.post("/api/user/login",{
            email:loginUser.email,
            password:loginUser.password
        }).then((res)=>{
            localStorage.setItem("Token", res.data.accessToken)
            navigate("/post")
        }).catch((err)=>{
            console.log(err)
        })
        
    
    
    }

    const handleGotosignup = ()=>{
        setShow(false)

    }




    return(
        <>
        {
            show ? (
                <>
                
                <form onSubmit={handlelogin} className="loginform">
                    <label className="title">Blog Application</label>
                    <input placeholder="Ex. arjun@gmail.com"  name="email" value={loginUser.email} onChange={handleLogindata}/>
                    <input placeholder="Ex. password"  name="password" value={loginUser.password} onChange={handleLogindata}/>
                    <button>Login</button>
                    <button onClick={handleGotosignup}>Click new account</button>
                   

                </form>
               
                
                
                </>
            ) :(
                <>

                <form onSubmit={handlelogin} className="loginform">
                    <label className="title">Blog Application</label>
                    <input placeholder="Ex. arjun@gmail.com"  name="email" value={loginUser.email} onChange={handleLogindata}/>
                    <input placeholder="Ex. password"  name="password" value={loginUser.password} onChange={handleLogindata}/>
                    <button>Login</button>

                </form>
                
                
                
                
                </>
            )
        }
        
        </>
    )
}