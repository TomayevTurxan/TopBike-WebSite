import React, { useContext, useEffect } from 'react';
import { Link } from "react-router-dom";
import useFetchData from '../../hooks/useFetchData';
import "./index.scss";
import { CategoryContext } from '../../context/categoryContext';

function Category() {
    const { product } = useFetchData('category')
    const { setCategory } = useContext(CategoryContext)

    return (
        <section id='homeFilterBoxsSection'>
            {
                product && product.map((item) => (
                    <div className="filterBox" key={item._id}> 
                        <img src={item.image}  alt="" />
                        <Link onClick={() => setCategory(item.category)} to={'/shop'} className="filterBoxHoverBox"><p>{item.category}</p></Link>
                    </div>
                ))
            }
        </section>
    )
}

export default Category



// onClick={() => setCategory(item.category)} to={'/shop'}