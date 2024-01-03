import React, { useContext, useState } from 'react';
import AddCategory from './AddCategory';
import AddItem from './AddItem';
import RestaurantContext from '../../../context/RestaurantContext';

export default function AddHolder() {
    const {expanded,isDarkMode}=useContext(RestaurantContext);
    const [displayMenuItem, setDisplayMenuItem] = useState(false);
    const [displayCategory, setDisplayCategory] = useState(true);

    const handleMenuItemClick = () => {
        setDisplayMenuItem(true);
        setDisplayCategory(false);
    };

    const handleCategoryClick = () => {
        setDisplayMenuItem(false);
        setDisplayCategory(true);
    };

    return (
        <div className={expanded?'dashboard':"dashboardcollapsed"}>
            <div className="boxContainer">
                <div className="button-container">
                <button
                        className={`btn  mx-2 ${displayCategory ? 'btn-active' : 'btn'}`}
                        onClick={handleCategoryClick}
                    >
                        Category
                    </button>
                    <button
                        className={`btn  mx-3 ${displayMenuItem ? 'btn-active' : 'btn'}`}
                        onClick={handleMenuItemClick}
                    >
                        Menu Items
                    </button>
                   
                </div>
                <div className="content-container">
                    <div className="content">
                        
                        {displayCategory && <AddCategory />}
                        {displayMenuItem && <AddItem />}
                    </div>
                </div>
                {/* <div className="footer-container">
                <div className="footer">
        <p>&copy; 2023 Your Restaurant Name. All rights reserved.</p>
        <p>Contact us: contact@yourrestaurant.com</p>
        <p>123 Main Street, City, Country</p>
    </div>
                </div> */}
            </div>
        </div>
    );
}
