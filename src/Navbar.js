import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css'

function Navbar(props) {
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
        props.props.setUser({
            name:'',
            email: '',
            id: '',
        });
    }

    return (
    <>

        <nav>
            <div className="logo">Your Logo</div>
            <div className="search-bar">
                <input type="text" placeholder="Search for products..."/>
                    <button type="submit">Search</button>
            </div>
            <ul className="nav-links">
                <li><a href="#">Home</a></li>
                <li><a href="#">Shop</a></li>
                <li><a href="#">Categories</a></li>
                <li><a href="#">Cart</a></li>
                <li><a onClick={handleLogout}>Signout</a></li>
            </ul>
        </nav>

    </>
    );
}


export default Navbar;