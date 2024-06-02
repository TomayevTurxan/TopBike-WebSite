import React, { createRef, useContext, useEffect, useRef, useState } from 'react'
import "./index.scss"
import axios from 'axios'
import { CategoryContext } from '../../context/categoryContext'
import Spinner from '../SecondLoader'
import { userContext } from '../../context/userContext'
import toast from 'react-hot-toast'
import { Helmet } from 'react-helmet-async'

function Products() {
    const [products, setProducts] = useState([]);
    const [values, setValues] = useState({
        img: "",
        title: "",
        newPrice: "",
        oldPrice: "",
        category: "",
        basketIcon: "fa-solid fa-basket-shopping",
        heartIcon: "fa-regular fa-heart",
        addedHeartIcon: "fa-solid fa-heart",
        eyeIcon: "fa-solid fa-eye",
    });
    const [isFormOpen, setIsFormOpen] = useState(false);
    const { spinner, setSpinner } = useContext(CategoryContext);
    const { token, user } = useContext(userContext);
    const [isPostFormOpen, setIsPostFormOpen] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [productId, setProductId] = useState('');
    const input = useRef();

    const fetchData = async () => {
        setSpinner(true);
        try {
            const res = await axios.get('https://topbikewebsite.onrender.com/products');
            setProducts(res.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setSpinner(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!values.title || !values.newPrice || (!isPostFormOpen && !values.category)) {
            toast.error('All Values Are Required');
            return;
        }

        try {
            const formData = new FormData();

            Object.entries(values).forEach(([key, value]) => {
                if (key !== 'img') {
                    formData.append(key, value);
                }
            });

            if (e.target[0].files.length > 0) {
                const newFile = e.target[0].files[0];
                formData.append('img', newFile);
            }

            const url = isPostFormOpen ? 'https://topbikewebsite.onrender.com/products' : `https://topbikewebsite.onrender.com/products/${productId}`;
            const method = isPostFormOpen ? 'post' : 'put';

            const res = await axios[method](url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: token,
                },
            });

            if (res.status === 200) {
                toast.success(isPostFormOpen ? 'Product Created' : 'Product Updated');
                setIsFormOpen(false);
                setValues({
                    img: "",
                    title: "",
                    newPrice: "",
                    oldPrice: "",
                    category: "",
                    basketIcon: "fa-solid fa-basket-shopping",
                    heartIcon: "fa-regular fa-heart",
                    addedHeartIcon: "fa-solid fa-heart",
                    eyeIcon: "fa-solid fa-eye",
                });
                await fetchData();
                if (isPostFormOpen) {
                    input.current.value = '';
                }
            } else {
                toast.error('Error Occurred');
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleDelete = async () => {
        try {
            const res = await axios.delete(`https://topbikewebsite.onrender.com/products/${productId}`, {
                data: { userId: user._id },
                headers: {
                    Authorization: token,
                },
            });

            if (res.status === 200) {
                toast.success('Product has been deleted');
                setShowDeleteModal(false);
                setProductId('');
                await fetchData();
            } else {
                toast.error('Error Occurred');
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <>
            <Helmet>
                <title>
                    Dashboard | Products
                </title>
            </Helmet>
            <div className={`deleteModal ${showDeleteModal ? 'openDeleteModal' : ''}`}>
                <h3>Are you sure? </h3>
                <div>
                    <button onClick={() => setShowDeleteModal(false)}>No</button>
                    <button onClick={handleDelete}>Yes</button>
                </div>
            </div>
            {showDeleteModal && <div className='overLay' onClick={() => setShowDeleteModal(false)}></div>}
            {isFormOpen && <div className='overLay' onClick={() => {
                setIsFormOpen(false)
                setValues({
                    img: "",
                    title: "",
                    newPrice: "",
                    oldPrice: "",
                    category: "",
                    basketIcon: "fa-solid fa-basket-shopping",
                    heartIcon: "fa-regular fa-heart",
                    addedHeartIcon: "fa-solid fa-heart",
                    eyeIcon: "fa-solid fa-eye",
                })

            }}></div>}
            <div className='dash-products'>
                <div className='dash-head'>
                    <h1>EXISTED PRODUCTS</h1>
                    <button onClick={() => {
                        setIsFormOpen(true)
                        setIsPostFormOpen(true)
                    }}>Add Product</button>
                </div>
                {spinner ? <Spinner /> :
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Price</th>
                                <th>delete</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products && products.map(x => (
                                <tr key={x._id}>
                                    <td> {x._id} </td>
                                    <td> <img style={{ width: "50px", height: '50px', borderRadius: "100%" }} src={`${x.img[0]}`} alt="" /> </td>
                                    <td>{x.title}</td>
                                    <td>${x.newPrice}.00</td>
                                    <td><i className='fa-solid fa-trash' onClick={() => { setProductId(x._id), setShowDeleteModal(true) }}></i></td>
                                    <td><i onClick={() => {
                                        setValues({ img: x.img[0], title: x.title, newPrice: x.newPrice, oldPrice: x.oldPrice, category: x.category })
                                        setIsFormOpen(true)
                                        setIsPostFormOpen(false)
                                        setProductId(x._id)
                                    }} className="fa-regular fa-pen-to-square"></i></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
                <form action="" className={`${isFormOpen ? "form-open" : ''}`} onSubmit={(e) => handleFormSubmit(e)}>
                    <label htmlFor="img">Image</label>
                    <input
                        name="img"
                        className="file"
                        type="file"
                        ref={input}
                    />
                    <label htmlFor="title">Title</label>
                    <input
                        name="title"
                        type="text"
                        onChange={handleInputChange}
                        value={values.title}
                    />
                    <label htmlFor="newPrice">NewPrice</label>
                    <input
                        name="newPrice"
                        type="number"
                        onChange={handleInputChange}
                        value={values.newPrice}
                    />
                    <label htmlFor="oldPrice">OldPrice</label>
                    <input
                        name="oldPrice"
                        type="number"
                        onChange={handleInputChange}
                        value={values.oldPrice}
                    />
                    <label htmlFor="oldPrice">Category</label>
                    <input
                        name="category"
                        type="text"
                        onChange={handleInputChange}
                        value={values.category}
                    />
                    <input className="submit" type="submit" />
                </form>
            </div>
        </>
    )
}

export default Products