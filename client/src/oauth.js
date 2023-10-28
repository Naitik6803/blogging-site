import {useEffect, useState} from "react";
// import {response} from "express";
import jwtDecode from "jwt-decode";
import {Link, useNavigate} from "react-router-dom";
import "./auth.css"
// reference : https://www.youtube.com/watch?v=roxC8SMs7HU

// jwtDecode()
function Authentication(props){


    //....................google auth..........................................................
    // const handleCallBack= async (res)=>{
    //     console.log(jwtDecode(res.credential).name);
    //     props.props.setUser({...props.props.user,
    //         email:jwtDecode(res.credential).email,
    //         name:jwtDecode(res.credential).name,
    //     });
    // };
    // useEffect(()=>{
    //     /* global google */
    //     google.accounts.id.initialize({
    //         client_id: "1084427966313-re2co849j7jvu79diipbt2kritnds4os.apps.googleusercontent.com",
    //         callback: handleCallBack
    //     })
    //
    //     google.accounts.id.renderButton(
    //         document.getElementById("signInDiv"),
    //         { theme: "outline",size: "large"}
    //     )
    //     google.accounts.id.prompt();
    //
    // },[]);
    //...............................................................................



// .......................................................login............................................................
    const [olduser,setOlduser]=useState({
        email:'',
        password:'',
    });
    const handleChange2=(e)=>{
        clear1();
        setOlduser({
            ...olduser,
            [e.target.name]:e.target.value,
        });
        // console.log(olduser);
    }


    const clear2=()=>{
        setOlduser({
            password: '',email: '',
        });
    }
    const handleLogin= async ()=>{
        clear1();
        const res= await fetch('/signin',{
            method:'POST',
            headers:{
                "Content-type":"application/json",
            },
            body:JSON.stringify({
                "email":olduser.email,
                "password":olduser.password,
            })
        });
        console.log(res);
        const data= await res.json();
        console.log(data);
        if(res.status===200){
            console.log("Welcome!");
            console.log(res.name);
            props.props.setUser({
                ...props.props.user,
                name:data.name,
                email:data.email,
                id:data.id,
            });
        }
        else console.log("invalid bitch");
        clear2();
    };
    //................................................................................................................


// ....................................signup..............................................................
    const [newuser,setNewuser]=useState({
        name:'',
        email:'',
        password:'',
    });
    const handleChange1=(e)=>{
        clear2();
        setNewuser({
            ...newuser,
            [e.target.name]:e.target.value,
        });
        // console.log(newuser);
    }
    const clear1=()=>{
        setNewuser({
            name: '',email: '',password: '',
        });
    }
    const handleSignup= async ()=>{
        clear2();
        // console.log(newuser);
        console.log("hello");
        const res= await fetch('/register',{
            method:'POST',
            headers:{
                "Content-type":"application/json",
            },
            body:JSON.stringify({
                "name":newuser.name,
                "email":newuser.email,
                "password":newuser.password,
            })
        });
        console.log("he");
        const data= await res.json();
        console.log(data);
        if(res.status===200){
            console.log("User registered !");
            props.props.setUser({
                ...props.props.user,
                name:data.name,
                email:data.email,
                id:data.id,
            });
        }
        else{
            window.prompt("Please enter valid details!");
        }
        clear1();
    };
//........................................................................................................

    return (

        <div className="login-container">
            <div className="login-card">
                <h2 className="login-heading">Welcome</h2>
                <div className="login-options">
                    <div className="login-option">
                        <h3>Login</h3>
                        <form className="login-form">
                            <input type="text" placeholder="Email" name="email" value={olduser.email} onChange={handleChange2}/>
                            <input type="password" placeholder="Password" name="password" value={olduser.password} onChange={handleChange2}/>
                            <div className="submit" onClick={handleLogin}>Login</div>
                        </form>
                    </div>
                    <div className="login-option">
                        <h3>Sign Up</h3>
                        <form className="login-form">
                            <input type="text" placeholder="Name" name="name" value={newuser.name} onChange={handleChange1}/>
                            <input type="text" placeholder="Email" name="email" value={newuser.email} onChange={handleChange1}/>
                            <input type="password" placeholder="Password" name="password" value={newuser.password} onChange={handleChange1}/>
                            <div className="submit" onClick={handleSignup}>Sign Up</div>
                        </form>
                    </div>
                </div>
                <div id={"signInDiv"} ></div>
            </div>
        </div>
    );

}
export default Authentication;