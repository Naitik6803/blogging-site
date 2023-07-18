import logo from './logo.svg';
import './App.css';
import './Navbar.js'
import Navbar from "./Navbar";
import Authentication from "./oauth";
import {useState,useEffect} from "react";
import {Routes, Route, useNavigate} from "react-router-dom";
import MainPage from "./MainPage";
import PostForm from "./newPost";
import MyPostsPage from "./myPost";
function App() {

    const [user,setUser]=useState({
        name:'',
        email:'',
        id:'',
    });
    const [posts, setPosts] = useState([]);
    const history=useNavigate();
    useEffect(()=>{
        console.log(user);
        if(user.email!=''){
            history("/mainpage");
        }
        else history("/");
    },[user]);

  return (
    <div className="App">
        {/*<Authentication/>*/}
        <Routes>
            <Route path={"/"} element={<Authentication props={{user:user,setUser:setUser}}/>}/>
            <Route exact path={"/newpost"} element={<PostForm user={user} setUser={setUser}/>}/>
            <Route exact path={"/mypost"} element={<MyPostsPage user={user} setUser={setUser} posts={posts} setPosts={setPosts}/>}/>
            <Route exact path={"/mainpage"} element={<MainPage posts={posts} setPosts={setPosts} user={user} setUser={setUser} history={history}/>}/>
        </Routes>
    </div>
  );
}

export default App;
