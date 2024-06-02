import React, { useContext, useEffect, useState } from 'react'
import "./index.scss"
import toast from 'react-hot-toast'
import axios from 'axios'
import { userContext } from '../../context/userContext'
import adminLogo from "../../../img/adminLogo.jpg"
import { Link, useNavigate } from 'react-router-dom'
import MyPieChart from '../pieChart'
import { Helmet } from 'react-helmet-async'

function Dashboard() {
    const [users, setUsers] = useState([])
    const [products, setProducts] = useState([])
    const [comments, setComments] = useState([])
    const [userCount, setUserCount] = useState(0);
    const [productCount, setproductCount] = useState(0)
    const { user, isLoading, setIsLoading, token, RevenueArray } = useContext(userContext)
    const [openedReplies, setOpenedReplies] = useState([])
    const [isCommentOpen, setIsCommentOpen] = useState(false)
    const toggleReplies = (commentId) => {
        setOpenedReplies((prevOpenedReplies) => {
            if (prevOpenedReplies.includes(commentId)) {
                return prevOpenedReplies.filter((id) => id !== commentId);
            } else {
                return [...prevOpenedReplies, commentId];
            }
        });
    };

    const subRevenue = RevenueArray.reduce((initial, value) => initial + value, 0)

    const fetchUsers = async () => {
        try {
            const users = await axios.get('https://topbikewebsite.onrender.com/users')
            setUsers(users.data)
        } catch (error) {
            toast.error(error.message)
        }
    }
    const fetchProducts = async () => {
        try {
            const product = await axios.get('https://topbikewebsite.onrender.com/products')
            setProducts(product.data)
        } catch (error) {
            toast.error(error.message)
        }
    }
    const fetchComments = async () => {
        try {
            const comment = await axios.get('https://topbikewebsite.onrender.com/comments')
            setComments(comment.data)
        } catch (error) {
            toast.error(error.message)
        }
    }


    useEffect(() => {
        fetchUsers();
        fetchProducts();
        fetchComments();

        const interval = setInterval(() => {
            setUserCount((prevNumber) => (prevNumber < users.length ? prevNumber + 1 : prevNumber));
            setproductCount((prevNumber) => (prevNumber < products.length ? prevNumber + 1 : prevNumber));
        }, 50);

        return () => clearInterval(interval);
    }, [userCount, users.length, productCount, products.length]);



    const deleteComment = async (id, productId) => {
        try {
            setIsLoading(true)
            await axios.delete(`https://topbikewebsite.onrender.com/comments/${id}/delete`, {
                headers: {
                    Authorization: token
                },
                data: {
                    userId: user._id,
                    productId
                }
            });
            setIsLoading(false)
            toast.success('Comment Deleted Successfully');
            await fetchComments();
        } catch (error) {
            toast.error(error.message);
        }
    }



    const deleteReply = async (replyId, comment) => {
        if (token) {
            try {
                setIsLoading(true)
                await axios.delete(`https://topbikewebsite.onrender.com/replies/${replyId}/delete`, {
                    headers: {
                        Authorization: token
                    },
                    data: {
                        userId: user._id,
                        commentId: comment
                    }
                });
                setIsLoading(false)
                toast.success('Reply Deleted Successfully');
                await fetchComments();
            } catch (error) {
                toast.error(error.message);
            }
        } else {
            toast.error("You must be logged in firstly to perform this action")
        }
    }




    return (
        <>
            <Helmet>
                <title>
                    Dashboard
                </title>
            </Helmet>
            {isLoading && <div className="loader"></div>}
            {isCommentOpen && <div className='overLay' onClick={() => setIsCommentOpen(false)}></div>}
            <div className='dashboard'>
                <h1>STATISTICS IN TOPBIKE SERIVCE</h1>
                <div className={`commentsOfProduct ${isCommentOpen ? "comment-open" : ''} `}>
                    <div className="middleBox">
                        {!user && <div className='covering'></div>}
                        {comments.length !== 0 ? (
                            comments && comments.map(x => (
                                <div className="peopleCommentBox" key={x._id}>
                                    <div className="imgBox">
                                        <div className="peopleBox">
                                            <img
                                                src={`${x.from.profileImg
                                                    ?
                                                    x.from.profileImg
                                                    :
                                                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8QATbxHgFvoPhdxKFIcSQragjLC6BcCo9FiU0koLh0FGzL3FocfsauUs53dAHfKCecaA&usqp=CAU"}`}
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                    <div className="normalBox">
                                        <div className="emailBox">
                                            <div className="emailArea" style={{ width: "100%", display: "flex", alignItems: "center", gap: "5px" }}>
                                                <span style={{ color: "blue", fontSize: ".8em" }}>{x.from.email}</span>
                                                {x.role === "admin" ?
                                                    <img style={{ width: "15px", height: "15px", borderRadius: "100%" }} src={adminLogo} alt="" />
                                                    : null
                                                }
                                            </div>
                                            <span>{x.text}</span>
                                            <div style={{ fontSize: ".7em" }} className="heartBox">
                                                <i
                                                    className="fa-solid  fa-trash"
                                                    onClick={() => deleteComment(x._id, x.productId._id)}
                                                ></i>
                                            </div>
                                        </div>
                                        {x.replies.length !== 0 &&
                                            <div onClick={() => toggleReplies(x._id)} className="replyCount">{x.replies.length} replies</div>}
                                        {
                                            x.replies.map(reply => (
                                                <div className={`replayBox ${openedReplies.includes(x._id) ? "replyOpen" : ""}`} key={reply._id}>
                                                    <div className="width">
                                                        <div className="replayImgBox">
                                                            <img
                                                                src={`${reply.from.profileImg
                                                                    ?
                                                                    reply.from.profileImg
                                                                    :
                                                                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8QATbxHgFvoPhdxKFIcSQragjLC6BcCo9FiU0koLh0FGzL3FocfsauUs53dAHfKCecaA&usqp=CAU"}`}
                                                                alt=""
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="Box">
                                                        <div style={{ display: "flex", alignItems: "center", gap: "5px" }} className="replyAdmin">
                                                            <span style={{ color: "blue", fontSize: ".7em" }}>{reply.from.email}</span>
                                                            {reply.from.role === "admin" ?
                                                                <img style={{ width: "12px", height: "12px", borderRadius: "100%" }} src={adminLogo} alt="" />
                                                                : null
                                                            }
                                                        </div>
                                                        <p>{reply.text} </p>
                                                    </div>
                                                    <div className="heartBox">
                                                        <i onClick={() => { deleteReply(reply._id, x._id) }} className="fa-solid  fa-trash"></i>
                                                    </div>
                                                </div>

                                            ))
                                        }

                                    </div>
                                </div >
                            ))

                        ) : (
                            <i style={{ textAlign: "center", marginTop: "20px", fontWeight: "bold" }}>There is no any comment yet</i>
                        )}
                    </div>
                </div>
                <div className="statistics">
                    <div className="item one">
                        <h2><i className='fa-solid fa-user'></i> {userCount}</h2>
                        <p>Users</p>
                        <Link to={'/dashboard/users'} style={{ color: 'white' }}>Manage  Users</Link>
                    </div>
                    <div className="item two">
                        <div>
                            <h2><i className="fa-solid fa-database"></i> {productCount}</h2>
                            <p>Products</p>
                            <Link to={'/dashboard/products'} style={{ color: 'white' }}>Manage  Products</Link>
                        </div>
                        <button onClick={() => setIsCommentOpen(true)}>Show All Comments</button>
                    </div>
                    <div className="item three">
                        <h2><i className="fa-solid fa-dollar-sign"></i><span>{subRevenue}</span></h2>
                        <p>Revenue</p>
                    </div>
                </div>
                <MyPieChart products={products} />
            </div>
        </>
    )
}

export default Dashboard