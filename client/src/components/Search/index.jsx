import React, { useState } from 'react'
import './index.scss'
import useFetchData from './../../hooks/useFetchData';
import { useNavigate } from 'react-router';

function Search({ isSearchOpen, setisSearchOpen }) {

    const [searhcValue, setSearhcValue] = useState('')

    const { product } = useFetchData('products')
    const navigate = useNavigate()

    return (
        <>
            {isSearchOpen && <div className="overLay" onClick={() => {
                setisSearchOpen(!isSearchOpen)
                setSearhcValue('')
            }}></div>}
            <div className={`search ${isSearchOpen ? 'search-open' : ''}`}>
                <i onClick={() => {
                    setisSearchOpen(!isSearchOpen)
                    setSearhcValue('')
                }} className='fa-solid fa-xmark'></i>
                <h1>Start typing and hit Enter</h1>
                <input value={searhcValue} onChange={(e) => setSearhcValue(e.target.value)} type="text" placeholder='search product name...' />
                <div className="se-wrapper">
                    {searhcValue.trim().length !== 0 && product
                        .filter(item => item.title.toLowerCase().trim().includes(searhcValue.toLowerCase().trim()))
                        .map(item => (
                            <div
                                onClick={() => {
                                    navigate(`/details/${item._id}`)
                                    setisSearchOpen(!isSearchOpen),
                                        setSearhcValue('')
                                }
                                }
                                className="se-card"
                                key={item._id}
                            >
                                <div className="se-img">
                                    <img src={item.img[0]} alt="" />
                                </div>
                                <div className="se-texts">
                                    <p>{item.title}</p>
                                    <span>${item.newPrice}.00 USD</span>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </>
    )
}

export default Search