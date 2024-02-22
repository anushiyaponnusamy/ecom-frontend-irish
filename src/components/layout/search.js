
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from 'react'

import SearchIcon from '@mui/icons-material/Search';
import { IconButton, InputBase, useMediaQuery } from "@mui/material";
import { searchProduct } from '../../pages/service';
import { PathAction } from "../../redux/Redux";
const mobileStyle = {
    display: 'flex', alignItems: 'center', margin: 'auto'
}
const desktopStyle = {
    display: 'flex', alignItems: 'center',
}
const SearchProduct = () => {
    const dispatch = useDispatch();

    const [searchValue, setSearchValue] = useState("");
    const mobileView = useMediaQuery("(max-width:768px)");
    const handleSearchChange = async (event) => {
        const searchText = event?.target?.value;
        setSearchValue(searchText);
        if (searchText) {

            dispatch(PathAction.setIsSearching(true));
            searchProduct(searchText.trim())
                .then(({ data }) => {
                    dispatch(PathAction.setSearchData(data));
                })
                .catch((err) => {
                    console.error('Error in fetchSearchProduct API call:', err);
                });
        } else {
            dispatch(PathAction.setIsSearching(false));
        }


    };
    return (
        <div style={mobileView ? mobileStyle : desktopStyle}>
            <div style={{ position: 'relative' }}>
                <InputBase
                    placeholder="Search..."
                    value={searchValue}
                    onChange={handleSearchChange}
                    style={{ border: '1px solid black', borderRadius: '5px', paddingRight: '40px' }}
                />
                <IconButton
                    style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)' }}
                    color="inherit"
                    aria-label="search"
                    onClick={() => handleSearchChange(searchValue)}
                >
                    <SearchIcon />
                </IconButton>
            </div>
        </div>


    )
}

export default SearchProduct