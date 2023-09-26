import React from 'react'
import {AiOutlineSearch} from 'react-icons/ai'
import './FormInputBtn.css'

function FormInputBtn ({inputCity, handleInputChange, handleButtonClick }) {
    return (
        <div className="form-content">
                <form className="input-search-wrap">
                    <input className='input-searh' 
                        type="text"
                        placeholder='Search a city/country'
                        value={inputCity}
                        onChange={handleInputChange}
                    />
                    <button 
                        className='search-icon-wrap'
                        onClick={(e) => handleButtonClick(e)}
                    >
                        <AiOutlineSearch className='search-icon'/>
                    </button>
                </form>
        </div>
    )
}

export default FormInputBtn;
