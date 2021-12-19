import React from 'react';
import './SearchBox.css';

const SearchBox= ({searchfield ,searchChange}) =>{
    return (
        <div className='search'>
            <input
               className='inputC' 
               type='search' 
               placeholder='batiment name '
               onChange= {searchChange} 
               
            />
        </div>
    );
}

export default SearchBox;
//onChange= {searchChange}