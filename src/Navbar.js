import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css'

function Navbar({user,setUser,history}) {
    const [searchText, setSearchText] = useState('');

    const handleChange = (event) => {
        setSearchText(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Perform search or any other logic with the searchText
        console.log(`Searching for: ${searchText}`);
    };
    function handleLogout(){
        setUser({
            name:'',
            email: '',
            id: '',
        });
    }

    return (
    <>

        <nav>
            <img src=''/>
            <div className="search-bar">
                <input type="text" placeholder="Search anything..."/>
                <button className="search-button">
                    <FontAwesomeIcon icon={faSearch} />
                </button>

            </div>
            <ul className="nav-links">
                <li><a href="/">Home</a></li>


                <li><a onClick={
                    ()=>{ history("/newpost");}
                } style={{
                    cursor:"pointer"
                }}>
                    New post
                </a></li>


                <li><a onClick={
                    ()=>{ history("/mypost");}
                } style={{
                    cursor:"pointer"
                }}>Users</a></li>


                <li><a onClick={handleLogout} style={{
                    cursor:"pointer"
                }}>Signout</a></li>
            </ul>
        </nav>

    </>
    );
}


export default Navbar;