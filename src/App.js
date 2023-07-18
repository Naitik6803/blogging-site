import logo from './logo.svg';
import './App.css';
import './Navbar.js'
import Navbar from "./Navbar";
import Authentication from "./oauth";
import {useState,useEffect} from "react";
import {Routes, Route, useNavigate} from "react-router-dom";
import MainPage from "./MainPage";
function App() {

    const [user,setUser]=useState({
        name:'',
        email:'',
        id:'',
    });
    const [posts, setPosts] = useState([]);
    const history=useNavigate();
    useEffect(()=>{
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
            <Route exact path={"/mainpage"} element={<MainPage posts={posts} setPosts={setPosts} user={user} setUser={setUser} />}/>
        </Routes>
    </div>
  );
}

export default App;
