import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { userContext } from '../context/userContext';
import toast from 'react-hot-toast';

function useFetchData(urlTitle) {

    const [product, setProduct] = useState(null)
    const [isLoading, setisLoading] = useState(true)

    async function fetchData() {
        try {
            const res = await axios.get(`https://topbikewebsite.onrender.com/${urlTitle}`)
            setProduct(res.data)
        } catch (error) {
            toast.error(error.message)
        }
    }
    useEffect(() => {
        fetchData()
        setisLoading(false)
    }, [])


    return { product, setProduct, isLoading, setisLoading }
}

export default useFetchData