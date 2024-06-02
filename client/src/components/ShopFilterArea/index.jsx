import React, { useContext, useState } from 'react'
import "./index.scss"
import { CategoryContext } from '../../context/categoryContext'

function FilterArea({ setpriceInputValue, priceInputValue, isFilterAreaOpen, maxPrice, setisRespFilterOpen, isRespFilterOpen }) {
    const { setColorCategory, setCategory, setSizeCategory } = useContext(CategoryContext)
    const [isCategoryOpen, setCategoryOpen] = useState(false);
    const [isColorOpen, setColorOpen] = useState(false);
    const [isSizeOpen, setSizeOpen] = useState(false);
    const [isPriceOpen, setPriceOpen] = useState(false);

    const toggleCategory = () => setCategoryOpen(!isCategoryOpen);
    const toggleColor = () => setColorOpen(!isColorOpen);
    const toggleSize = () => setSizeOpen(!isSizeOpen);
    const togglePrice = () => setPriceOpen(!isPriceOpen);
    return (
        <>
            <div className={`filter-side ${isFilterAreaOpen ? 'filterAreaOpen' : ''}`} >
                <ul className='categories'>
                    <h2>Categories</h2>
                    <hr />
                    <li onClick={() => setCategory('all')} style={{ fontWeight: "bold" }}>Default</li>
                    <li onClick={() => setCategory('bike')}>Bicycle</li>
                    <li onClick={() => setCategory('accessory')}>Bicycle Accessory</li>
                    <li onClick={() => setCategory('helmet')}>Helmet</li>
                </ul>
                <ul className='color'>
                    <h2>Color Option</h2>
                    <hr />
                    <p onClick={() => setColorCategory('all')} style={{ fontWeight: "bold" }}>Default</p>
                    <div className='colors'>
                        <li onClick={() => setColorCategory('black')}><p></p></li>
                        <li onClick={() => setColorCategory('purple')}><p></p></li>
                        <li onClick={() => setColorCategory('yellow')}><p></p></li>
                        <li onClick={() => setColorCategory('green')}><p></p></li>
                        <li onClick={() => setColorCategory('blue')}><p></p></li>
                        <li onClick={() => setColorCategory('gray')}><p></p></li>
                    </div>
                </ul>
                <ul className='size'>
                    <h2>Size Option</h2>
                    <hr />
                    <ul>
                        <li onClick={() => setSizeCategory('all')} style={{ fontWeight: "bold" }}>Default</li>
                        <li onClick={() => setSizeCategory('4-6')}>4YR - 6YR</li>
                        <li onClick={() => setSizeCategory('7-9')}>7YR - 9YR</li>
                        <li onClick={() => setSizeCategory('10-12')}>10YR - 12YR</li>
                        <li onClick={() => setSizeCategory('13-15')}>13YR - 15YR</li>
                        <li onClick={() => setSizeCategory('15+')}>15YR Over</li>
                    </ul>
                </ul>
                <ul className='price'>
                    <h2>Price Filter</h2>
                    <hr />
                    <input value={priceInputValue} type="range" min="0" max='5000' onChange={(e) => setpriceInputValue(e.target.value)} />
                    <p>$0 - ${priceInputValue}</p>
                </ul>
            </div >
            {isRespFilterOpen && <div className='respOverLay' onClick={() => setisRespFilterOpen(false)}></div>}

            <div className={`responsive-filter ${isRespFilterOpen && "resp-filter"}`}>
                <i onClick={() => setisRespFilterOpen(false)} className='fa-solid fa-xmark'></i>
                <ul className='resp-categories'>
                    <div onClick={toggleCategory} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h2>Categories</h2>
                        <i className={`fa-solid fa-chevron-${isCategoryOpen ? 'up' : 'down'}`}></i>
                    </div>
                    <hr />
                    {isCategoryOpen &&
                        <ul>
                            <li onClick={() => setCategory('all')} style={{ fontWeight: "bold" }}>Default</li>
                            <li onClick={() => setCategory('bike')}>Bicycle</li>
                            <li onClick={() => setCategory('accessory')}>Bicycle Accessory</li>
                            <li onClick={() => setCategory('helmet')}>Helmet</li>
                        </ul>
                    }
                </ul>
                <ul className='resp-color'>
                    <div onClick={toggleColor} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h2>Color Option</h2>
                        <i className={`fa-solid fa-chevron-${isColorOpen ? 'up' : 'down'}`}></i>
                    </div>
                    <hr />
                    {isColorOpen &&
                        <ul className='resp-colors'>
                            <li onClick={() => setColorCategory('black')}><p></p></li>
                            <li onClick={() => setColorCategory('purple')}><p></p></li>
                            <li onClick={() => setColorCategory('yellow')}><p></p></li>
                            <li onClick={() => setColorCategory('green')}><p></p></li>
                            <li onClick={() => setColorCategory('blue')}><p></p></li>
                            <li onClick={() => setColorCategory('gray')}><p></p></li>
                        </ul>
                    }
                </ul>
                <ul className='resp-size'>
                    <div onClick={toggleSize} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h2>Size Option</h2>
                        <i className={`fa-solid fa-chevron-${isSizeOpen ? 'up' : 'down'}`}></i>
                    </div>
                    <hr />
                    {isSizeOpen &&
                        <ul>
                            <li onClick={() => setSizeCategory('all')} style={{ fontWeight: "bold" }}>Default</li>
                            <li onClick={() => setSizeCategory('4-6')}>4YR - 6YR</li>
                            <li onClick={() => setSizeCategory('7-9')}>7YR - 9YR</li>
                            <li onClick={() => setSizeCategory('10-12')}>10YR - 12YR</li>
                            <li onClick={() => setSizeCategory('13-15')}>13YR - 15YR</li>
                            <li onClick={() => setSizeCategory('15+')}>15YR Over</li>
                        </ul>
                    }
                </ul>
                <ul className='resp-price'>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h2>Price Filter</h2>
                    </div>
                    <hr />
                    <input value={priceInputValue} type="range" min="0" max='5000' onChange={(e) => setpriceInputValue(e.target.value)} />
                    <p>$0 - ${priceInputValue}</p>
                </ul>
            </div>
        </>
    )
}

export default FilterArea