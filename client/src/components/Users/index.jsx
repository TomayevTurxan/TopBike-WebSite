import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { CategoryContext } from '../../context/categoryContext';
import { userContext } from '../../context/userContext';
import Spinner from '../SecondLoader';
import "./index.scss";
import { Helmet } from 'react-helmet-async';

function Users() {
    const [users, setUsers] = useState([]);
    const [userId, setuserId] = useState('');
    const { token } = useContext(userContext);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const { spinner, setSpinner } = useContext(CategoryContext);

    const fetchUsers = async () => {
        try {
            setSpinner(true);
            const res = await axios.get('https://topbikewebsite.onrender.com/users');
            setSpinner(false);
            setUsers(res.data);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const deleteUser = async (id) => {
        try {
            setSpinner(true);
            await axios.delete(`https://topbikewebsite.onrender.com/users/${id}`, {
                headers: { Authorization: token }
            });
            setSpinner(false);
            toast.success('User Deleted');
            await fetchUsers();
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const renderUsersTable = () => {
        if (users.length !== 1) {
            return (
                <table border={1}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Image</th>
                            <th>Email</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users
                            .filter((user) => user.role !== 'admin')
                            .map(({ _id, profileImg, email }) => (
                                <tr key={_id}>
                                    <td>{_id}</td>
                                    <td>
                                        <img
                                            style={{ width: "50px", height: "50px", borderRadius: "100%" }}
                                            src={profileImg || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8QATbxHgFvoPhdxKFIcSQragjLC6BcCo9FiU0koLh0FGzL3FocfsauUs53dAHfKCecaA&usqp=CAU"}
                                            alt=""
                                        />
                                    </td>
                                    <td>{email}</td>
                                    <td>
                                        <i className='fa-solid fa-trash' onClick={() => { setShowDeleteModal(true); setuserId(_id); }}></i>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            );
        } else {
            return <h1>No Users Yet!</h1>;
        }
    };

    return (
        <>
            <Helmet>
                <title>
                    Dashboard | Users
                </title>
            </Helmet>
            {showDeleteModal && <div className='overLay' onClick={() => setShowDeleteModal(false)}></div>}
            <div className='users'>
                <h1>EXISTED USERS</h1>
                <div className={`deleteModal ${showDeleteModal ? 'openDeleteModal' : ''}`}>
                    <h3>Are you sure? </h3>
                    <div>
                        <button onClick={() => setShowDeleteModal(false)}>No</button>
                        <button onClick={() => { deleteUser(userId); setShowDeleteModal(false); }}>Yes</button>
                    </div>
                </div>
                {spinner ? <Spinner /> : renderUsersTable()}
            </div>
        </>
    );
}

export default Users;
