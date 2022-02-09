import { Box } from '@mui/material';
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search'
import './style.scss'
import { useNavigate } from 'react-router-dom';

function SearchBar() {

    const [category, setCategory] = useState("");
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        const cat = category.toLowerCase();
        navigate("/products/" + cat);
    }

    return <Box className='search-bar'>
        <Box className='select-box'>
            <select id="">
                <option value="">All</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Boys">Boys</option>
                <option value="Girls">Girls</option>
            </select>
        </Box>
        <input onChange={(e) => setCategory(e.target.value)} className='search-input' placeholder='Search Products' />
        <div onClick={handleClick} className='icon' >
            <SearchIcon />
        </div>

    </Box>
}

export default SearchBar;
