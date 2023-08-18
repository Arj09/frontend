

import { BrowserRouter, Route, Routes} from "react-router-dom"
import { Home } from "./component/Home/Home";
import { Post } from "./component/Post/Post";
import { UpdatePost } from "./component/Updatepost/UpdatePost";
import { Profile } from "./component/Profile/Profile";

function App() {
  return (
   <>
   <BrowserRouter>
   <Routes>
    <Route index element={<Home/>} />
    <Route path="/post" element={<Post/>} />
    <Route path="/updatepost" element={<UpdatePost/>} />
    <Route path="/profile" element={<Profile/>} />
   </Routes>
   </BrowserRouter>
   
   
   
   </>
  );
}

export default App;
