import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateUser() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:3001/getUser/${id}`)
            .then(result => {
                setName(result.data.name);
                setEmail(result.data.email);
                setAge(result.data.age);
            })
            .catch(err => console.log(err));
    }, [id]);

    const update = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3001/updateUser/${id}`, { name, email, age })
            .then(result => {
                console.log(result);
                navigate('/');
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="d-flex vh-100 justify-content-center align-items-center" style={{ backgroundImage: 'url("https://wallpapers.com/images/hd/ppt-background-6e9y11u4nb3autmq.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={update}>
                    <h2>Update User</h2>
                    <div className='mb-2'>
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" placeholder='Enter Name' className='form-control' value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" placeholder='Enter Email' className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="age">Age</label>
                        <input type="text" id="age" placeholder='Enter Age' className='form-control' value={age} onChange={(e) => setAge(e.target.value)} />
                    </div>
                    <button className='btn btn-success'>Update</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateUser;
