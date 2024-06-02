import React, { createContext, useState } from 'react'

export const CategoryContext = createContext()

function CategoryContextProvider({ children }) {

    const [category, setCategory] = useState('all')
    const [colorCategory, setColorCategory] = useState('all')
    const [sizeCategory, setSizeCategory] = useState('all')
    const [spinner, setSpinner] = useState(true)

    const data = {
        category,
        setCategory,
        colorCategory,
        setColorCategory,
        setSizeCategory,
        sizeCategory,
        spinner,
        setSpinner
    }
    return (
        <CategoryContext.Provider value={data}>{children}</CategoryContext.Provider>
    )
}
export default CategoryContextProvider; 
